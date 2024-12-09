import SupportDashboard from "./SupportDashboard";
import { Suspense } from "react";
import type { Filters } from "../page";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

export type SupportPageSearchParams = Filters;

export default async function SupportPage({ searchParams }: { searchParams: SupportPageSearchParams }) {
    const session = await getServerSession(authOptions);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Servicehub Response Team Dashboard</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <SupportDashboard searchParams={searchParams} userId={session?.user?.id} />
            </Suspense>
        </div>
    )
}