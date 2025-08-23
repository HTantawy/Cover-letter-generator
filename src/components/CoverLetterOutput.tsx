
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Copy, Download, RefreshCw, Mail, Edit3 } from "lucide-react";

interface CoverLetterOutputProps {
  letter: string;
  onBack: () => void;
}

const CoverLetterOutput = ({ letter, onBack }: CoverLetterOutputProps) => {
  const [editedLetter, setEditedLetter] = useState(letter);
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedLetter);
      toast({
        title: "Copied to clipboard",
        description: "Your cover letter has been copied successfully.",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editedLetter], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "cover-letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started",
      description: "Your cover letter is being downloaded.",
    });
  };

  const handleRegenerate = () => {
    toast({
      title: "Feature coming soon",
      description: "Regeneration feature will be available in the next update.",
    });
  };

  const handleEmailSend = () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send an email through an edge function
    toast({
      title: "Feature coming soon",
      description: "Email functionality will be available in the next update.",
    });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Form</span>
          </Button>
          
          <h1 className="text-2xl font-bold text-gray-900">
            Your Generated Cover Letter
          </h1>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cover Letter */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Generated Cover Letter
                </h2>
                <p className="text-sm text-gray-600">
                  Edit the text directly in the box below
                </p>
              </div>
              
              <Textarea
                value={editedLetter}
                onChange={(e) => setEditedLetter(e.target.value)}
                className="min-h-[500px] text-base leading-relaxed border-0 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Your cover letter will appear here..."
              />
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate Letter
                </Button>
                
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy to Clipboard
                </Button>
                
                <Button
                  onClick={handleDownload}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download as Text
                </Button>
              </div>
            </div>

            {/* Email to Self */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                <Mail className="h-4 w-4 inline mr-2" />
                Email to Myself
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button
                  onClick={handleEmailSend}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send Email
                </Button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-3">
                <Edit3 className="h-4 w-4 inline mr-2" />
                Editing Tips
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li>• Edit the text directly in the main text area</li>
                <li>• Copy the final version to your clipboard</li>
                <li>• Download as a text file for later use</li>
                <li>• Use this as a starting point and customize further</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterOutput;
