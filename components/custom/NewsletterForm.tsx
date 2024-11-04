"use client";

import subscribeNewsletter from "@/actions/newsletter-subscribe";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        if(loading) return;
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.currentTarget);
        const { error, message } = await subscribeNewsletter(fd);

        if(error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: message
            })
        } else {
            toast({
                title: "Success",
                description: message
            })
        }

        setLoading(false);
    }

    return (
        <form className="space-y-2" onSubmit={onFormSubmit}>
            <Input placeholder="Your Name" name="name" type="text" required />
            <Input placeholder="Your email" name="email" type="email" required />
            <Button disabled={loading} type="submit">{loading ? "Subscribing..." : "Subscribe"}</Button>
        </form>
        )
}