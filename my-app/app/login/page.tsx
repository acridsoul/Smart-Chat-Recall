import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/assets";

export default function LoginPage() {
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
      <main className="pt-[120px] px-[150px] pb-[100px] flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-manrope font-extralight text-white text-[64px] leading-[70px] mb-6">
              Welcome Back
            </h1>
            <p className="font-manrope font-extralight text-gray-300 text-[24px] leading-[32px]">
              Sign in to continue your AI conversation journey
            </p>
          </div>

          {/* Login Form Card */}
          <div className="bg-black border border-gray-800 rounded-lg p-8">
            {/* Social Auth Buttons */}
            <div className="space-y-4 mb-6">
              <button className="w-full border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:border-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-roboto text-white text-[16px]">Continue with Google</span>
              </button>
              
              <button className="w-full border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 hover:border-gray-600 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="font-roboto text-white text-[16px]">Continue with GitHub</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">or sign in with email</span>
              </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-roboto text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 hover:border-gray-600 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-roboto text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-600 hover:border-gray-600 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-4 w-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500 bg-gray-900"
                  />
                  <label htmlFor="remember" className="text-sm font-roboto text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 font-roboto">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#3549cb] text-white font-roboto text-[16px] py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Footer Link */}
          <div className="text-center mt-8">
            <span className="font-roboto text-gray-300 text-[16px]">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
