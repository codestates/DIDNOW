import React from "react";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-4 px-4 grid lg:grid-cols-3 gap-2 text-gray-300">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#0efcfe]">DIDNOW</h1>
        </div>
      </div>
      <div className="lg:col-span-3 flex mt-2">
        <div>
          <h6 className="font-medium text-gray-400">DIDNOW</h6>
          <ul>
            <li className="py-1 text-sm">GITHUB</li>
            <li className="py-1 text-sm">TEAM</li>
          </ul>
        </div>
        <div className="ml-10">
          <h6 className="font-medium text-gray-400">Terms</h6>
          <ul></ul>
        </div>
        <div className="ml-10">
          <h6 className="font-medium text-gray-400">Service</h6>
          <ul>
            <li className="py-1 text-sm">APIs</li>
            <li className="py-1 text-sm">DATA</li>
          </ul>
        </div>
      </div>
      <p className="py-2 text-gray-600 font-small text-sm">
        Copyrightⓒ 2022 DIDNOW All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
