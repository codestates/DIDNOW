import React from "react";

const RegisterEmail = () => {
  return (
    <div className="w-full py-16 text-white px-4">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-2xl sm:text-xl text-l py-1">
            지금 회원가입을 통해 안전하게 증명서를 발급 및 관리해보세요!
          </h1>
        </div>
        <div className="">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full">
            <input
              className="p-3 flex w-full rounded-md text-black"
              type="email"
              placeholder="Enter Email"
            />
            <button className="bg-[#0efcfe] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3">
              Register
            </button>
          </div>
          <p>
            We care about the protection of your data. Read our{" "}
            <span className="text-[#0efcfe]">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmail;
