import Image from "next/image";
import { Nunito } from "next/font/google";

// Initialize font at the top level to avoid "Module not found" errors
const nunito = Nunito({
  weight: '500',
  display: 'swap', 
  subsets: ['latin'] 
});

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-white text-black">

      {/* Centered content area */}
      <div className="flex flex-1 flex-col items-center justify-center w-full">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className={`${nunito.className} text-6xl mb-1 uppercase tracking-tight`}>
            Tim Dinan
          </h1>
          <div className="h-1 w-12 bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-500 tracking-[0.25em] uppercase text-[10px] font-bold">
            Professional Resume & Portfolio
          </p>
        </div>

        {/* Main Content Container */}
        <div className="w-full max-w-xs flex flex-col space-y-4">

          {/* Primary Action: Open the PDF from the /public folder */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              bg-black hover:bg-gray-800 text-white font-bold py-5 px-4 rounded
              ${nunito.className} flex items-center justify-center text-2xl tracking-wide transition-all active:scale-95
            `}
          >
            View Resume (PDF)
          </a>

          {/* LinkedIn - Full Width */}
          <a
            href="https://linkedin.com" // Update with your LinkedIn URL
            target="_blank"
            rel="noopener noreferrer"
            className={`
              bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 px-4 rounded
              ${nunito.className} flex items-center justify-center text-lg transition-all
            `}
          >
            LinkedIn Profile
          </a>

          {/* Blog */}
          <a
            href="/blog"
            className={`
              bg-gray-100 hover:bg-gray-200 text-black font-bold py-3 px-4 rounded
              ${nunito.className} flex items-center justify-center text-lg transition-all
            `}
          >
            Blog
          </a>
        </div>

      </div>

      {/* Bottom area — always visible at the foot of the viewport */}
      <div className="flex flex-col items-center pb-2">
        {/* Personal Branding Logo */}
        <div className="mb-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <Image
            src="/vape.png"
            alt="Tim Dinan Branding"
            width={70}
            height={70}
            priority
          />
        </div>

        {/* Bottom Lottie Animation */}
        <div className="w-full flex justify-center">
          <iframe
            src="https://lottie.host/embed/8c5890c0-b599-42fd-9357-7688dfc4e394/7V7crer93k.lottie"
            title="Bottom page animation"
            className="w-50 h-50 border-0"
            loading="lazy"
          />
        </div>
      </div>

    </main>
  );
}
