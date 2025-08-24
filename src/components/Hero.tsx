
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById('generate');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="hero" className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
     

      <div className="relative z-10 px-6 pt-32 pb-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Craft Perfect
          </span><br />
          <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent relative">
            Cover Letters
            <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
              <path d="M0 6 Q75 0 150 6 T300 6" stroke="url(#underline)" strokeWidth="3" fill="none"/>
              <defs>
                <linearGradient id="underline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899"/>
                  <stop offset="50%" stopColor="#a855f7"/>
                  <stop offset="100%" stopColor="#6366f1"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
          Transform your job applications with AI-powered cover letters that 
          <span className="text-cyan-300 font-medium"> captivate</span> recruiters and 
          <span className="text-pink-300 font-medium"> showcase</span> your unique value.
        </p>
        
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="relative bg-white text-gray-900 hover:bg-gray-50 text-lg px-10 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Create Magic ✨
            <ArrowDown className="ml-3 h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-white/70">
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">No Sign-Up</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <span className="font-medium">AI-Powered</span>
          </div>
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="font-medium">ATS Optimized</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
    </header>
  );
};

export default Hero;
