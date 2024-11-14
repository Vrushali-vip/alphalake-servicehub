"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

import { Plus } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import FileInput from "@/components/custom/FileInput";
import { clientRevalidate } from "../action";

const formSchema = z.object({
    content: z.string()
})

type CommentFormProps = {
    ticketId: string;
}
export default function CommentForm({ ticketId }: CommentFormProps) {

    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [working, setWorking] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ""
        },
    })
    

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setWorking(true);

        const fd = new FormData();
        fd.append("content", values.content);
        fd.append("ticket", ticketId);
        fd.append("files_attached", ""+files.length);

        // append files to form data
        files.forEach((file, i) => fd.append(`attachments_${i}`, file));

        const res = await fetch("/api/comments", { method: "POST", body: fd });
        const responseData = await res.json();
        // createTicketComment(ticketId, values.content, files);

        if (responseData.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: responseData.error
            })
        } else {
            await clientRevalidate("/servicehub/" + ticketId);
            toast({
                title: "Success",
                description: "Comment added successfully."
            })
        }
        form.reset();
        setWorking(false);
        setDialogOpen(false);
    }

    function onOpenChange(open: boolean) {
        if (!open) form.reset();
        setDialogOpen(open);
    }

    function onFileInputChange(files: File[]) {
        setFiles(files);
    }

    return (
        <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
            <DialogTrigger asChild><Button size="sm"><Plus size={18} className="mr-2" /> Add Comment</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Comment</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Comment</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Type a comment" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="border rounded-md">
                            <FileInput onChange={onFileInputChange} label="Add Images" multiple={true} accept="image/*" />
                        </div>

                        <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                                <Button size="sm" variant="outline" type="reset">Cancel</Button>
                            </DialogClose>
                            <Button disabled={working} size="sm" type="submit">{working ? "Working..." : "Submit"}</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}