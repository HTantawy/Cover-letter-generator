
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

    if (!cvFile || !jobTitle || !company || !jobDescription || !tone || !letterLength || !industry) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // For now, we'll use a simple text extraction approach
    // In a production app, you'd want to use a proper PDF parser
    const cvText = await extractTextFromPDF(cvFile);

    // Generate cover letter using OpenAI
    const prompt = `
You are an expert cover letter writer. Generate a personalized, professional cover letter based on the following information:

CV/Resume Content:
${cvText}

Job Information:
- Position: ${jobTitle}
- Company: ${company}
- Location: ${location || 'Not specified'}
- Job Description: ${jobDescription}

Requirements:
- Tone: ${tone} (professional/formal, conversational/friendly, confident/assertive, or humble/modest)
- Focus Areas: ${focusAreas.length > 0 ? focusAreas.join(', ') : 'General approach'}
- Letter Length: ${letterLength} 
- Industry Approach: ${industry}
- Highlight relevant experience from the CV that matches the focus areas
- Address specific requirements from the job description
- Use proper business letter format
- Tailor the language and examples to the specified industry

Generate only the cover letter content, starting with "Dear Hiring Manager" and ending with "Sincerely, [Your Name]".
`;

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
            content: 'You are an expert cover letter writer who creates personalized, professional cover letters that get results.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: tone === 'confident' ? 0.8 : tone === 'conversational' ? 0.7 : tone === 'humble' ? 0.4 : 0.5,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const coverLetter = data.choices[0].message.content;

    console.log('Cover letter generated successfully');

    return new Response(
      JSON.stringify({ coverLetter }),
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

// Simple PDF text extraction function
// Note: This is a basic implementation. For production, consider using a proper PDF parsing library
async function extractTextFromPDF(file: File): Promise<string> {
  try {
    // For now, we'll return a placeholder that encourages users to paste their CV content
    // In a real implementation, you'd use a PDF parsing library
    return `
    This is a placeholder for CV content extraction. 
    The actual CV file "${file.name}" would be parsed here.
    For now, please ensure your job description contains enough context about your background.
    
    In a production environment, this would extract:
    - Personal information
    - Work experience
    - Education
    - Skills
    - Achievements
    `;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return 'Unable to extract text from PDF. Please ensure the job description provides context about your background.';
  }
}
