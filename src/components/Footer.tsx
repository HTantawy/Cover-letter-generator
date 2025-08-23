import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Twitter, Mail, Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced CTA Section */}
        <div className="px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
                <div className="text-7xl mb-6">✨</div>
                <h3 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                  Transform Your Career Today
                </h3>
                <p className="text-2xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
                  Join the thousands who've already upgraded their job search with AI-powered cover letters
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-white to-cyan-200 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
                    <Button 
                      size="lg" 
                      className="relative bg-white text-slate-900 hover:bg-gray-100 font-bold px-12 py-4 text-xl rounded-2xl transform hover:scale-105 transition-all duration-300 shadow-2xl"
                    >
                      🚀 Start Free Now
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8 text-white/70">
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Completely Free</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span className="font-medium">No Account Needed</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span className="font-medium">Instant Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
                      <span className="text-white text-2xl transform -rotate-3">✦</span>
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">Letter Forge</span>
                </div>
                <p className="text-white/70 mb-6 max-w-md leading-relaxed">
                  The most advanced AI-powered cover letter generator. Create professional, personalized letters that get you hired.
                </p>
                <div className="flex items-center space-x-2 text-white/60 text-sm">
                  <span>Built with</span>
                  <Heart className="h-4 w-4 text-red-400 animate-pulse" />
                  <span>using cutting-edge AI</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-lg flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-cyan-400" />
                  Legal & Privacy
                </h4>
                <ul className="space-y-4 text-white/70">
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Terms of Service</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Data Protection</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 text-lg flex items-center">
                  <Mail className="mr-2 h-5 w-5 text-purple-400" />
                  Connect
                </h4>
                <ul className="space-y-4 text-white/70">
                  <li>
                    <a 
                      href="#" 
                      className="hover:text-white transition-colors duration-200 flex items-center group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <Twitter className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Follow Updates</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">Get Support</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 mt-16 pt-8 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-white/60 text-sm">
                  &copy; 2024 Letter Forge. Crafted with passion for your success.
                </p>
                <div className="flex items-center space-x-6 text-white/60 text-sm">
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    All systems operational
                  </span>
                  <span>v2.1.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;