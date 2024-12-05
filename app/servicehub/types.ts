import { ReactNode } from "react";

export type TicketListItem = {
    id: string;
    title: string;
    status: string;
    description: string;
    created: Date;
    comments: string;
}

export type Ticket = TicketListItem & {
    expand: {
        user: string;
        customer: {
            id: string;
            name: string;
            avatar: string;
        },
        support?: {
            id: string;
            name: string;
            role: string;
            sub: string;
            avatar: string;
        }
    }
    attachments: string[];
}

export type TicketComment = {
    id: string;
    ticket: string;
    user: string;
    content: string;
    created: Date;
    attachments: string[];  
    expand: {
        user: {
            role: ReactNode;
            avatar: string;
            id: string;
            name: string;
        },
    } 
}

export type UserRole = "ADMIN" | "SUPPORT" | "CUSTOMER";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string;
            id: string;
            sub?: string;
            email?: string;
            role: UserRole; 
        };
    }
}

export type UserListItem = {
    id: string;
    name: string;
    role: UserRole;
}

export type UserListItemForAdmin = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    sub: string;   
    description: string;
    avatar: string;
}


export type TicketListItemForSupport = {
    id: string;
    title: string;
    status: string;
    description: string;
    created: Date;
    expand: {
        customer: {
            id: string;
            name: string;
        },
        support?: {
            id: string;
            name: string;
        }
    }
}