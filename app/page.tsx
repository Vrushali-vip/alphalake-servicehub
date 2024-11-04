// import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: {
    template: '%s | Alphalake Services',
    default: 'Alphalake Services - for Efficient Business Processes',
  },
  icons: [
    {
      rel: 'icon',
      sizes: '32x32',
      href: "/favicon-32x32.png",
      url: "/favicon-32x32.png"
    }
  ],
  robots: {
    index: true,
    follow: true
  },
  description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
  openGraph: {
    title: {
      template: '%s | Alphalake Services',
      default: 'Alphalake Services - for Efficient Business Processes',
    },
    description: "Tailored end-to-end implementation services for automation and Ai solutions. Alphalake Ai are specialists in health and human services.",
    type: "website",
    url: "https://alphalake.services",
    siteName: "Alphalake Services",
    images: [
      {
        url: "/service-hub-bot.png",
        width: 500,
        height: 500
      }
    ],
    locale: "en_US"
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  keywords: "RPA, Automation, iPaaS, Workflow Management, Workato Solution, Microsoft Integration, UiPath Automation",
}

export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col justify-between">
        <div className="p-4 md:p-8 lg:p-12 xl:p-16 mx-auto my-auto gap-y-8 justify-between align-center flex flex-col-reverse lg:flex-row">
          <div className="lg:w-2/3 pt-8">
            <h1 className="text-3xl xl:text-5xl font-extrabold mb-6">
              Transform Your Business with Alphalake&apos;s AI-powered Solutions
            </h1>
            <p className="font-mono py-3">
              <b>Alphalake AI</b> is a consultancy and advisory firm providing customized automation 
              and Al solutions to the healthcare industry. We specialize in system integration, 
              change management, RPA management, and digital worker health-check assessments.
            </p>
            <p className="font-mono py-3 mb-8">
              The company values organizational efficiency, sustainable transformation, and 
              prioritizes providing optimal solutions to our clients.
            </p>

            <Button>Get Started</Button>

          </div>
          <div className="mx-auto w-4/5 sm:w-2/5 lg:w-1/3 pt-8">
            <Image src="/service-hub-bot.png" className="mx-auto" alt="Alphalake Services Bot" width={500} height={500} />
          </div>
        </div>
      </section>
      {/* <section className="min-h-screen p-4 md:p-8 lg:p-12 xl:p-16 bg-bland">
        <h2 className="text-2xl xl:text-4xl my-4 text-center font-extrabold">Services Overview</h2>

        <div className="my-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="grid items-center justify-center border rounded-md min-h-48">Some Content</div>
            <div className="grid items-center justify-center border rounded-md min-h-48">Some Content</div>
            <div className="grid items-center justify-center border rounded-md min-h-48">Some Content</div>
            <div className="grid items-center justify-center border rounded-md min-h-48">Some Content</div>
        </div>
      </section> */}
      

    </main>
  );
}
