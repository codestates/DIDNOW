import React from "react";
import Typed from "react-typed";

const Hero = () => {
  return (
    <div className=" text-white ">
      <div className="max-w-[1280px] mt-[-96px] h-screen px-5 flex flex-col align-center justify-center">
        <p className="md:text-9xl sm:text-8xl text-7xl py-4 font-bold css-selector ">
          DIDNOW
        </p>
        <p className="text-[#0efcfe] mb-10">
          모든 인증서를 빠르게, 쉽게, 그리고 안전하게.
        </p>
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
          Manage your certification
        </h1>
        <div className="flex justify-start items-center">
          <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-3">
            On Blockchain with
          </p>
          <Typed
            className="md:text-4xl sm:text-3xl text-2xl font-bold md:pl-2 pl-1"
            strings={["trust.", "speed.", "easy access."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-xl text-sm mt-4 text-gray-500">
          블록체인 기반의 비정부기관 증명, 인증서 중개 플랫폼
        </p>
        <button className="bg-[#0efcfe] w-[200px] rounded-md font-medium my-6  py-3 text-black">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
