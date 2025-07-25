'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faApple, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

export default function SignInPage() {
  return (
    <div className="bg-[#ffffff] relative size-full min-h-screen">
      {/* Main Container */}
      <div className="flex h-screen">
        {/* Left Side - Hero Section */}
        <div className="flex-1 relative bg-gradient-to-br from-[#465ff1] to-[#7b88f4] rounded-r-[20px] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#465ff15e] to-[#465ff1]" />
          
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
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-16">
              <div className="bg-[#ecf0ff] rounded size-6 flex items-center justify-center">
                <FontAwesomeIcon icon={faRobot} className="w-4 h-4 text-[#465ff1]" />
              </div>
              <h1 className="font-bold text-2xl text-[#26203b]">Smart Chat Recall</h1>
            </div>

            {/* Tabs */}
            <div className="bg-[#ecf0ff] p-1 rounded-lg mb-8">
              <div className="flex">
                <Link href="/auth/signup" className="flex-1 bg-[#ecf0ff] rounded-lg">
                  <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-5 py-2 relative rounded-lg size-full">
                    <div className="font-normal leading-[0] not-italic relative shrink-0 text-[#9c9aa5] text-[16px] text-center text-nowrap">
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
              <label className="font-medium text-[#26203b] text-base mb-2 block">
                Email 
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full h-12 px-4 py-2 bg-white border border-[rgba(70,95,241,0.4)] rounded-lg shadow-[0px_4px_8px_0px_rgba(70,95,241,0.1)] text-[#26203b] text-sm focus:outline-none focus:border-[#465ff1]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-[#26203b] text-base">
                  Password
                </label>
                <a href="#" className="text-[#9c9aa5] text-xs underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                className="w-full h-12 px-4 py-2 bg-white border border-[rgba(70,95,241,0.4)] rounded-lg text-[#9c9aa5] text-sm focus:outline-none focus:border-[#465ff1]"
                placeholder="Enter Password"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-8">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-[#465ff1] border border-gray-300 rounded focus:ring-[#465ff1] focus:ring-2 mr-2"
              />
              <label htmlFor="remember" className="text-[#26203b] text-xs">
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
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-[rgba(156,154,165,0.3)] font-medium">OR</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 mb-8">
              <button className="flex-1 h-12 bg-white border border-[rgba(70,95,241,0.4)] rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faGoogle} className="text-xl" />
              </button>
              <button className="flex-1 h-12 bg-white border border-[rgba(70,95,241,0.4)] rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faApple} className="text-xl text-black" />
              </button>
              <button className="flex-1 h-12 bg-white border border-[rgba(70,95,241,0.4)] rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <FontAwesomeIcon icon={faMicrosoft} className="text-xl" />
              </button>
            </div>

            {/* Terms */}
            <p className="text-center text-[#9c9aa5] text-xs leading-normal">
              <span className="text-[#9c9aa5]">Don't have an account? </span>
              <Link href="/auth/signup" className="text-[#465ff1] font-medium underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
