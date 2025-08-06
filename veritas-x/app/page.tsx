import Image from "next/image";
import Link from "next/link";

// Image asset constants from Figma (using localhost URLs as provided)
const img631621F044C1D2B3B532A6B4AssPng = "http://localhost:3845/assets/8e31a78ce9c8895b8fafab95cf61d39ed5694e0d.png";
const imgA = "http://localhost:3845/assets/e651702f45ed6d93f6bb93bd1d0750cc45ec8f31.png";
const imgA1 = "http://localhost:3845/assets/d1487603468967410658db9c05248791d1456fdd.png";
const imgA2 = "http://localhost:3845/assets/ab37c783278563d323cfedc363c4f638a66d9654.png";
const imgA3 = "http://localhost:3845/assets/09f1ead41401355d49e343da80b5aca91a234c9c.png";
const imgA4 = "http://localhost:3845/assets/04a03c8f690a2a3c841d67f34e900d12509bf933.png";
const img634D662F2C1716747C1Dc1D9AssetPng = "http://localhost:3845/assets/562e2264a2b151920f1c16cafea8d1ed62b56d9d.png";
const img634D663A05B987Ea40313Ef5AssetPng = "http://localhost:3845/assets/a690d88d4fe59f144c25738a33eced3e80165349.png";
const img631644375Dd15Fe5B12Ace81Logo202Png = "http://localhost:3845/assets/5f0145b9274c9f60f1babf48a64858310f5d62cd.png";
const imgA5 = "http://localhost:3845/assets/71cd350ede0ee88ec3f616d2d9f463228b453cc7.png";
const img636D4Bbd3Bfe2302466C6921Flag20Of20The20United20StatesPng = "http://localhost:3845/assets/038b6c48c6015cb527ea9bd565bed19a4cfd59d9.png";
const img6311065760F252Ed6D4D1E88ArrowRightAltFill0Wght400Grad0Opsz48201Svg = "http://localhost:3845/assets/f8388c8ab703b8c627a14417030f4bcf3dc669fd.svg";
const imgFrame = "http://localhost:3845/assets/64eee00ecee9818a18e76ae22eb7085bd15e8307.svg";

export default function Home() {
  return (
    <div
      className="bg-[#000000] relative w-full min-h-screen"
      data-name="litcollective.io"
    >
      {/* Navigation */}
      <div
        className="absolute bg-[#000000] box-border content-stretch flex flex-row items-start justify-start left-0 px-[150px] py-5 top-0 w-full"
        data-name="div"
      >
        <div
          className="h-11 relative shrink-0 w-[1140px]"
          data-name="div"
        >
          <div
            className="absolute bg-no-repeat bg-[length:100%_100%] bg-[0_0] left-0 w-11 h-11 top-0"
            data-name="logo"
            style={{
              backgroundImage: `url('${img631644375Dd15Fe5B12Ace81Logo202Png}')`,
            }}
          />
          <div
            className="absolute h-11 left-[396.52px] right-0 top-1/2 translate-y-[-50%]"
            data-name="nav"
          >
            <div
              className="absolute bg-left bg-no-repeat bg-[length:16.3%_39.77%] box-border content-stretch flex flex-row items-start justify-start pb-[11px] pl-[17.594px] pr-[18.031px] pt-[9px] top-0 translate-x-[-50%]"
              data-name="a"
              style={{
                backgroundImage: `url('${imgA5}')`,
                left: "calc(50% - 332.914px)",
              }}
            >
              <div
                className="flex flex-col font-roboto font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[15px] text-left text-nowrap"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p className="block leading-[24px] whitespace-pre">home</p>
              </div>
            </div>
            <div
              className="absolute flex flex-col font-roboto font-normal h-[25px] justify-center leading-[0] text-[#ffffff] text-[16px] text-left top-[21.5px] translate-y-[-50%] w-[98.091px]"
              style={{
                left: "calc(50% - 276.07px)",
                fontVariationSettings: "'wdth' 100",
              }}
            >
              <p className="block leading-[24px]">cases studies</p>
            </div>
            <div
              className="absolute flex flex-col font-roboto font-normal h-[25px] justify-center leading-[0] text-[#ffffff] text-[16px] text-left top-[21.5px] translate-y-[-50%] w-[62.528px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                left: "calc(50% - 142.148px)",
              }}
            >
              <p className="block leading-[24px]">about us</p>
            </div>
            <div
              className="absolute flex flex-col font-roboto font-normal h-[25px] justify-center leading-[0] text-[#ffffff] text-[16px] text-left top-[21.5px] translate-y-[-50%] w-[53.559px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                left: "calc(50% - 43.789px)",
              }}
            >
              <p className="block leading-[24px]">careers</p>
            </div>
            <div
              className="absolute flex flex-col font-roboto font-normal h-[25px] justify-center leading-[0] text-[#ffffff] text-[16px] text-left top-[21.5px] translate-y-[-50%] w-[83.028px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                left: "calc(50% + 45.602px)",
              }}
            >
              <p className="block leading-[24px]">what we do</p>
            </div>
            <div
              className="absolute flex flex-col font-roboto font-normal h-[25px] justify-center leading-[0] text-[#ffffff] text-[15px] text-left top-[21.5px] translate-y-[-50%] w-[51.794px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                left: "calc(50% + 164.461px)",
              }}
            >
              <p className="block leading-[24px]">contact</p>
            </div>
            <div
              className="absolute flex items-center space-x-3 top-[21.5px] translate-y-[-50%]"
              style={{ left: "calc(50% + 350px)" }}
            >
              <Link 
                href="/login"
                className="font-roboto text-white text-[15px] hover:text-gray-300 transition-colors px-4 py-2 border border-white hover:bg-white hover:text-black"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="font-roboto text-white text-[15px] hover:text-gray-300 transition-colors px-4 py-2 border border-white hover:bg-white hover:text-black"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                Sign Up
              </Link>
            </div>
            <div
              className="absolute box-border content-stretch flex flex-row items-start justify-start pl-[25px] pr-[41px] py-3 top-0 translate-x-[-50%]"
              data-name="div#w-dropdown-toggle-0"
              style={{ left: "calc(50% + 280px)" }}
            >
              <div
                aria-hidden="true"
                className="absolute border border-[#000000] border-solid inset-0 pointer-events-none"
              />
              <div
                className="absolute right-[17px] w-4 h-4 top-[13px]"
                data-name="div"
              >
                <div
                  className="absolute left-0 overflow-clip w-4 h-4 top-0"
                  data-name="svg"
                >
                  <div
                    className="absolute left-1/2 w-4 h-4 top-0 translate-x-[-50%]"
                    data-name="Frame"
                  >
                    <img
                      alt=""
                      className="block max-w-none w-full h-full"
                      src={imgFrame}
                    />
                  </div>
                </div>
              </div>
              <div
                className="h-5 relative shrink-0 w-[71.563px]"
                data-name="div"
              >
                <div
                  className="absolute bg-no-repeat bg-[length:100%_100%] bg-[0_0] w-5 h-5 top-1/2 translate-x-[-50%] translate-y-[-50%]"
                  data-name="us-flag"
                  style={{
                    left: "calc(50% - 25.781px)",
                    backgroundImage: `url('${img636D4Bbd3Bfe2302466C6921Flag20Of20The20United20StatesPng}')`,
                  }}
                />
                <div
                  className="absolute flex flex-col font-manrope font-extralight h-[17px] justify-center leading-[0] text-[#ffffff] text-[12px] text-left translate-y-[-50%] w-[35.763px]"
                  style={{
                    top: "calc(50% - 0.703px)",
                    left: "calc(50% - 7.781px)",
                  }}
                >
                  <p className="block leading-[14.4px]">EN-US</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="absolute box-border content-stretch flex flex-row items-start justify-start left-[172px] p-0 top-[304px]"
        data-name="div"
      >
        <div
          className="h-[422px] relative shrink-0 w-[1140px]"
          data-name="div"
        >
          <div
            className="absolute flex flex-col font-manrope font-extralight h-[324px] justify-center leading-[0] left-0 text-[#ffffff] text-[72px] text-left top-[166px] translate-y-[-50%] w-[731.872px]"
          >
            <p className="block leading-[75px]">
              We design experiences that move businesses to the future.
            </p>
          </div>
          <div
            className="absolute box-border content-stretch flex flex-row gap-[60px] items-start justify-start left-0 pl-0 pr-[786.047px] py-0 top-[364px]"
            data-name="div"
          >
            <Link
              href="/signup"
              className="h-[58px] relative shrink-0 w-[184.781px] block"
              data-name="a"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none"
              />
              <div
                className="absolute flex flex-col font-manrope font-extralight justify-center leading-[0] text-[#ffffff] text-[16px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%] hover:text-gray-300 transition-colors"
                style={{ left: "calc(50% - 17.891px)" }}
              >
                <p className="block leading-[24px] whitespace-pre">
                  Get started
                </p>
              </div>
            </Link>
            <Link
              href="/login"
              className="box-border content-stretch flex flex-row items-start justify-start pl-[22px] pr-[23.172px] py-[17px] relative shrink-0"
              data-name="a"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none"
              />
              <div
                className="flex flex-col font-manrope font-extralight justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap hover:text-gray-300 transition-colors"
              >
                <p className="block leading-[24px] whitespace-pre">Sign In</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer/Contact Section */}
      <div
        className="absolute bg-[#000000] box-border content-stretch flex flex-col items-start justify-start left-0 pb-5 pt-[100px] px-[100px] top-[946px] w-full"
        data-name="section#Contact"
      >
        <div
          className="h-[173px] relative shrink-0 w-[1240px]"
          data-name="div"
        >
          <div
            className="absolute h-[173px] left-0 right-[583.53px] top-0"
            data-name="div"
          >
            <div
              className="absolute bg-no-repeat bg-[length:100%_100%] bg-[0_0] h-[39px] left-0 translate-y-[-50%] w-40"
              data-name="asset"
              style={{
                top: "calc(50% - 67px)",
                backgroundImage: `url('${img631621F044C1D2B3B532A6B4AssPng}')`,
              }}
            />
            <div
              className="absolute box-border content-stretch flex flex-col font-manrope font-extralight items-start justify-start leading-[0] left-0 pb-10 pl-0 pr-[14.109px] pt-0 text-[#ffffff] text-[40px] text-left text-nowrap top-[47px]"
              data-name="div"
            >
              <div
                className="flex flex-col justify-center relative shrink-0"
              >
                <p className="block leading-[43px] text-nowrap whitespace-pre">
                  Your business will
                </p>
              </div>
              <div
                className="flex flex-col justify-center relative shrink-0"
              >
                <p className="block leading-[43px] text-nowrap whitespace-pre">
                  never be the same
                </p>
              </div>
            </div>
          </div>
          <div
            className="absolute box-border content-stretch flex flex-row gap-5 items-start justify-start pb-0 pt-5 px-0 right-0 top-0"
            data-name="div"
          >
            <div
              className="h-[58px] relative shrink-0 w-[218.359px]"
              data-name="a"
            >
              <div
                aria-hidden="true"
                className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none"
              />
              <div
                className="absolute flex flex-col font-manrope font-extralight justify-center leading-[0] text-[#ffffff] text-[16px] text-center text-nowrap top-1/2 translate-x-[-50%] translate-y-[-50%]"
                style={{ left: "calc(50% - 17.68px)" }}
              >
                <p className="block leading-[24px] whitespace-pre">
                  Talk to a specialist
                </p>
              </div>
              <div
                className="absolute flex h-[0px] items-center justify-center translate-x-[-50%] translate-y-[-50%] w-[0px]"
                style={{
                  top: "calc(50% + 0.806px)",
                  left: "calc(50% + 85.395px)",
                }}
              >
                <div className="flex-none rotate-[320deg]">
                  <div
                    className="relative w-[45.083px] h-[45.083px]"
                    data-name="arrow"
                  >
                    <div
                      className="absolute left-1/2 w-[45.083px] h-[45.083px] top-1/2 translate-x-[-50%] translate-y-[-50%]"
                    >
                      <img
                        alt=""
                        className="block max-w-none w-full h-full"
                        loading="lazy"
                        src={img6311065760F252Ed6D4D1E88ArrowRightAltFill0Wght400Grad0Opsz48201Svg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-[#3549cb] box-border content-stretch flex flex-row items-start justify-start pb-[18px] pl-[25px] pr-[26.281px] pt-4 relative shrink-0"
              data-name="a"
            >
              <div
                className="flex flex-col font-roboto font-normal justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                <p className="block leading-[24px] whitespace-pre">
                  Get in touch
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="box-border content-stretch flex flex-row gap-[495px] items-center justify-start p-0 relative shrink-0"
          data-name="div"
        >
          <div
            className="flex flex-col font-manrope font-extralight justify-center leading-[0] relative shrink-0 text-[#858a99] text-[14px] text-left text-nowrap"
          >
            <p className="block leading-[21px] whitespace-pre">
              LitCollective © 2022
            </p>
          </div>
          <div
            className="h-8 relative shrink-0 w-[620px]"
            data-name="div"
          >
            <div
              className="absolute bg-left bg-no-repeat bg-[length:17.46%_72.73%] h-[22px] right-[396.8px] top-0 w-[91.641px]"
              data-name="a"
              style={{ backgroundImage: `url('${imgA}')` }}
            >
              <div
                className="absolute flex flex-col font-manrope font-extralight h-[22px] justify-center leading-[0] right-[66.64px] text-[#ffffff] text-[16px] text-left top-[11px] translate-x-[100%] translate-y-[-50%] w-[66.841px]"
              >
                <p className="block leading-[22px]">Behance</p>
              </div>
            </div>
            <div
              className="absolute bg-left bg-no-repeat bg-[length:17.89%_72.73%] h-[22px] right-[297.36px] top-0 w-[89.438px]"
              data-name="a"
              style={{ backgroundImage: `url('${imgA1}')` }}
            >
              <div
                className="absolute flex flex-col font-manrope font-extralight h-[22px] justify-center leading-[0] right-[64.44px] text-[#ffffff] text-[16px] text-left top-[11px] translate-x-[100%] translate-y-[-50%] w-[64.638px]"
              >
                <p className="block leading-[22px]">Dribbble</p>
              </div>
            </div>
            <div
              className="absolute bg-left bg-no-repeat bg-[length:20.29%_72.73%] h-[22px] right-[208.5px] top-0 w-[78.859px]"
              data-name="a"
              style={{ backgroundImage: `url('${imgA2}')` }}
            >
              <div
                className="absolute flex flex-col font-manrope font-extralight h-[22px] justify-center leading-[0] right-[53.86px] text-[#ffffff] text-[16px] text-left top-[11px] translate-x-[100%] translate-y-[-50%] w-[54.059px]"
              >
                <p className="block leading-[22px]">Twitter</p>
              </div>
            </div>
            <div
              className="absolute box-border content-stretch flex flex-row gap-2.5 items-start justify-start pb-2.5 pl-2.5 pr-0 pt-0 right-0 top-0"
              data-name="div"
            >
              <div
                className="bg-left bg-no-repeat bg-[length:15.62%_72.73%] h-[22px] relative shrink-0 w-[102.422px]"
                data-name="a"
                style={{ backgroundImage: `url('${imgA3}')` }}
              >
                <div
                  className="absolute flex flex-col font-manrope font-extralight h-[22px] justify-center leading-[0] left-[25px] text-[#ffffff] text-[16px] text-left top-[11px] translate-y-[-50%] w-[77.622px]"
                >
                  <p className="block leading-[22px]">Instagram</p>
                </div>
              </div>
              <div
                className="bg-left bg-no-repeat bg-[length:18.59%_72.73%] h-[22px] relative shrink-0 w-[86.078px]"
                data-name="a"
                style={{ backgroundImage: `url('${imgA4}')` }}
              >
                <div
                  className="absolute flex flex-col font-manrope font-extralight h-[22px] justify-center leading-[0] left-[25px] text-[#ffffff] text-[16px] text-left top-[11px] translate-y-[-50%] w-[61.278px]"
                >
                  <p className="block leading-[22px]">Medium</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div
          className="absolute bg-no-repeat bg-[length:100%_100%] bg-[0_0] bottom-0 right-[351px] top-[184.36px] w-[180px]"
          data-name="asset-1"
          style={{
            backgroundImage: `url('${img634D662F2C1716747C1Dc1D9AssetPng}')`,
          }}
        />
        <div
          className="absolute bg-no-repeat bg-[length:100%_100%] bg-[0_0] bottom-[192.17px] right-[166px] top-0 w-[200px]"
          data-name="asset-2"
          style={{
            backgroundImage: `url('${img634D663A05B987Ea40313Ef5AssetPng}')`,
          }}
        />
      </div>
    </div>
  );
}
