// import { getServerSession } from "next-auth";
// import authOptions from "../auth/[...nextauth]/authOptions";
// import pb from "@/lib/pocketbase";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     const fd = await request.formData();
//     const session = await getServerSession(authOptions);
    
//     const files_attached = fd.get("files_attached") as string;
//     const attachments = [];
//     for(let i = 0; i < Number(files_attached); i++) {
//         attachments.push(fd.get(`attachments_${i}`));
//     }

//     try {
//         const res = await pb.collection("tickets").create({
//             title: fd.get("title") as string, 
//             description: fd.get("description") as string, 
//             customer: session?.user.id, 
//             topic: fd.get("topic") as string,
//             issue: fd.get("issue") as string,
//             subIssue: fd.get("subIssue") as string,
//             status: "OPEN", 
//             attachments
//         });

//         return NextResponse.json(res);
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ error: "Ticket could not be created." });
//     }
// }



// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const filter = searchParams.get("filter");
//     const supportId = searchParams.get("supportId");

//     try {
//         let tickets = [];

//         if (filter === "assigned") {
//             tickets = await pb.collection("tickets").getFullList({
//                 filter: `support.id="${supportId}"`,
//                 expand: "customer",
//                 fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id",
//                 sort: "-created",
//             });
//         } else if (filter === "unassigned") {
//             tickets = await pb.collection("tickets").getFullList({
//                 filter: `support.id=null`,
//                 expand: "customer",
//                 fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id",
//                 sort: "-created",
//             });
//         } else {
//             return NextResponse.json({ error: "Invalid filter parameter" }, { status: 400 });
//         }

//         return NextResponse.json(tickets, { status: 200 });
//     } catch (error) {
//         console.error("Failed to fetch tickets:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }


import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import pb from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
    const fd = await request.formData();
    const session = await getServerSession(authOptions);
    
    const files_attached = fd.get("files_attached") as string;
    const attachments = [];
    for(let i = 0; i < Number(files_attached); i++) {
        attachments.push(fd.get(`attachments_${i}`));
    }

    try {
        const ticket = await pb.collection("tickets").create({
            title: fd.get("title") as string, 
            description: fd.get("description") as string, 
            customer: session?.user.id, 
            topic: fd.get("topic") as string,
            issue: fd.get("issue") as string,
            subIssue: fd.get("subIssue") as string,
            status: "OPEN", 
            email: fd.get("email") as string,
            attachments
        });

        const customer = await pb.collection("users").getOne(session?.user.id ?? '');
        const ticketUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/servicehub/${ticket.id}`;

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const emailSubject = `Ticket #${ticket.id} Created Successfully`;
        const emailBody = `
            <p>Hello <strong>${customer.name}</strong>,</p>
            <p>Your ticket has been successfully created with the following details:</p>
            
                <p>TICKET ID: #${ticket.id}</p>
                <p>TITLE: ${ticket.title}</p>
                <p>TOPIC: ${ticket.topic}</p>
                <p>STATUS: ${ticket.status}</p>
            
            <p>Click here to view your ticket: <a href="${ticketUrl}" target="_blank">View Ticket</a></p>
            <p>We'll get back to you as soon as possible.</p>
        `;

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: customer.email,
            subject: emailSubject,
            html: emailBody,
        });

        return NextResponse.json(ticket);
    } catch (error) {
        console.error("Error creating ticket or sending email:", error);
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
                fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id,customer.email",
                sort: "-created",
            });
        } else if (filter === "unassigned") {
            tickets = await pb.collection("tickets").getFullList({
                filter: `support.id=null`,
                expand: "customer",
                fields: "id,title,status,description,created,attachments,expand,customer,customer.name,customer.id,customer.email",
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