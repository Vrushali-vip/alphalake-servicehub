"use server";

import pb from "@/lib/pocketbase";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { revalidatePath } from "next/cache";

export async function createTicket(title: string, description: string, attachments: File[] = []) {
    const session = await getServerSession(authOptions);
    try {
        
        await pb.collection("tickets").create({
            title, description, customer: session?.user.id, status: "OPEN", attachments
        });
        revalidatePath("/servicehub");
        return {
            error: false
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Ticket could not be created."
        }
    }
}

export async function createTicketComment(ticketId: string, comment: string, attachments: File[] = []) {
    const session = await getServerSession(authOptions);
    try {
        await pb.collection("ticket_comments").create({
            ticket: ticketId,
            content: comment,
            user: session?.user.id,
            attachments
        });
        revalidatePath("/servicehub/"+ticketId);
        return {
            error: false
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Comment could not be created."
        }   
    }
}

export async function clientRevalidate(path: string) {
    revalidatePath(path);
    return true;
}