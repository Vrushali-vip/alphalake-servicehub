import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/authOptions";

export default async function Layout({ children }: { children: React.ReactNode; }) {
    
    return <>{children}</>;
}
