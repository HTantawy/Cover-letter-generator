import { Clock, Target, Zap, Users, ArrowRight } from "lucide-react";

const WhyUseThis = () => {
  const features = [
    {
      icon: Clock,
      title: "Saves Hours of Time",
      description: "Generate a personalized cover letter in under 3 minutes instead of spending hours writing from scratch",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50/80 to-orange-50/80"
    },
    {
      icon: Target,
      title: "Sounds Human & Tailored",
      description: "Our AI understands context and creates natural, engaging letters that sound authentically you",
      gradient: "from-emerald-500 to-teal-500",
      bgGradient: "from-emerald-50/80 to-teal-50/80"
    },
    {
      icon: Zap,
      title: "Uses Your Real CV",
      description: "Analyzes your actual experience and skills to create relevant, accurate cover letters",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50/80 to-indigo-50/80"
    },
    {
      icon: Users,
      title: "Perfect Tone Control",
      description: "Adjust creativity levels and use our editing tools to match any company culture",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50/80 to-pink-50/80"
    },
  ];

  return (
    <section id="why-coverly" className="py-24 px-4 bg-gradient-to-br from-white via-cyan-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 right-20 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-cyan-100 to-purple-100 rounded-full px-6 py-2 text-sm font-semibold text-purple-800 mb-4">
              Why Choose Coverly
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-cyan-900 to-purple-900 bg-clip-text text-transparent">
            💎 Built for Success
          </h2>
          <p className="text-xl text-gray-600/90 max-w-3xl mx-auto font-light leading-relaxed">
            Join thousands of job seekers who've transformed their application process with our intelligent platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className={`relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105`}>
                
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl transform group-hover:rotate-6 transition-all duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-700 leading-relaxed font-medium mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUseThis;