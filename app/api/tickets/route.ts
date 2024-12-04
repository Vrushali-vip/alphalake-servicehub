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
            topic: fd.get("topic") as string,
            issue: fd.get("issue") as string,
            subIssue: fd.get("subIssue") as string,
            status: "OPEN", 
            attachments
        });

        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Ticket could not be created." });
    }
}



export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter");
    const supportId = searchParams.get("supportId");

    try {
        let tickets = [];

        if (filter === "assigned") {
            tickets = await pb.collection("tickets").getFullList({
                filter: `support.id="${supportId}"`,
                expand: "customer",
                fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id",
                sort: "-created",
            });
        } else if (filter === "unassigned") {
            tickets = await pb.collection("tickets").getFullList({
                filter: `support.id=null`,
                expand: "customer",
                fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id",
                sort: "-created",
            });
        } else {
            return NextResponse.json({ error: "Invalid filter parameter" }, { status: 400 });
        }

        return NextResponse.json(tickets, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch tickets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
