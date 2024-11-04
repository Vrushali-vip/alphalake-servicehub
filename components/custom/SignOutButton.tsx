"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SignOutButton() {
    function onLogOutClick() {
        signOut()
    }
    return (
        <Button variant="link" size="sm" onClick={onLogOutClick}>Log Out</Button>
    )
}