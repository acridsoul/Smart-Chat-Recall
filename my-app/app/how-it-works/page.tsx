import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/assets";

export default function HowItWorksPage() {
  return (
    <div className="bg-black relative min-h-screen w-full overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="absolute bg-black flex items-center justify-between left-0 px-[150px] py-5 top-0 w-full z-50">
        <Link href="/" className="flex items-center">
          <Image
            src={images.companyLogo}
            alt="Smart Chat Recall Logo"
            width={44}
            height={44}
            className="w-11 h-11 object-cover"
          />
        </Link>
        
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2 px-4 py-2">
            <Image
              src={images.homeIcon}
              alt="Home"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-roboto text-white text-[15px]">home</span>
          </Link>
          
          <span className="font-roboto text-blue-500 text-[16px] cursor-pointer">
            How It Works
          </span>
          
          <Link href="/about" className="font-roboto text-white text-[16px] cursor-pointer hover:text-gray-300">
            about us
          </Link>
          
          <span className="font-roboto text-white text-[16px] cursor-pointer hover:text-gray-300">
            FAQ
          </span>
          
          <span className="font-roboto text-white text-[16px] cursor-pointer hover:text-gray-300">
            what we do
          </span>
          
          <span className="font-roboto text-white text-[15px] cursor-pointer hover:text-gray-300">
            contact
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="font-roboto text-white text-[15px] hover:text-gray-300">
            Sign In
          </Link>
          <Link href="/signup" className="bg-[#3549cb] px-6 py-2 rounded font-roboto text-white text-[15px] hover:bg-blue-700 transition-colors">
            Get Started
          </Link>
          <div className="flex items-center border border-gray-800 px-6 py-3 rounded">
            <div className="flex items-center space-x-2">
              <Image
                src={images.usFlag}
                alt="US Flag"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span className="font-manrope font-extralight text-white text-[12px]">EN-US</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-[120px] px-[150px] pb-[100px]">
        {/* Hero Section */}
        <section className="mb-[80px] text-center">
          <h1 className="font-manrope font-extralight text-white text-[64px] leading-[70px] mb-6">
            How It Works
          </h1>
          <p className="font-manrope font-extralight text-gray-300 text-[24px] leading-[32px] max-w-[800px] mx-auto">
            Transform how you interact with AI chatbots in 3 simple steps
          </p>
        </section>

        {/* Steps Section */}
        <section className="mb-[100px]">
          <div className="space-y-[80px]">
            {/* Step 1 */}
            <div className="flex items-start gap-[60px]">
              <div className="flex-shrink-0">
                <div className="w-[80px] h-[80px] rounded-full bg-[#3549cb] flex items-center justify-center">
                  <span className="font-manrope font-extralight text-white text-[32px]">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-manrope font-extralight text-white text-[36px] leading-[42px] mb-6">
                  Sign Up & Connect
                </h3>
                <ul className="space-y-4">
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Create your account in seconds (Google/GitHub SSO supported)
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Securely link your favorite AI platforms (ChatGPT, Gemini, Claude API keys)
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Your data never leaves your control
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-[60px]">
              <div className="flex-shrink-0">
                <div className="w-[80px] h-[80px] rounded-full bg-[#3549cb] flex items-center justify-center">
                  <span className="font-manrope font-extralight text-white text-[32px]">2</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-manrope font-extralight text-white text-[36px] leading-[42px] mb-6">
                  Chat Smarter
                </h3>
                <ul className="space-y-4">
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    All your AI conversations sync automatically to your private dashboard
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Our system auto-categorizes chats by topic (Code, Research, Business, etc.)
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Add custom tags (#important, #project-alpha) for effortless organization
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-[60px]">
              <div className="flex-shrink-0">
                <div className="w-[80px] h-[80px] rounded-full bg-[#3549cb] flex items-center justify-center">
                  <span className="font-manrope font-extralight text-white text-[32px]">3</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-manrope font-extralight text-white text-[36px] leading-[42px] mb-6">
                  Recall Instantly
                </h3>
                <ul className="space-y-4">
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Natural language search: "Show me React component examples from last week"
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Semantic understanding finds related concepts, not just keywords
                  </li>
                  <li className="font-manrope font-extralight text-gray-300 text-[18px] leading-[26px]">
                    Visual timeline lets you jump to any conversation by date/topic
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Bonus Section */}
        <section className="mb-[100px]">
          <h2 className="font-manrope font-extralight text-white text-[48px] leading-[54px] mb-[60px] text-center">
            Bonus: Supercharge Your Workflow
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-[40px]">
            {/* AI-Powered Notes */}
            <div className="text-center p-8">
              <div className="text-[48px] mb-4">✨</div>
              <h3 className="font-manrope font-extralight text-white text-[24px] leading-[30px] mb-4">
                AI-Powered Notes
              </h3>
              <p className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                Highlight text to generate summaries & action items
              </p>
            </div>

            {/* Cross-Chat Connections */}
            <div className="text-center p-8">
              <div className="text-[48px] mb-4">🔗</div>
              <h3 className="font-manrope font-extralight text-white text-[24px] leading-[30px] mb-4">
                Cross-Chat Connections
              </h3>
              <p className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                Link related conversations across different AI tools
              </p>
            </div>

            {/* Military-Grade Encryption */}
            <div className="text-center p-8">
              <div className="text-[48px] mb-4">🔒</div>
              <h3 className="font-manrope font-extralight text-white text-[24px] leading-[30px] mb-4">
                Military-Grade Encryption
              </h3>
              <p className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                All data encrypted in transit and at rest
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="font-manrope font-extralight text-white text-[40px] leading-[46px] mb-8">
            Ready to transform your AI workflow?
          </h2>
          <div className="flex gap-6 justify-center">
            <button className="bg-[#3549cb] flex items-center justify-center px-[32px] py-4 hover:bg-blue-700 transition-colors">
              <span className="font-roboto text-white text-[16px]">Get Started Now</span>
            </button>
            <Link href="/" className="border border-white flex items-center justify-center px-[32px] py-4 hover:bg-white hover:text-black transition-colors group">
              <span className="font-manrope font-extralight text-white text-[16px] group-hover:text-black">
                Back to Home
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
