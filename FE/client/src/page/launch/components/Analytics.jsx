import React from "react";
import Laptop from "img/homepage.jpg";
import signin from "img/signin.jpg";
import signup from "img/signup.jpg";

const Analytics = () => {
  return (
    <div className="w-full bg-white py-24  px-4">
      <div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
        <img className="w-[400px] px-2 mx-auto my-4" src={Laptop} alt="/" />
        <div className="flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2">
            발급 증명, 인증서 관리
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
            블록체인 기술을 기반으로 한 웹을 통해 신뢰성을 갖추어, 기업에서
            발급한 증명, 인증서를 관리할 수 있습니다.
          </p>
          <p className="md:text-xl sm:text-lg text-sm">
            본 서비스에서는 개인 혹은 단체에게 잘못 발급된 증명, 인증서도 삭제가
            가능합니다.
          </p>
          {/* <button className="bg-black text-[#0efcfe] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
            Get Started
          </button> */}
        </div>
      </div>
      <div className="max-w-[1240px] mt-20 mx-auto grid md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2">
            발급 증명, 인증서 관리
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
            블록체인 기술을 기반으로 한 웹을 통해 신뢰성을 갖추어, 기업에서
            발급한 증명, 인증서를 관리할 수 있습니다.
          </p>
          <p className="md:text-xl sm:text-lg text-md">
            본 서비스에서는 개인 혹은 단체에게 잘못 발급된 증명, 인증서도 삭제가
            가능합니다.
          </p>
          {/* <button className="bg-black text-[#0efcfe] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
            Get Started
          </button> */}
        </div>
        <img className="w-[400px] px-2 mx-auto my-4" src={signin} alt="/" />
      </div>
      <div className="max-w-[1240px] mt-20 mx-auto grid md:grid-cols-2">
        <img className="w-[400px] px-2 mx-auto my-4" src={signup} alt="/" />
        <div className="flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2">
            발급 증명, 인증서 관리
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
            블록체인 기술을 기반으로 한 웹을 통해 신뢰성을 갖추어, 기업에서
            발급한 증명, 인증서를 관리할 수 있습니다.
          </p>
          <p className="md:text-xl sm:text-lg text-md">
            본 서비스에서는 개인 혹은 단체에게 잘못 발급된 증명, 인증서도 삭제가
            가능합니다.
          </p>
          {/* <button className="bg-black text-[#0efcfe] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3">
            Get Started
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
