import { Upload, FileText, Sparkles, Edit3 } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload CV",
      description: "Simply drag and drop your PDF resume or CV to get started",
      emoji: "📄",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Add Job Info",
      description: "Paste the job description and customize the tone to match your style",
      emoji: "📋",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Sparkles,
      title: "Generate Letter",
      description: "Our AI analyzes your CV and creates a personalized cover letter",
      emoji: "✨",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      icon: Edit3,
      title: "Refine & Polish",
      description: "Edit any part instantly with our intelligent refinement tools",
      emoji: "🎨",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-purple-50/30 to-cyan-50/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 text-sm font-semibold text-purple-800 mb-4">
              How It Works
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
            🚀 Four Simple Steps
          </h2>
          <p className="text-xl text-gray-600/90 max-w-3xl mx-auto font-light leading-relaxed">
            Transform your job applications with our streamlined process that gets results in minutes, not hours
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-full z-0">
                  <div className="border-t-2 border-dashed border-purple-300/60 transform -translate-x-1/2 animate-pulse"></div>
                </div>
              )}
              
              {/* Card */}
              <div className="relative z-10 text-center">
                <div className="relative mb-8">
                  {/* Icon Container */}
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <step.icon className="h-10 w-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  
                  {/* Floating Emoji */}
                  <div className="absolute -top-3 -left-3 text-2xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                    {step.emoji}
                  </div>
                </div>
                
                <div className="relative bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:bg-white/80">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="relative group inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 border border-white/40">
              <p className="text-lg font-semibold text-gray-800">
                ⏱️ Average time: <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Under 3 minutes</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;