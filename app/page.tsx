import Image from 'next/image';
import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {/* Sticky Item List (bg-black removed) */}
      <div className="fixed top-0 left-0 right-0 text-center p-2 z-10"> 
        <p className="text-xs text-gray-300 font-mono">
          CDs | Vinyl | Tapes | DVDs | Posters | Books | Pins | Imports
        </p>
      </div>

      <div className="mb-2 mt-12"> 
        <Image
          src="/spinny.png"
          alt="Spin Records logo"
          width={200}
          height={100}
        />
      </div>
    
      <div className="text-center mb-2"> 
        <p className={bebasNeue.className} style={{ fontSize: '40px', color: 'white' }}>
          Carlsbad, CA
        </p>
        <p className="text-xs text-gray-300 font-mono"> 
          Open 7 Days a Week
        </p>
      </div>


      <div className="flex space-x-4 mt-4">
        <a
          href="https://maps.app.goo.gl/xGaewDgivFPTA1yRA"
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
          href="tel:+17604340807"
          className={`
            bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded
            ${bebasNeue.className} w-1/2 flex items-center justify-center
          `}
        >
          Call
        </a>
      </div>

      <a
        href="https://linktr.ee/grooveshoppe"
        target="_blank"
        rel="noopener noreferrer"
        className={`
          bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4
          ${bebasNeue.className}
        `}
      >
        More
      </a>
    </main>
  );
}




