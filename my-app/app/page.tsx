import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faXTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  return (
    <div className="bg-[#000000] relative min-h-screen overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        {/* Star decorations */}
        <div className="absolute left-[354px] top-[463px] w-3.5 h-3.5 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute left-[133px] top-[769px] w-5 h-5 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute right-[105px] top-[396px] w-7 h-7 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute right-[300px] top-[205px] w-3.5 h-3.5 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute left-[122px] top-[130px] w-4 h-4 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute right-[267px] bottom-[120px] w-3.5 h-3.5 text-white">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-20 backdrop-blur-sm bg-black/5 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <nav className="flex items-center gap-6 text-white text-sm">
            <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
            <a href="#problem" className="hover:text-gray-300 transition-colors">About</a>
            <a href="#features" className="hover:text-gray-300 transition-colors">Features</a>
          </nav>

          {/* Center Logo */}
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#465ff1] to-[#7b88f4] rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faRobot} className="w-5 h-5 text-white" />
            </div>
            <div className="text-white text-xl">
              <span className="font-semibold">Smart Chat Recall</span>
            </div>
          </div>

          {/* Right Social Media Icons */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/acridsoul" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
            </a>
            <a href="https://x.com/acrisoul" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" />
            </a>
            <a href="https://discord.com/xxxxx" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faDiscord} className="w-5 h-5" />
            </a>
            <a href="https://githinji.dev" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
              <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
            </a>
          </div>
        </div>
        </div>
      </header>

      {/* Main Content - Hero and Problem Side by Side */}
      <main className="relative z-10 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-200px)]">
            
            {/* Left Side - Hero Section */}
            <div className="text-center lg:text-left text-white">
              {/* Brand Title */}
              <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
                AI Smart Chat Recall Suite
              </div>
              
              {/* Hero Content */}
              <div className="space-y-7">
                {/* Main Heading */}
                <div>
                  <h1 className="font-medium text-5xl lg:text-6xl leading-tight tracking-tight">
                    Turn AI Conversations
                    <br />
                    into Actionable
                    <br />
                    Knowledge.
                  </h1>
                </div>

                {/* Description */}
                <p className="text-white/60 text-base leading-7 tracking-tight">
                  Stop losing valuable insights in endless chat histories. The AI Smart Chat Recall Suite is a 
                  client-side software that transforms your favorite AI chatbot into a powerful tool for information 
                  processing and knowledge management. Organize, find, and build upon your AI-generated content like never before.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center lg:justify-start gap-7 mt-12">
                <Link
                  href="/auth/signup"
                  className="bg-white text-black font-medium px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>

            {/* Right Side - Problem Section */}
            <div id="problem" className="text-center lg:text-left">
              <h2 className="text-white font-medium text-3xl lg:text-4xl mb-4">
                Your AI is Smart. Your Chat History Isn't.
              </h2>
                        <p className="text-white/60 text-lg mb-16 max-w-3xl mx-auto">
            Current AI chatbot platforms create frustrating roadblocks that hinder your productivity.
          </p>
          
          <div className="grid grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Disorganized Chats</h3>
              <p className="text-white/70 leading-relaxed">
                Conversations lack proper titles and organization, making it nearly impossible to find past interactions efficiently.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">No Search Functionality</h3>
              <p className="text-white/70 leading-relaxed">
                The absence of features to search and filter chats by topic means you're often forced to start over, leading to redundant requests and wasted time.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Fragmented Workflows</h3>
              <p className="text-white/70 leading-relaxed">
                Users are forced to use external apps for note-taking, breaking their concentration and scattering valuable information across different platforms.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Limited Productivity</h3>
              <p className="text-white/70 leading-relaxed">
                Without proper organization and search capabilities, users spend more time looking for information than actually using it productively.
              </p>
            </div>
          </div>
            </div>

          </div>
        </div>
      </main>

      {/* Features Section */}
            {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white font-medium text-4xl mb-4">
              The Productivity Suite Your AI is Missing
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              The AI Smart Chat Recall Suite integrates directly into your workflow, giving you the features you need to work smarter and faster.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 text-left max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Smart Content Organization</h3>
              <p className="text-white/70 leading-relaxed">
                Organize your chats into custom categories like "Coding," "Math," or "Research". Our suite helps you manage your projects with a clear, engaging user interface designed for faster data retrieval.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Advanced Note-Taking</h3>
              <p className="text-white/70 leading-relaxed">
                Utilize context-aware note-taking capabilities directly within the chat interface. Summarize discussions and link notes to specific chat segments to centralize your knowledge management.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Semantic Search Engine</h3>
              <p className="text-white/70 leading-relaxed">
                Instantly find what you're looking for. Our suite includes a semantic search engine capable of quickly retrieving relevant information across your entire chat history database.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
              <h3 className="text-white font-semibold text-xl mb-4">Client-Side Speed & Privacy</h3>
              <p className="text-white/70 leading-relaxed">
                We prioritize your privacy and speed. By processing most tasks locally on your device, our suite reduces latency and server dependency. Your conversations are stored locally with encryption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white font-medium text-4xl mb-6">
            Built for Professionals and Power Users
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The AI Smart Chat Recall Suite is designed for developers, researchers, technical writers, and enterprise teams who rely on AI for their daily work. We bridge the gap between AI chatbots and true productivity tools, making your AI-generated content more accessible and actionable.
          </p>
        </div>
      </section>

      {/* Final Call-to-Action Section */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white font-medium text-4xl mb-6">
            Ready to Supercharge Your AI Workflow?
          </h2>
          <p className="text-white/60 text-lg mb-12 max-w-3xl mx-auto">
            Stop letting a disorganized chat history slow you down. Unlock the full potential of your AI conversations with the AI Smart Chat Recall Suite.
          </p>
          
          <Link
            href="/auth/signup"
            className="bg-white text-black font-medium px-8 py-3.5 rounded-full hover:bg-gray-100 transition-colors inline-block"
          >
            Get Early Access
          </Link>
        </div>
      </section>

      {/* Background Gradient Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[661px] h-[661px] opacity-10">
        <div className="w-full h-full bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
