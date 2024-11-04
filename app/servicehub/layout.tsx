
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "../api/auth/[...nextauth]/authOptions";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { name: string } }) {
    // const supabase = createClient();
    // const { data: { user }} = await supabase.auth.getUser();
    const session = await getServerSession(authOptions);

    if(session?.user.role === "ADMIN") {
        redirect("/servicehub/admin/"+params.name);
    }

    return <>{children}</>
}