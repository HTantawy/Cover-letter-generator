
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const cvFile = formData.get('cv') as File;
    const jobTitle = formData.get('jobTitle') as string;
    const company = formData.get('company') as string;
    const location = formData.get('location') as string;
    const jobDescription = formData.get('jobDescription') as string;
    const tone = formData.get('tone') as string;
    const focusAreas = JSON.parse(formData.get('focusAreas') as string || '[]');
    const letterLength = formData.get('letterLength') as string;
    const industry = formData.get('industry') as string;
    const isRegenerate = formData.get('regenerate') === 'true';
    const previousLetter = formData.get('previousLetter') as string || '';

    if (!cvFile || !jobTitle || !company || !jobDescription || !tone || !letterLength || !industry) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Extract and validate CV content
    const cvText = await extractTextFromPDF(cvFile);
    
    // Validate CV content quality
    const cvValidation = validateCVContent(cvText);
    console.log(`CV validation result: ${cvValidation.isValid ? 'SUCCESS' : 'FAILED'}`);
    console.log(`CV text length: ${cvText.length} characters`);
    console.log(`CV text preview (first 300 chars): ${cvText.substring(0, 300)}...`);
    console.log(`CV text contains extraction error: ${cvText.includes('EXTRACTION_FAILED') || cvText.includes('EXTRACTION_ERROR')}`);
    
    if (!cvValidation.isValid) {
      console.warn('CV validation failed:', cvValidation.message);
      console.log('Will generate letter with limited CV information');
    } else {
      console.log('CV validation passed - using CV content for personalization');
    }

    // Create a highly personalized cover letter prompt
    const basePrompt = `You are an expert cover letter writer. Your job is to create a HIGHLY PERSONALIZED cover letter that directly references specific details from the candidate's CV/resume.

${isRegenerate ? `⚠️ REGENERATION MODE: Create a COMPLETELY DIFFERENT version from this previous letter:
${previousLetter}

Use DIFFERENT examples, structure, and emphasis while maintaining personalization.` : ''}

📋 CANDIDATE'S CV/RESUME CONTENT:
${cvText}

🎯 JOB TARGET:
Position: ${jobTitle} at ${company}
Location: ${location || 'Not specified'}

Job Requirements:
${jobDescription}

📝 WRITING REQUIREMENTS:
- Tone: ${tone}
- Length: ${letterLength}
- Industry: ${industry}
- Focus Areas: ${focusAreas.length > 0 ? focusAreas.join(', ') : 'General strengths'}

🔥 CRITICAL PERSONALIZATION REQUIREMENTS:

1. **MANDATORY CV USAGE**: You MUST reference specific details from the CV including:
   - Exact job titles and company names from their work history
   - Specific skills, technologies, or tools they've used
   - Quantifiable achievements (numbers, percentages, results)
   - Educational background and relevant certifications
   - Specific projects or experiences mentioned in their CV

2. **EVIDENCE-BASED CLAIMS**: Every statement about the candidate MUST be backed by something from their CV. Do NOT make generic claims.

3. **DIRECT CONNECTIONS**: Explicitly connect their past experience to the job requirements.

4. **SPECIFIC EXAMPLES**: Use actual examples from their work history, not hypothetical situations.

EXAMPLE OF GOOD PERSONALIZATION:
❌ BAD: "I have experience in project management"
✅ GOOD: "In my role as Senior Project Manager at XYZ Corp, I successfully led a team of 12 developers to deliver a $2M software project 3 weeks ahead of schedule"

FORMAT: Business letter format starting with "Dear Hiring Manager," and ending with "Sincerely, [Candidate Name]"

⚠️ CRITICAL: If the CV content above appears to be an error message or extraction failed, please state this clearly and request that the user provide their CV details in the job description field for better personalization.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert cover letter writer with 10+ years of experience in recruitment and career coaching. You specialize in creating ATS-optimized, personalized cover letters that achieve high interview rates across all industries. You understand what hiring managers look for and how to position candidates effectively.${!cvValidation.isValid ? `\n\nIMPORTANT: The CV content may have extraction issues. ${cvValidation.message} Focus on creating a compelling letter using available information and encourage the candidate to provide additional context.` : ''}` 
          },
          { role: 'user', content: basePrompt }
        ],
        temperature: isRegenerate ? 
          (tone === 'confident' ? 0.9 : tone === 'conversational' ? 0.8 : tone === 'humble' ? 0.6 : 0.7) :
          (tone === 'confident' ? 0.8 : tone === 'conversational' ? 0.7 : tone === 'humble' ? 0.4 : 0.5),
        max_tokens: letterLength === 'concise' ? 600 : letterLength === 'detailed' ? 1200 : 900,
        presence_penalty: isRegenerate ? 0.3 : 0.1, // Higher for regeneration to encourage diversity
        frequency_penalty: isRegenerate ? 0.4 : 0.2, // Higher for regeneration to reduce repetition
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const coverLetter = data.choices[0].message.content;

    // Post-process the cover letter for quality assurance
    const processedLetter = postProcessCoverLetter(coverLetter, cvValidation);

    console.log('Cover letter generated successfully');
    console.log(`Generated letter length: ${processedLetter.length} characters`);
    
    // Log if the letter seems to contain CV-specific information
    const containsPersonalization = /\b(at |worked |experience |role |company |project |achieved |led |managed |developed |built |created)\b/i.test(processedLetter);
    console.log(`Letter appears to contain personalization: ${containsPersonalization}`);

    return new Response(
      JSON.stringify({ 
        coverLetter: processedLetter,
        cvAnalysis: {
          extractionSuccess: cvValidation.isValid,
          message: cvValidation.message,
          wordCount: cvText.length > 0 ? cvText.split(/\s+/).length : 0
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-cover-letter function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate cover letter',
        details: error.message 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// Enhanced PDF text extraction using OpenAI's vision capabilities
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log(`Extracting text from PDF: ${file.name}, size: ${file.size} bytes`);
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    
    // Method 1: Use OpenAI's vision API to extract text from PDF
    try {
      console.log('Using OpenAI vision API to extract PDF text...');
      
      // Convert to base64
      const base64Data = btoa(String.fromCharCode(...buffer));
      
      const extractionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Extract ALL text content from this PDF resume/CV. Return the complete text exactly as it appears, including:

- Full name and contact information
- Complete work experience with job titles, companies, dates, and descriptions
- All education details (degrees, institutions, dates, GPA if present)
- Technical skills, certifications, languages
- Projects, achievements, publications
- Any other sections (summary, awards, etc.)

IMPORTANT: Return the raw extracted text without any formatting or interpretation. I need the complete CV content to personalize a cover letter.`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64Data}`
                }
              }
            ]
          }],
          max_tokens: 4000,
          temperature: 0
        })
      });

      if (extractionResponse.ok) {
        const extractionData = await extractionResponse.json();
        const extractedText = extractionData.choices[0].message.content.trim();
        
        if (extractedText && extractedText.length > 100) {
          console.log(`Successfully extracted ${extractedText.length} characters using OpenAI vision`);
          return extractedText;
        }
      } else {
        console.log(`OpenAI API error: ${extractionResponse.status}`);
      }
    } catch (aiError) {
      console.log('OpenAI vision extraction failed:', aiError.message);
    }
    
    // Method 2: Fallback - basic PDF text extraction
    try {
      console.log('Trying basic PDF text extraction...');
      const decoder = new TextDecoder('utf-8', { fatal: false });
      const rawText = decoder.decode(buffer);
      
      // Extract text between parentheses (common in PDF text objects)
      const textMatches = rawText.match(/\(([^)]+)\)/g);
      if (textMatches) {
        const extractedText = textMatches
          .map(match => match.slice(1, -1))
          .filter(text => text.length > 2 && /[a-zA-Z]/.test(text))
          .join(' ')
          .replace(/\\[nrt]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        if (extractedText.length > 100) {
          console.log(`Extracted ${extractedText.length} characters using basic method`);
          return extractedText;
        }
      }
    } catch (fallbackError) {
      console.log('Basic extraction failed:', fallbackError.message);
    }
    
    // If all methods failed
    console.log('All PDF extraction methods failed');
    return `EXTRACTION_FAILED: Unable to extract readable text from "${file.name}". 
    
The PDF may be:
- Image-based (scanned document)
- Password protected
- In a complex format

For the best results, please copy your resume text and include key details (experience, skills, achievements) in the job description field. The system will use this information to create a personalized cover letter.`;
    
  } catch (error) {
    console.error('PDF extraction error:', error);
    return `EXTRACTION_ERROR: Failed to process PDF file "${file.name}". Please try a different file or include resume details in the job description field.`;
  }
}

// CV content validation function
function validateCVContent(cvText: string): { isValid: boolean; message: string } {
  if (!cvText || cvText.length < 50) {
    return {
      isValid: false,
      message: "CV content is too short or empty. Minimal text was extracted from the PDF."
    };
  }

  if (cvText.startsWith('Error:') || cvText.startsWith('EXTRACTION_FAILED:')) {
    return {
      isValid: false,
      message: "PDF text extraction failed. The cover letter will be generated using job description context and other provided information."
    };
  }

  // Check for common CV elements
  const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(cvText);
  const hasPhone = /(\+?1?[-.\s]?)?(\(?[0-9]{3}\)?[-.\s]?)?[0-9]{3}[-.\s]?[0-9]{4}/.test(cvText);
  const hasExperience = /(experience|work|position|role|job|company|employer)/i.test(cvText);
  const hasSkills = /(skill|proficient|expertise|knowledge|ability)/i.test(cvText);
  const hasEducation = /(education|degree|university|college|school|bachelor|master|phd)/i.test(cvText);

  const validElements = [hasEmail, hasPhone, hasExperience, hasSkills, hasEducation].filter(Boolean).length;

  if (validElements >= 3) {
    return {
      isValid: true,
      message: `CV content successfully extracted with ${cvText.split(/\s+/).length} words.`
    };
  } else {
    return {
      isValid: false,
      message: "CV content may be incomplete. Some standard resume sections were not detected."
    };
  }
}

// Post-processing function for cover letter quality assurance
function postProcessCoverLetter(coverLetter: string, cvValidation: { isValid: boolean; message: string }): string {
  if (!coverLetter) {
    return "Error: No cover letter content was generated. Please try again.";
  }

  let processed = coverLetter.trim();

  // Ensure proper greeting if missing
  if (!processed.toLowerCase().includes('dear')) {
    processed = 'Dear Hiring Manager,\n\n' + processed;
  }

  // Ensure proper closing if missing
  if (!processed.toLowerCase().includes('sincerely') && !processed.toLowerCase().includes('best regards')) {
    processed += '\n\nSincerely,\n[Your Name]';
  }

  // Add note if CV extraction had issues
  if (!cvValidation.isValid) {
    processed += '\n\n---\nNote: This cover letter was generated with limited CV information due to PDF extraction challenges. For optimal results, please ensure your CV is a text-based PDF and consider providing additional context in the job description field.';
  }

  return processed;
}
