import React from "react";
import Double from "img/double.png";
import Triple from "img/triple.png";

const Cards = () => {

  const handleClick = () => {
    window.location.href = '/signup'
  }

  return (
    <div className="w-full py-[5rem] px-4 bg-white">
      <h1 className="flex justify-center md:text-xl text-lg text-black mb-5" style={{fontSize:"30px"}}>
        <span style={{fontWeight:700}}>DIDNOW</span>는 블록체인 기반의
      </h1>
      <h1 className="flex justify-center md:text-xl text-lg text-black mb-10" style={{fontSize:"30px"}}>
        비정부기관 증명 인증서 중개 플랫폼 입니다.
      </h1>
      <h1 className="flex justify-center md:text-xl text-lg text-black mb-20" style={{fontSize:"30px", fontWeight:"700"}}>
      🚀️ 신뢰할 수 있는 인증을 경험하세요.
      </h1>
      <div className="max-w-[1240px] mx-auto flex gap-8">
        <div className="w-[300px] border-solid border-2 border-[#ffffff82] mx-auto shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-20  mx-auto mt-[-3rem] bg-transparent"
            src={Double}
            alt="/"
          />
          <h2 className="text-2xl font-bold text-center py-8">Holder</h2>
          <p className="text-center text-m ">신뢰성을 갖춘 증명서를</p>
          <p className="text-center text-m ">
            자유롭게 등록 및 관리 할 수 있습니다.
          </p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8">소유중인 인증서 조회</p>
            <p className="py-2 border-b mx-8 ">인증서 관리</p>
            <p className="py-2 border-b mx-8">인증서 등록</p>
          </div>
          <button className="bg-[#0efcfe] text-black w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3" onClick={handleClick}>
            회원가입
          </button>
        </div>
        <div className="w-[300px] mx-auto shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-20 mx-auto mt-[-3rem] bg-white"
            src={Triple}
            alt="/"
          />
          <h2 className="text-2xl font-bold text-center py-8">Issuer</h2>
          <p className="text-center text-m ">
            DID 기술을 통해 안전하게 기업의 인증서 발급 및 관리를 할 수있습니다.
          </p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8">발급한 인증서 조회</p>
            <p className="py-2 border-b mx-8">인증서 대상 관리</p>
            <p className="py-2 border-b mx-8 ">인증서 관리</p>
          </div>
          <button className="bg-[#0efcfe] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3" onClick={handleClick}>
            회원가입
          </button>
        </div>
        <div className="w-[300px] mx-auto shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          <img
            className="w-20 mx-auto mt-[-3rem] bg-white"
            src={Triple}
            alt="/"
          />
          <h2 className="text-2xl font-bold text-center py-8">Verifier</h2>
          <p className="text-center text-m ">
            블록체인 DID를 통해 사용자의 자격증명을 효율적으로 검증할 수 있습니다.
          </p>
          <div className="text-center font-bold">
            <p className="py-2 border-b mx-8 mt-8">발급한 인증서 조회</p>
            <p className="py-2 border-b mx-8">자격검증 요청 관리</p>
            <p className="py-2 border-b mx-8 ">인증서 관리</p>
          </div>
          <button className="bg-[#0efcfe] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3" onClick={handleClick}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
