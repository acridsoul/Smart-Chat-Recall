import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/assets";

export default function AboutPage() {
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
          
          <Link href="/how-it-works" className="font-roboto text-white text-[16px] cursor-pointer hover:text-gray-300">
            How It Works
          </Link>
          
          <span className="font-roboto text-blue-500 text-[16px] cursor-pointer">
            about us
          </span>
          
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
        <section className="mb-[80px]">
          <h1 className="font-manrope font-extralight text-white text-[64px] leading-[70px] mb-6">
            About Smart Chat Recall
          </h1>
          <p className="font-manrope font-extralight text-gray-300 text-[24px] leading-[32px] max-w-[800px]">
            Supercharge your AI conversations with intelligent organization, semantic search, and privacy-first design.
          </p>
        </section>

        {/* Key Features Section */}
        <section>
          <h2 className="font-manrope font-extralight text-white text-[48px] leading-[54px] mb-[60px]">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px]">
            {/* Smart Chat Organization */}
            <div className="rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-[32px] mr-4">🗂️</span>
                <h3 className="font-manrope font-extralight text-white text-[28px]">
                  Smart Chat Organization
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Automatically categorize conversations by topic (Tech, Finance, Coding, etc.)
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Custom folders and tags for effortless retrieval
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Context-aware chat titling that actually makes sense
                </li>
              </ul>
            </div>

            {/* Semantic Search */}
            <div className="rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-[32px] mr-4">🔍</span>
                <h3 className="font-manrope font-extralight text-white text-[28px]">
                  Semantic Search
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Find any conversation instantly with natural language queries
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  "Find that Python code about web scraping from last month" just works
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Fuzzy matching understands what you mean, not just what you type
                </li>
              </ul>
            </div>

            {/* Integrated Note-Taking */}
            <div className="rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-[32px] mr-4">📝</span>
                <h3 className="font-manrope font-extralight text-white text-[28px]">
                  Integrated Note-Taking
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Highlight and annotate important responses
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Auto-generate summaries of long conversations
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Link notes to specific chat segments for perfect recall
                </li>
              </ul>
            </div>

            {/* Privacy-First Design */}
            <div className="rounded-lg p-8">
              <div className="flex items-center mb-6">
                <span className="text-[32px] mr-4">🔒</span>
                <h3 className="font-manrope font-extralight text-white text-[28px]">
                  Privacy-First Design
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  All data processed and stored locally on your device
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Military-grade encryption for sensitive conversations
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  No server dependency means no latency at peak times
                </li>
              </ul>
            </div>

            {/* Cross-Platform Sync */}
            <div className="rounded-lg p-8 lg:col-span-2">
              <div className="flex items-center mb-6">
                <span className="text-[32px] mr-4">🌐</span>
                <h3 className="font-manrope font-extralight text-white text-[28px]">
                  Cross-Platform Sync
                </h3>
              </div>
              <ul className="space-y-4 max-w-[600px]">
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Pick up where you left off across all your devices
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Browser extension + mobile app coming soon
                </li>
                <li className="font-manrope font-extralight text-gray-300 text-[16px] leading-[24px]">
                  Cloud sync optional for team collaboration
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-[100px] text-center">
          <h2 className="font-manrope font-extralight text-white text-[40px] leading-[46px] mb-8">
            Ready to supercharge your AI conversations?
          </h2>
          <div className="flex gap-6 justify-center">
            <button className="bg-[#3549cb] flex items-center justify-center px-[32px] py-4 hover:bg-blue-700 transition-colors">
              <span className="font-roboto text-white text-[16px]">Get Started</span>
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
