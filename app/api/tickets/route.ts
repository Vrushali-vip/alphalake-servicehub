import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import pb from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const fd = await request.formData();
    const session = await getServerSession(authOptions);
    
    const files_attached = fd.get("files_attached") as string;
    const attachments = [];
    for(let i = 0; i < Number(files_attached); i++) {
        attachments.push(fd.get(`attachments_${i}`));
    }

    try {
        const res = await pb.collection("tickets").create({
            title: fd.get("title") as string, 
            description: fd.get("description") as string, 
            customer: session?.user.id, 
            status: "OPEN", 
            attachments
        });

        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Ticket could not be created." });
    }
}