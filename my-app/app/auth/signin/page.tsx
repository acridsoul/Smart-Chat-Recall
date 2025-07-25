'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function SignInPage() {
  return (
    <div className="bg-[#000000] relative size-full min-h-screen overflow-hidden">
      {/* Background Stars */}
      <div className="absolute inset-0">
        <div className="absolute left-[200px] top-[150px] w-3 h-3 text-white/20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute right-[150px] top-[300px] w-4 h-4 text-white/20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <div className="absolute left-[100px] bottom-[200px] w-3.5 h-3.5 text-white/20">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-screen relative z-10">
        {/* Left Side - Hero Section */}
        <div className="flex-1 relative bg-white/5 backdrop-blur-sm rounded-r-[20px] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
          
          {/* Additional Stars for this section */}
          <div className="absolute inset-0">
            <div className="absolute left-[120px] top-[180px] w-2 h-2 text-white/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute right-[90px] top-[250px] w-3 h-3 text-white/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="absolute left-[180px] bottom-[200px] w-2.5 h-2.5 text-white/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-8">
            {/* Top Section */}
            <div className="text-center mb-auto pt-24">
              <h1 className="font-black text-4xl leading-tight mb-4">
                Welcome Back to Smart Chat Recall
              </h1>
              <p className="font-medium text-xl">
                Continue Your Journey to Effortless Management.
              </p>
            </div>
            
            {/* Bottom Section */}
            <div className="text-center mb-24">
              <h2 className="font-bold text-4xl mb-4">
                Ready to Collaborate
              </h2>
              <p className="font-normal text-2xl max-w-md">
                Sign in to access your workspace and continue where you left off.
              </p>
              
              {/* Pagination Dots */}
              <div className="flex gap-1 justify-center mt-12">
                <div className="bg-[#96bfff] rounded-full size-2" />
                <div className="bg-white h-2 rounded-[10px] w-6" />
                <div className="bg-[#96bfff] rounded-full size-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              <div className="bg-gradient-to-br from-[#465ff1] to-[#7b88f4] rounded size-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="w-4 h-4 text-white" />
              </div>
              <h1 className="font-bold text-2xl text-white">Smart Chat Recall</h1>
            </div>

            {/* Tabs */}
            <div className="bg-white/10 p-1 rounded-lg mb-8">
              <div className="flex">
                <Link href="/auth/signup" className="flex-1 bg-transparent rounded-lg">
                  <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-2 relative rounded-lg size-full">
                    <div className="font-normal leading-[0] not-italic relative shrink-0 text-white/60 text-[16px] text-center text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Sign Up</p>
                    </div>
                  </div>
                </Link>
                <div className="flex-1 bg-[#465ff1] rounded-lg">
                  <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-2 relative rounded-lg size-full">
                    <div className="font-medium leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
                      <p className="block leading-[normal] whitespace-pre">Sign In</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="font-medium text-white text-base mb-2 block">
                Email 
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full h-12 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/60 focus:outline-none focus:border-[#465ff1] focus:bg-white/15"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-white text-base">
                  Password
                </label>
                <a href="#" className="text-white/60 text-xs underline hover:text-white/80">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                className="w-full h-12 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/60 focus:outline-none focus:border-[#465ff1] focus:bg-white/15"
                placeholder="Enter Password"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-[#465ff1] bg-white/10 border border-white/20 rounded focus:ring-[#465ff1] focus:ring-2 mr-2"
              />
              <label htmlFor="remember" className="text-white/80 text-xs">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button className="w-full bg-[#465ff1] text-white font-bold text-base h-12 rounded-lg mb-6 hover:bg-[#3a4fd9] transition-colors">
              Sign In
            </button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-transparent px-3 text-xs text-white/60 font-medium">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                <FontAwesomeIcon icon={faGoogle} className="text-xl text-white" />
              </button>
              <button className="flex-1 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                <FontAwesomeIcon icon={faApple} className="text-xl text-white" />
              </button>
              <button className="flex-1 h-12 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                <FontAwesomeIcon icon={faMicrosoft} className="text-xl text-white" />
              </button>
            </div>

            {/* Terms */}
            <p className="text-center text-white/60 text-xs leading-normal">
              <span className="text-white/60">Don't have an account? </span>
              <Link href="/auth/signup" className="text-[#465ff1] font-medium underline hover:text-[#3a4fd9]">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
