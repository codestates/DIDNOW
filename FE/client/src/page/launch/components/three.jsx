import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Loader,
  useGLTF,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import Didnow from "img/didnow-icon.png";
import "../style/style.css";

import Typed from "react-typed";

function Model({ url }) {
  const { nodes } = useGLTF(url);
  const [size, setSize] = useState(5);

  window.addEventListener("resize", () => {
    let newSize = window.innerWidth / 230;
    setSize(newSize);
  });
  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -11, 0]} scale={size}>
      <group rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}>
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.planet002.geometry}
          material={nodes.planet002.material}
        />
        <mesh
          geometry={nodes.planet003.geometry}
          material={nodes.planet003.material}
        />
      </group>
    </group>
  );
}

export default function Three() {
  return (
    <>
      <div className="bg text-white" />
      <div className="absolute max-w-[1280px]  h-screen px-5 flex flex-start flex-col justify-center">
        <img className="absolute w-[43px] top-5 left-5" src={Didnow} alt="/" />
        {/* <div> */}
        <p className="md:text-9xl sm:text-8xl text-7xl font-bold css-selector ">
          DIDNOW
        </p>
        <p className="text-[#0efcfe] ">
          모든 인증서를 빠르고, 쉽고, 그리고 안전하게
        </p>
        <h1 className="mt-20 text-white md:text-4xl sm:text-3xl text-2xl font-bold">
          Manage your Certificate
        </h1>
        <p className="text-white md:text-4xl sm:text-3xl text-2xl font-bold py-3">
          On Blockchain
        </p>
        <div className="flex justify-start items-center">
          <p className="text-white md:text-4xl sm:text-3xl text-2xl font-bold ">
            with
          </p>
          <Typed
            className=" text-white md:text-4xl sm:text-3xl pl-1 text-2xl font-bold sm:pl-1 md:pl-2"
            strings={["Trust.", "Speed.", "Easy Access."]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        {/* <p className="md:text-base sm:text-sm mt-2 text-gray-500">
          블록체인 기반의 비정부기관 증명, 인증서 중개 플랫폼
        </p> */}
        <button className="absolute left-5 top-[80%] z-10 bg-[#0efcfe] w-[200px] rounded-md font-medium my-6  py-3 text-black">
          Get Started
        </button>
      </div>
      {/* </div> */}

      <Canvas dpr={[1.5, 2]} linear shadows>
        <fog attach="fog" args={["#272730", 16, 30]} />
        <ambientLight intensity={0.75} />
        <PerspectiveCamera makeDefault position={[0, 0, 16]} fov={70}>
          <pointLight intensity={1} position={[-10, -25, -10]} />
          <spotLight
            castShadow
            intensity={2.25}
            angle={0.2}
            penumbra={1}
            position={[-25, 50, -15]}
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />
        </PerspectiveCamera>
        <Suspense fallback={null}>
          <Model url="/scene.glb" />
        </Suspense>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stars radius={500} depth={50} count={7000} factor={10} />
      </Canvas>
      {/* <div className="layer" /> */}
      <Loader />
    </>
  );
}
