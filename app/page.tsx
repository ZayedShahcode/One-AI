import NavBar from "./components/NavBar";
import Link from "next/link";
import { HiSparkles, HiChatBubbleLeftRight, HiRocketLaunch, HiLightBulb } from "react-icons/hi2";
import { FiArrowRight, FiZap, FiMessageSquare, FiShield, FiTrendingUp } from "react-icons/fi";
import { BsRobot, BsPeople, BsLightning } from "react-icons/bs";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6 border border-gray-200">
              <HiSparkles className="text-yellow-500" />
              Powered by Advanced AI
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">One</span> 
              <br />
              Destination For All Your 
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI</span> Needs
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Experience the future of conversational AI with our intelligent chatbot. 
              Get instant answers, creative solutions, and personalized assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/chat">
                <button className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                  <HiChatBubbleLeftRight size={24} />
                  Start Chatting
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </Link>
              
              <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 px-6 py-4 rounded-full font-medium transition-all duration-300 border border-gray-200 hover:border-gray-300">
                <HiRocketLaunch size={20} />
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-20"></div>
        </div>
        <div className="absolute bottom-20 left-1/3 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">OneAI</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the powerful features that make our AI assistant your perfect companion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover-lift">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <BsRobot className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Intelligent Responses</h3>
              <p className="text-gray-600 leading-relaxed">
                Get accurate and contextual answers powered by advanced AI algorithms that understand your needs.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover-lift">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <BsLightning className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Experience instant responses with our optimized infrastructure designed for speed and reliability.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover-lift">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <FiShield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your conversations are protected with enterprise-grade security and privacy measures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-200">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200 to-purple-200 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-10 h-10 rounded-xl flex items-center justify-center">
                  <HiRocketLaunch className="text-white" size={20} />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium">
                    <FiZap size={14} />
                    Coming Soon
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                RAG-Based PDF Parser
              </h3>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Revolutionary document analysis powered by Retrieval-Augmented Generation. 
                Upload your PDFs and get intelligent insights, summaries, and answers from your documents.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Smart document parsing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">Contextual Q&A</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Multi-format support</span>
                </div>
              </div>
              
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                <FiTrendingUp size={18} />
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of users who are already experiencing the power of AI
              </p>
              <Link href="/chat">
                <button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Your Journey
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
