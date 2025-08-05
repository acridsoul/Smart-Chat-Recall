import { images, icons } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";

export default function LitcollectiveHome() {
  return (
    <div className="bg-black relative min-h-screen w-full overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="absolute bg-black flex items-center justify-between left-0 px-[150px] py-5 top-0 w-full z-50">
        <div className="flex items-center">
          <Image
            src={images.companyLogo}
            alt="LitCollective Logo"
            width={44}
            height={44}
            className="w-11 h-11 object-cover"
          />
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 px-4 py-2">
            <Image
              src={images.homeIcon}
              alt="Home"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-roboto text-white text-[15px]">home</span>
          </div>
          
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
            <Image
              src={icons.dropdownFrame}
              alt="Dropdown"
              width={16}
              height={16}
              className="ml-3 w-4 h-4"
            />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="absolute flex items-start justify-start left-[180px] top-[264px]">
        <div className="h-[422px] relative w-[1140px]">
          <div className="absolute flex flex-col font-manrope font-extralight h-[324px] justify-center left-0 text-white text-[72px] text-left top-[156px] -translate-y-1/2 w-[731.872px] leading-[75px]">
            <p>Supercharge Your AI Chats – Smarter Search, Better Recall.</p>
          </div>
          
          <div className="absolute flex gap-[60px] items-start justify-start left-0 top-[354px]">
            <Link href="/signup" className="h-[58px] relative w-[184.781px] border border-white flex items-center justify-center group hover:bg-white hover:text-black transition-colors">
              <span className="font-manrope font-extralight text-white text-[16px] group-hover:text-black">
                Get Started
              </span>
            </Link>
            
            <Link href="/login" className="border border-white flex items-center justify-center px-[22px] py-[17px] hover:bg-white hover:text-black transition-colors group">
              <span className="font-manrope font-extralight text-white text-[16px] group-hover:text-black">
                Login
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="absolute bg-black flex flex-col items-start justify-start left-0 pb-5 pt-[100px] px-[100px] top-[686px] w-full">
        <div className="h-[173px] relative w-[1240px]">
          <div className="absolute h-[173px] left-0 right-[583.53px] top-0">
            <div className="absolute left-0 top-[calc(50%-67px)] w-40 h-[39px]">
              <Image
                src={images.mainLogo}
                alt="Main Logo"
                width={160}
                height={39}
              />
            </div>
            
            <div className="absolute left-0 top-[47px] pb-10">
              <h2 className="font-manrope font-extralight text-white text-[40px] leading-[43px]">
                Your data stays yours. No tracking. <br />No ads. Just better AI chats
              </h2>
            </div>
          </div>
          
          <div className="absolute flex gap-5 items-start justify-start right-0 top-0 pt-5">
            <button className="h-[58px] border border-white w-[218.359px] flex items-center justify-center group hover:bg-white transition-colors">
              <span className="font-manrope font-extralight text-white text-[16px] group-hover:text-black">
                Talk to a specialist
              </span>
            </button>
            
            <button className="bg-[#3549cb] flex items-center justify-center px-[25px] py-4 hover:bg-blue-700 transition-colors">
              <span className="font-roboto text-white text-[16px]">Get in touch</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <div className="h-8 relative w-[620px]">
            {/* Social Media Links */}
            <div className="flex gap-8 items-center">
              <div className="flex items-center gap-2">
                <Image src={images.twitter} alt="Twitter" width={16} height={16} />
                <span className="font-manrope font-extralight text-white text-[16px]">Twitter</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Image src={images.instagram} alt="Instagram" width={16} height={16} />
                <span className="font-manrope font-extralight text-white text-[16px]">Instagram</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-white">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                <span className="font-manrope font-extralight text-white text-[16px]">GitHub</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div 
          className="absolute bottom-0 right-[351px] top-[184.36px] w-[180px]"
          style={{
            backgroundImage: `url('${images.bottomLeftPattern}')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div 
          className="absolute bottom-[192.17px] right-[166px] top-0 w-[200px]"
          style={{
            backgroundImage: `url('${images.bottomRightPattern}')`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </section>
    </div>
  );
}
