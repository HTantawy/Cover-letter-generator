
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyUseThis from "@/components/WhyUseThis";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import CoverLetterOutput from "@/components/CoverLetterOutput";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [letterLength, setLetterLength] = useState("");
  const [industry, setIndustry] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedLetter, setGeneratedLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "CV uploaded successfully",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !jobTitle || !company || !jobDescription || !tone || !letterLength || !industry) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload your CV.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // Extract text from PDF and generate cover letter
      const formData = new FormData();
      formData.append('cv', uploadedFile);
      formData.append('jobTitle', jobTitle);
      formData.append('company', company);
      formData.append('location', location);
      formData.append('jobDescription', jobDescription);
      formData.append('tone', tone);
      formData.append('focusAreas', JSON.stringify(focusAreas));
      formData.append('letterLength', letterLength);
      formData.append('industry', industry);

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
        return;
      }

      setGeneratedLetter(data.coverLetter);
      setShowOutput(true);
      
      // Show appropriate feedback based on CV analysis
      if (data.cvAnalysis && !data.cvAnalysis.extractionSuccess) {
        toast({
          title: "Cover letter generated!",
          description: `${data.cvAnalysis.message} The letter has been created using available information.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Cover letter generated!",
          description: data.cvAnalysis 
            ? `Successfully analyzed your CV (${data.cvAnalysis.wordCount} words) and created a personalized letter.`
            : "Your personalized cover letter is ready.",
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Generation failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (showOutput) {
    return (
      <CoverLetterOutput 
        letter={generatedLetter} 
        onBack={() => setShowOutput(false)}
        formData={uploadedFile ? {
          uploadedFile,
          jobTitle,
          company,
          location,
          jobDescription,
          tone,
          focusAreas,
          letterLength,
          industry
        } : undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/50 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-cyan-100/20"></div>
      <Navigation />
      <Hero />
      
      {/* Main Form Section */}
      <section id="generate" className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-3xl blur opacity-20"></div>
            <Card className="relative shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
              <CardHeader className="text-center pb-8 px-8 pt-12 relative">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full"></div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-3">
                  ✨ Craft Your Story
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg font-light">
                  Let's create a cover letter that showcases your unique brilliance
                </CardDescription>
              </CardHeader>
            
            <CardContent className="space-y-8 px-8 pb-10">
              {/* Job Information */}
              <div className="relative">
                <div className="absolute -top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-xs font-medium text-purple-700">Basic Info</div>
                <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-6 rounded-2xl border border-purple-100/50">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="jobTitle" className="text-sm font-semibold text-gray-800 flex items-center">
                        🎯 Job Title *
                      </Label>
                      <Input
                        id="jobTitle"
                        placeholder="e.g. Senior Software Engineer"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="h-12 border-2 border-purple-200/60 focus:border-purple-500 focus:ring-purple-500/20 bg-white/70 backdrop-blur-sm rounded-xl"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="company" className="text-sm font-semibold text-gray-800 flex items-center">
                        🏢 Company *
                      </Label>
                      <Input
                        id="company"
                        placeholder="e.g. Google"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="h-12 border-2 border-purple-200/60 focus:border-purple-500 focus:ring-purple-500/20 bg-white/70 backdrop-blur-sm rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="location" className="text-sm font-semibold text-gray-800 flex items-center">
                  📍 Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500/20 bg-white rounded-xl transition-all duration-200"
                />
              </div>

              <div className="relative">
                <div className="absolute -top-4 left-4 px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full text-xs font-medium text-cyan-700">Job Details</div>
                <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 p-6 rounded-2xl border border-cyan-100/50">
                  <div className="space-y-3">
                    <Label htmlFor="jobDescription" className="text-sm font-semibold text-gray-800 flex items-center">
                      📝 Job Description *
                    </Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="Paste the full job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[120px] resize-none border-2 border-cyan-200/60 focus:border-cyan-500 focus:ring-cyan-500/20 bg-white/70 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* CV Upload */}
              <div className="relative">
                <div className="absolute -top-4 left-4 px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-xs font-medium text-green-700">Your Resume</div>
                <div className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 p-6 rounded-2xl border border-green-100/50">
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center">📄 Upload Your CV *</Label>
                    <div className="relative border-2 border-dashed border-green-300/60 rounded-2xl p-8 text-center hover:border-green-500 transition-all duration-300 hover:bg-green-50/50 group">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label htmlFor="cv-upload" className="cursor-pointer">
                        <div className="relative">
                          <Upload className="mx-auto h-12 w-12 text-green-400 mb-4 group-hover:scale-110 transition-transform duration-200" />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </div>
                        <p className="text-base font-semibold text-gray-700 mb-1">
                          {uploadedFile ? `✅ ${uploadedFile.name}` : "Drop your CV here or click to upload"}
                        </p>
                        <p className="text-sm text-gray-500">PDF format only, max 10MB</p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customization Options */}
              <div className="relative">
                <div className="absolute -top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full text-xs font-medium text-orange-700">Customization</div>
                <div className="bg-gradient-to-br from-orange-50/30 to-yellow-50/30 p-6 rounded-2xl border border-orange-100/50 space-y-6">
                  {/* Cover Letter Tone */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center">🎭 Cover Letter Tone *</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="h-12 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-orange-500/20 bg-white/70 backdrop-blur-sm rounded-xl">
                        <SelectValue placeholder="Select the tone for your cover letter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">🤵 Professional/Formal</SelectItem>
                        <SelectItem value="conversational">😊 Conversational/Friendly</SelectItem>
                        <SelectItem value="confident">💪 Confident/Assertive</SelectItem>
                        <SelectItem value="humble">🙏 Humble/Modest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Focus Areas */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center">🎯 Focus Areas (Select 2-3 that best match the role)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { name: "Technical Skills", emoji: "💻" },
                        { name: "Leadership Experience", emoji: "👑" }, 
                        { name: "Problem-Solving Abilities", emoji: "🧩" },
                        { name: "Team Collaboration", emoji: "🤝" },
                        { name: "Innovation/Creativity", emoji: "💡" },
                        { name: "Results/Achievements", emoji: "🏆" }
                      ].map((area) => (
                        <div key={area.name} className={`relative flex items-center space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          focusAreas.includes(area.name) 
                            ? 'border-orange-400 bg-orange-100/60 shadow-md transform scale-105' 
                            : 'border-orange-200/40 bg-white/60 hover:border-orange-300 hover:bg-orange-50/60'
                        }`}>
                          <Checkbox
                            id={area.name}
                            checked={focusAreas.includes(area.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFocusAreas([...focusAreas, area.name]);
                              } else {
                                setFocusAreas(focusAreas.filter(f => f !== area.name));
                              }
                            }}
                            className="border-orange-300"
                          />
                          <span className="text-lg">{area.emoji}</span>
                          <Label htmlFor={area.name} className="text-sm text-gray-700 font-medium cursor-pointer flex-1">{area.name}</Label>
                          {focusAreas.includes(area.name) && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Letter Length */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center">📏 Letter Length *</Label>
                    <Select value={letterLength} onValueChange={setLetterLength}>
                      <SelectTrigger className="h-12 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-orange-500/20 bg-white/70 backdrop-blur-sm rounded-xl">
                        <SelectValue placeholder="Choose your preferred letter length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concise">⚡ Concise (2-3 paragraphs)</SelectItem>
                        <SelectItem value="standard">📖 Standard (3-4 paragraphs)</SelectItem>
                        <SelectItem value="detailed">📚 Detailed (4-5 paragraphs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Industry */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center">🏭 Industry-Specific Approach *</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger className="h-12 border-2 border-orange-200/60 focus:border-orange-500 focus:ring-orange-500/20 bg-white/70 backdrop-blur-sm rounded-xl">
                        <SelectValue placeholder="Select the industry that best matches the role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">💻 Tech/Software</SelectItem>
                        <SelectItem value="finance">💰 Finance/Banking</SelectItem>
                        <SelectItem value="healthcare">⚕️ Healthcare</SelectItem>
                        <SelectItem value="marketing">📊 Marketing/Sales</SelectItem>
                        <SelectItem value="nonprofit">❤️ Non-Profit</SelectItem>
                        <SelectItem value="generic">🌐 Generic/Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-6">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-300 group-hover:blur-lg"></div>
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="relative w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-3 h-6 w-6 animate-spin" />
                        ✨ Crafting Your Masterpiece...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-6 w-6" />
                        🚀 Generate My Cover Letter
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <HowItWorks />
      <WhyUseThis />
      <Footer />
    </div>
  );
};

export default Index;
