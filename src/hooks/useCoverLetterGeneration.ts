
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GenerateCoverLetterParams {
  cvFile: File;
  jobTitle: string;
  company: string;
  location?: string;
  jobDescription: string;
  tone: string;
  focusAreas: string[];
  letterLength: string;
  industry: string;
}

export const useCoverLetterGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCoverLetter = async (params: GenerateCoverLetterParams): Promise<string | null> => {
    setIsGenerating(true);
    
    try {
      const formData = new FormData();
      formData.append('cv', params.cvFile);
      formData.append('jobTitle', params.jobTitle);
      formData.append('company', params.company);
      formData.append('location', params.location || '');
      formData.append('jobDescription', params.jobDescription);
      formData.append('tone', params.tone);
      formData.append('focusAreas', JSON.stringify(params.focusAreas));
      formData.append('letterLength', params.letterLength);
      formData.append('industry', params.industry);

      const { data, error } = await supabase.functions.invoke('generate-cover-letter', {
        body: formData,
      });

      if (error) {
        console.error('Error generating cover letter:', error);
        toast({
          title: "Generation failed",
          description: "Failed to generate cover letter. Please try again.",
          variant: "destructive",
        });
        return null;
      }

      toast({
        title: "Cover letter generated!",
        description: "Your personalized cover letter is ready.",
      });

      return data.coverLetter;
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Generation failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateCoverLetter,
    isGenerating,
  };
};
