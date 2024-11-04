import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AlphabotPCN() {
    return (
        <main>
            <section className="flex min-h-screen">
                <div className="p-4 md:p-8 lg:p-12 xl:p-16 mx-auto my-auto gap-y-8 justify-between align-center flex flex-col lg:flex-row">
                    <div className="lg:w-2/3 pt-12 md:pt-4">
                        <h1 className="text-3xl xl:text-5xl font-extrabold mb-6">
                            A bot that automatically processes (and
                            pays!) Parking Notices for UK
                            organisations managing staff on the
                            roads.
                        </h1>
                        <p className="font-mono py-3">
                            Our purpose-designed bot frees up teams from losing valuable time
                            dealing with the processing, challenging and payment of Parking/Penalty Charges
                            Notices (PCN’s).
                        </p>
                        <p className="font-mono py-3 mb-8">
                            Get your fleet, finance and operations teams out of zero
                            value-add clerical and admin, and let Alphabot to the work for you.
                        </p>
                        <Button>Jump straight to Pricing</Button>
                    </div>
                    <div className="mx-auto w-4/5 sm:w-2/5 lg:w-1/3 max-w-xs pt-8">
                        <div className="pcn">
                            <Image src="/parking-charge.jpg" className="mx-auto" alt="Parking Charge Notice" width={500} height={500} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}