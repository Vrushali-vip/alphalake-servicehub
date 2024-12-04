import SupportDashboard from "./SupportDashboard";
import { Suspense } from "react";
import type { Filters } from "../page";

export type SupportPageSearchParams = Filters;

export default async function SupportPage({ searchParams }: { searchParams: SupportPageSearchParams }) {

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Servicehub Response Team Dashboard</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <SupportDashboard searchParams={searchParams} />
            </Suspense>
        </div>
    )
}