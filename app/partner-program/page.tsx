// import Link from "next/link";
// import Image from "next/image";
// import styles from "./styles.module.css";
// import RegistrationForm from "@/components/RegistrationForm";
// import LoginForm from "../login/LoginForm";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Partner Program"
// }

// export default function PartnerProgram() {
//   return (
//       <main>
//         <article className="container">
//           <div className="comp-nav text-center">
//             <h1 className="fw-600 display-4">
//               Alphalake Partner Program
//             </h1>
//             <br />
//             <br />
//             <h4 className="fw-600 text-primary-1 fs-4">
//               What is the partner Program?
//             </h4>
//             <br />
//             <p className="mx-auto col-xl-10 font-robo text-cc">
//               This program is designed to help you grow your business by
//               providing you with a simple and effective way to generate leads and sales.
//               As an Alphalake Partner, you will be given a unique link that you
//               can use to promote our services to your network. When someone clicks on
//               your link and signs up for a service, you will earn a commission.
//               The commission rate is based on the type of service that is purchased.
//             </p>
//           </div>
//         </article>
//         <section className="py-4 container">
//           <div className="py-4 my-4">
//             <div className="text-center">
//               <h3 className="font-mont text-white fw-600">Why should I join?</h3>
//             </div>
//             <div className="d-flex flex-wrap justify-content-around">
//               <div className={styles.join_card}>
//                 <div className={styles.join_img}>
//                   <Image src="/commission.png" alt="" width="150" height="150" />
//                 </div>
//                 <p className="text-cc font-robo text-center ">
//                   Earn a commission on every sale that you generate
//                 </p>
//               </div>
//               <div className={styles.join_card}>
//                 <div className={styles.join_img}>
//                   <Image src="/social.png" alt="" width="150" height="150" />
//                 </div>
//                 <p className="text-cc font-robo text-center ">
//                   Promote our services to your network and earn money
//                 </p>
//               </div>
//               <div className={styles.join_card}>
//                 <div className={styles.join_img}>
//                   <Image src="/marketing.png" alt="" width="150" height="150" />
//                 </div>
//                 <p className="text-cc font-robo text-center ">
//                   Access to our marketing materials
//                 </p>
//               </div>
//             </div>
//             <br />
//           </div>
//         </section>
        // <section className="py-4 container">
        //   <div className={styles.form_hold}>
        //     <input type="radio" className={styles.reg} name="tab" id="reg" />
        //     <input type="radio" className={styles.log} defaultChecked name="tab" id="log" />
        //     <div className={styles.nav}>
        //       <label htmlFor="reg">Register</label>
        //       <label htmlFor="log">Sign In</label>
        //       <div className={styles.slider}></div>
        //     </div>
        //     <div className={styles.content}>
        //       <div className={styles.reg_div}>
        //         <div className="d-flex flex-wrap rg-2 align-items-center justify-content-around">
        //           <div className="col-12 col-md-10 col-lg-5">
        //             <h3 className="font-mont text-white fw-600">
        //               Become a partner today
        //               in a few easy steps...
        //             </h3>
        //             <br />
        //             <p className="font-mont fw-600 text-primary-2 ">
        //               Tired of typing? Register directly by loging in with Google or Linked In.
        //             </p>
        //             <div className={styles.push_down}>
        //               <p className="font-robo text-cc">
        //                 Already a partner?
        //               </p>
        //               <label htmlFor="log" className="a-btn font-mont fw-600 text-primary-2">Login</label>
        //             </div>
        //           </div>
        //           <div className="col-12 col-md-8 col-lg-5 col-xl-4">
        //             <RegistrationForm />
        //           </div>
        //         </div>
        //       </div>
        //       <div className={styles.log_div}>
        //         <div className="d-flex flex-wrap rg-2 align-items-center justify-content-around">
        //           <div className="col-12 col-md-10 col-lg-5">
        //             <h3 className="font-mont text-white fw-600">
        //               Retrieve your unique link
        //             </h3>
        //             <br />
        //             <p className="font-mont fw-600 text-primary-2 ">
        //               Put your credentials here
        //             </p>
        //             <div className={styles.push_down}>
        //               <p className="font-robo text-cc">
        //                 Not a partner yet?
        //               </p>
        //               <label htmlFor="reg" className="a-btn font-mont fw-600 text-primary-2">Register</label>
        //             </div>
        //           </div>
        //           <div className="col-12 col-md-8 col-lg-5 col-xl-4">
        //             <LoginForm />
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </section>
//         <section className="py-4 my-4">
//           <div className="d-flex flex-wrap align-items-center justify-content-center" style={{ columnGap: "2rem" }}>
//             <h4 className="s-text-center font-mont text-white fw-600">Ned help or <br /> need more information?</h4>
//             <Link href="contact" className="a-btn text-center font-mont text-primary-2 fw-600">Get in Touch</Link>
//           </div>
//         </section>
//       </main>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Program"
}

export default function PartnerProgram() {
  return (
    <main className="min-h-screen bg-[#000912]">
      <article className="container mx-auto px-4 max-w-6xl">
        <div className="text-center pt-20">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-16">
            Alphalake Partner Program
          </h1>
          <h4 className="text-xl font-semibold text-[#059B9C] mb-8">
            What is the partner Program?
          </h4>
          <p className="mx-auto max-w-4xl font-robo text-gray-300 text-lg">
            This program is designed to help you grow your business by
            providing you with a simple and effective way to generate leads and sales.
            As an Alphalake Partner, you will be given a unique link that you
            can use to promote our services to your network. When someone clicks on
            your link and signs up for a service, you will earn a commission.
            The commission rate is based on the type of service that is purchased.
          </p>
        </div>
      </article>

      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h3 className="font-mont text-white text-3xl font-semibold">Why should I join?</h3>
        </div>
        <div className="flex flex-wrap justify-around gap-8">
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/commission.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Earn a commission on every sale that you generate
            </p>
          </div>
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/social.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Promote our services to your network and earn money
            </p>
          </div>
          <div className="flex flex-col items-center max-w-[310px]">
            <div className="w-[228px] h-[228px] mb-5 rounded-[25px] bg-[rgba(145,145,145,0.37)] overflow-hidden relative">
              <Image src="/marketing.png" alt="" fill className="object-cover" />
            </div>
            <p className="text-gray-300 font-robo text-center">
              Access to our marketing materials
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 my-8">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <h4 className="text-center font-mont text-white text-2xl font-semibold">
            Need help or <br /> need more information?
          </h4>
          <Link href="contact" className="bg-[#059B9C] font-mont font-semibold rounded-[25px] border border-[#059B9C] px-6 py-2 text-white">
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}