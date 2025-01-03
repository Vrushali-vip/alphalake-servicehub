// import Link from "next/link";
// import Image from "next/image";
// import styles from "./styles.module.css";
// import RegistrationForm from "@/components/RegistrationForm";
// import LoginForm from "@/app/login/page";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Demo"
// }

// export default function Demo() {
//   return (
//       <main>
//         <article className="container">
//           <div className="comp-nav text-center">
//             <h1 className="fw-600 display-4">
//               Alphalake Demo
//             </h1>
            
//             <br />
//             <br />
//             <h4 className="fw-600 text-primary-1 fs-4">
//               What is Alphalake Demo?
//             </h4>
//             <br />
//             <p className="mx-auto col-xl-10 font-robo text-cc">
//             AlphaLake is at the forefront of cutting-edge technology, and our demo page provides an immersive experience into the innovative solutions and services we offer. As a leading provider in the tech industry, AlphaLake is committed to 
//             delivering state-of-the-art solutions that redefine the way businesses operate and thrive in the digital landscape.
//             </p>
//           </div>
//         </article>
//         <section className="py-4 my-4 probably-ads">
//                 <div className="container d-flex s-flex-column justify-content-between">
//                     <div className="ad-cards">        
//                         <div className="ac"></div>
//                     </div>
//                     <div className="ad-card-right my-auto">
//                       <h5>AlphaDox</h5>
//                         <p className="text-cc fsxl-l16">
//                         This cutting-edge solution marks a significant advancement in the automation of Insurance certificate creation by seamlessly 
//                         accepting data inputs in Excel or CSV formats and streamlining the process of generating and emailing certificates in bulk.
//                         </p>
//                     </div>
//                 </div>
//         </section>

        
//         <section className="py-4 my-4">
//           <div className="d-flex flex-wrap align-items-center justify-content-center" style={{ columnGap: "2rem" }}>
//             <h4 className="s-text-center font-mont text-white fw-600">Need help or <br /> need more information?</h4>
//             <Link href="contact" className="a-btn text-center font-mont text-primary-2 fw-600">Get in Touch</Link>
//           </div>
//         </section>
//       </main>
//   );
// }

import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Demo"
}

export default function Demo() {
    return (
        <main className="min-h-screen bg-black">
            <article className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-12">
                        Alphalake Demo
                    </h1>
                    
                    <h4 className="text-xl md:text-2xl font-semibold text-[#059B9A] mb-8">
                        What is Alphalake Demo?
                    </h4>
                    
                    <p className="max-w-4xl mx-auto text-[#c5c5c5] font-robo text-base md:text-lg leading-relaxed">
                        AlphaLake is at the forefront of cutting-edge technology, and our demo page provides an immersive experience into the innovative solutions and services we offer. As a leading provider in the tech industry, AlphaLake is committed to 
                        delivering state-of-the-art solutions that redefine the way businesses operate and thrive in the digital landscape.
                    </p>
                </div>
            </article>

            <section className="py-16 my-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="relative w-full lg:w-1/2">        
                        <div className="relative min-h-[141px] sm:min-h-[234px] lg:min-h-[375px] w-full">
                            <div className="absolute top-0 left-0 w-full h-full bg-[#cccccc] rounded-md outline outline-1 outline-[#059B9A] rotate-[-4deg]"></div>
                            <div className="absolute top-[40px] left-[40px] w-full h-full bg-[url('https://6637851.fs1.hubspotusercontent-na1.net/hubfs/6637851/Api%20Direct%20Version%202%20Resources/Image/Api_directv.1.png')] bg-cover bg-center bg-no-repeat rounded-md outline outline-1 outline-[#059B9A]"></div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 max-w-[450px] mx-auto lg:mx-0">
                        <h5 className="text-2xl font-semibold text-white mb-4">AlphaDox</h5>
                        <p className="text-[#c5c5c5] text-base md:text-lg leading-relaxed">
                            This cutting-edge solution marks a significant advancement in the automation of Insurance certificate creation by seamlessly 
                            accepting data inputs in Excel or CSV formats and streamlining the process of generating and emailing certificates in bulk.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-16 my-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
                        <h4 className="text-xl md:text-2xl font-mont font-semibold text-white">
                            Need help or <br className="hidden md:block" /> need more information?
                        </h4>
                        <Link 
                            href="contact" 
                            className="inline-block px-8 py-3  bg-[#059B9A] font-mont font-semibold border-2 border-[#059B9A] rounded-full hover:bg-[#059B9A] hover:text-white transition-colors duration-200"
                        >
                            Get in Touch
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}