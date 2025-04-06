'use client';

import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import React, { useState } from 'react';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });

export default function Home() {
  const [lavaLamp, setLavaLamp] = useState(true);

  const toggleLavaLamp = () => {
    setLavaLamp(!lavaLamp);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background GIF (Conditionally Rendered) */}
      {lavaLamp && (
        <img
          src="/back2.gif"
          alt="Background GIF"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Content Wrapper */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center flex-grow"> {/* Added flex-grow here */}
        {/* Moved Hours to Top */}
        <div className="fixed top-0 left-0 right-0 text-center p-2 z-10">
          <p className="text-xs text-gray-300 font-mono">
            Mon 12-6 | Tue - Sat 12-7 | Sun Closed
          </p>
        </div>

        <div className="mb-2 mt-12">
          <Image
            src="/pr_final_w.png"
            alt="Spin Records logo"
            width={300}
            height={100}
          />
        </div>
        <div className="text-center mb-2">
          <p className={bebasNeue.className} style={{ fontSize: '40px', color: 'white' }}>
          </p>
          {/* Moved Item List Down Here */}
          <p className="text-xs text-gray-300 font-mono">
            KNEEBOARDS | SURFBOARDS | RECORDS | VINTAGE & JUNK
          </p>
        </div>

        <div className="flex space-x-4 mt-4">
          <a
            href="https://maps.app.goo.gl/UAzaLQLdEbuaM5pK7"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded
              ${bebasNeue.className} w-1/2 flex items-center justify-center
            `}
          >
            Directions
          </a>
          <a
            href="tel:+16195819168"
            className={`
              bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded
              ${bebasNeue.className} w-1/2 flex items-center justify-center
            `}
          >
            Call
          </a>
        </div>

        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className={`
            bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4
            ${bebasNeue.className}
          `}
        >
          More
        </a>

        {/* Brand logos */}
        <div className="flex space-x-4 mt-4">
          <div style={{ width: '80px' }}>
            <Image
              src="/4th.png"
              alt="hy_ logo"
              width={80}
              height={80}
            />
          </div>
          <div style={{ width: '80px' }}>
            <Image
              src="/yucca_ting_w.png"
              alt="rawp logo"
              width={80}
              height={80}
            />
          </div>
          <div style={{ width: '80px' }}>
            <Image
              src="/methless_fw.png"
              alt="rawp logo"
              width={80}
              height={80}
            />
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-8">
          <a href="https://www.instagram.com/packrattrecords/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram size={30} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebook size={30} />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter size={30} />
          </a>
        </div>
      </div>

      {/* Lava Lamp Toggle Switch (Fixed to Bottom, Outside Content Wrapper) */}
      <div
        onClick={toggleLavaLamp}
        className={`w-12 h-6 rounded-full fixed bottom-4 right-4 cursor-pointer z-20 ${ // added z-20
          lavaLamp ? 'bg-pink-500' : 'bg-gray-700'
        }`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-300 ${
            lavaLamp ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </main>
  );
}
