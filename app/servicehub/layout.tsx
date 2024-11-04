
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({ children, params }: { children: React.ReactNode, params: { name: string } }) {
    // const supabase = createClient();
    // const { data: { user }} = await supabase.auth.getUser();
    const session = await getServerSession();
    if(!session?.user) {
        redirect("/login?redirect=/servicehub/"+params.name);
    }

    if(session.user.role === "ADMIN") {
        redirect("/servicehub/admin/"+params.name);
    }

    return <>{children}</>
}