import React from "react";
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="max-w-[1240px] mx-auto py-4 px-4 grid lg:grid-cols-3 gap-2 text-gray-300">
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="w-full text-3xl font-bold text-[#0efcfe]">DIDNOW</h1>
        </div>
        <div className="flex justify-center">
          <FaFacebookSquare size={30} />
          <FaInstagram className="ml-3" size={30} />
          <FaTwitterSquare className="ml-3" size={30} />
          <FaGithubSquare className="ml-3" size={30} />
          <FaDribbbleSquare className="ml-3" size={30} />
        </div>
      </div>
      <p className="w-full py-1">
        모든 인증서를 빠르게, 쉽게, 그리고 안전하게.
      </p>
      <div className="lg:col-span-3 flex mt-2">
        <div>
          <h6 className="font-medium text-gray-400">Product</h6>
          <ul>
            <li className="py-1 text-sm">Features</li>
            <li className="py-1 text-sm">Team</li>
            <li className="py-1 text-sm">Roadmap</li>
          </ul>
        </div>
        <div className="ml-10">
          <h6 className="font-medium text-gray-400">Service</h6>
          <ul>
            <li className="py-1 text-sm">APIs</li>
            <li className="py-1 text-sm">DATA</li>
            <li className="py-1 text-sm">Documentation</li>
          </ul>
        </div>
        <div className="ml-10">
          <h6 className="font-medium text-gray-400">Terms</h6>
          <ul>
            <li className="py-1 text-sm">Privacy Policy</li>
            <li className="py-1 text-sm">Terms of Services</li>
            <li className="py-1 text-sm">Legal</li>
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
