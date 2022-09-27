import React from "react";
import Laptop from "img/homepage.jpg";
import signin from "img/signin.jpg";
import signup from "img/signup.jpg";
import "../style/style.css";

const Analytics = () => {
  return (
    <div className="w-full bg-white py-24  px-4">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 landing-cards">
        <img className="w-[400px] px-2 mx-auto my-4" src={Laptop} alt="/" style={{borderRadius:"30px"}}/>
        <div className="w-[400px] flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2 mb-7">
            효율적인 인증서 관리
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
          <span style={{fontWeight:700}}>DIDNOW</span>는 블록체인 기술을 기반으로 한 웹을 통해 신뢰성을 갖추어, 기업에서 발급한 증명서/인증서를 제3자 간섭없이 관리할 수 있습니다.
          </p>
        </div>
      </div>
      <div className="max-w-[1000px] mt-20 mx-auto grid md:grid-cols-2  landing-cards">
        <div className="w-[400px] flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2 mb-7">
            위변조가 불가능한 인증서 발급
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
            이제 인증서의 위변조를 걱정하지 않아도 됩니다. 블록체인을 통해 발급한 인증서의 진위 여부를 <span style={{fontWeight:700}}>DIDNOW</span>를 통해 간단하게 판별할 수 있습니다. 
          </p>
          <br />
          <p className="md:text-xl sm:text-lg text-md">
            간단한 절차로 사용자에게 100% 신뢰할 수 있는 인증서를 발급해 줄 수 있습니다.
          </p>
          
        </div>
        <img className="w-[400px] px-2 mx-auto my-4" src={signin} alt="/" style={{borderRadius:"30px"}}/>
      </div>
      <div className="max-w-[1000px] mt-20 mx-auto grid md:grid-cols-2  landing-cards">
        <img className="w-[400px] px-2 mx-auto my-4" src={signup} alt="/" style={{borderRadius:"30px"}}/>
        <div className="flex flex-col justify-center">
          <h1 className="md:text-3xl sm:text-2xl text-1xl font-bold py-2 mb-7">
            인증서 통합 관리 서비스
          </h1>
          <p className="md:text-xl sm:text-lg text-md">
          <span style={{fontWeight:700}}>DIDNOW</span>는 블록체인 기술을 활용해 증명서, 자격증 등 다양한 인증서를 한번에 관리할 수 있습니다. 
          </p>
          <br />
          <p className="md:text-xl sm:text-lg text-md">
            인증서를 검증하고 관리하는데 복합하고 불필요한 비용을 지불할 필요가 없습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
