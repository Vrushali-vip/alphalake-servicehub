"use client";
import { Button } from "../ui/button";
import { UserCircle } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"

export default function NavbarClient() {

    const session = useSession();
    function onLogOutClick() {
        signOut();
    }

    return (
            session?.data?.user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" >
                             <UserCircle size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem disabled>Profile</DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant="link" size="sm" onClick={onLogOutClick}>Log Out</Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            ) :
                <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
                    Book A Demo
                </Button>
    )
}