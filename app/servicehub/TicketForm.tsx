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
} from "@/components/ui/form";
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
import { clientRevalidate } from "./action";
import FileInput from "@/components/custom/FileInput";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(15)
})

export default function TicketForm() {

    const { toast } = useToast();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [working, setWorking] = useState<boolean>(false);
    const [files, setFiles] = useState<File[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setWorking(true);

        const fd = new FormData();
        fd.append("description", values.description);
        fd.append("title", values.title);
        fd.append("files_attached", ""+files.length);

        // append files to form data
        files.forEach((file, i) => fd.append(`attachments_${i}`, file));

        const res = await fetch("/api/tickets", { method: "POST", body: fd });
        const responseData = await res.json();

        if (responseData.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: responseData.error
            })
        } else {
            await clientRevalidate("/servicehub");
            toast({
                title: "Success",
                description: "Ticket added successfully."
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
            <DialogTrigger asChild><Button size="sm"><Plus size={18} className="mr-2" /> Create</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Ticket</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type a title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
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
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { Textarea } from "@/components/ui/textarea";
// import { Plus } from "lucide-react";
// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import FileInput from "@/components/custom/FileInput";
// import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectTrigger,
//     SelectContent,
//     SelectItem,
//     SelectValue,
// } from "@/components/ui/select";

// // Validation schema for the form
// const formSchema = z.object({
//     organisation: z.string().min(1, { message: "Please select an organisation" }),
//     title: z
//         .string()
//         .min(10, { message: "Title should be at least 10 characters" }),
//     description: z
//         .string()
//         .min(15, { message: "Description should be at least 15 characters" }),
//     topic: z.string().min(1, { message: "Please select a topic" }),
// });

// const suggestedArticles = [
//     { title: "How to resolve common issues", id: 1 },
//     { title: "Troubleshooting guide", id: 2 },
//     { title: "FAQ on similar problems", id: 3 },
// ];

// export default function TicketForm() {
//     const { toast } = useToast();
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [working, setWorking] = useState(false);
//     const [files, setFiles] = useState<File[]>([]);
//     const [step, setStep] = useState(1);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const [isEditable, setIsEditable] = useState(false); // Control editability of organisation and topic

//     const username = "John Doe"; // Replace with dynamic username as needed.

//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             organisation: "",
//             title: "",
//             description: "",
//             topic: "",
//         },
//     });

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         setWorking(true);

//         const fd = new FormData();
//         fd.append("description", values.description);
//         fd.append("title", values.title);
//         fd.append("files_attached", "" + files.length);
//         files.forEach((file, i) => fd.append(`attachments_${i}`, file));

//         const res = await fetch("/api/tickets", { method: "POST", body: fd });
//         const responseData = await res.json();

//         if (responseData.error) {
//             toast({
//                 variant: "destructive",
//                 title: "Error",
//                 description: responseData.error,
//             });
//         } else {
//             toast({
//                 title: "Success",
//                 description: "Ticket added successfully.",
//             });
//         }

//         form.reset();
//         setWorking(false);
//         setDialogOpen(false);
//         setStep(1); // Reset step to 1 after submit
//     }

//     function onOpenChange(open: boolean) {
//         if (!open) form.reset();
//         setDialogOpen(open);
//     }

//     function onFileInputChange(files: File[]) {
//         setFiles(files);
//     }

//     // Function to handle next step
//     const handleNextStep = () => {
//         setStep(step + 1);
//     };

//     // Function to handle previous step
//     const handlePreviousStep = () => {
//         if (step > 1) setStep(step - 1);
//     };

//     // Function to display suggestions based on user input
//     const handleDescriptionChange = (
//         e: React.ChangeEvent<HTMLTextAreaElement>
//     ) => {
//         form.setValue("description", e.target.value);
//         setShowSuggestions(e.target.value.length > 0);
//     };

//     return (
//         <Dialog onOpenChange={onOpenChange} open={dialogOpen}>
//             <DialogTrigger asChild>
//                 <Button size="sm">
//                     <Plus size={18} className="mr-2" /> Create
//                 </Button>
//             </DialogTrigger>
//             <DialogContent>
//                 <div className="flex justify-between mb-6 text-sm font-medium text-gray-500">
//                     <div
//                         className={`flex-1 text-center ${step === 1 ? "text-blue-600 font-bold" : ""
//                             }`}
//                     >
//                         1. What's happening
//                     </div>
//                     <div
//                         className={`flex-1 text-center ${step === 2 ? "text-blue-600 font-bold" : ""
//                             }`}
//                     >
//                         2. What we need
//                     </div>
//                     <div
//                         className={`flex-1 text-center ${step === 3 ? "text-blue-600 font-bold" : ""
//                             }`}
//                     >
//                         3. Next steps
//                     </div>
//                 </div>

//                 {/* Step Indicator */}

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                         {/* Step 1: Issue Description */}
//                         {step === 1 && (
//                             <>
//                                 <h2 className="text-lg font-semibold mb-4">
//                                     Hi {username}, our experts are ready to help
//                                 </h2>
//                                 <DialogHeader>
//                                     <DialogTitle>Describe What's Happening</DialogTitle>
//                                 </DialogHeader>
//                                 {/* Organisation Select */}
//                                 <p className="text-sm">The more detail you include, the more we can help</p>
//                                 <FormField
//                                     control={form.control}
//                                     name="organisation"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Organisation</FormLabel>
//                                             <FormControl>
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                 // disabled={!isEditable}
//                                                 >
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select an organisation" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="org1">
//                                                             Alphalake Ai - UK
//                                                         </SelectItem>
//                                                         <SelectItem value="org2">
//                                                             Other Organisation
//                                                         </SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Topic Select */}
//                                 <FormField
//                                     control={form.control}
//                                     name="topic"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Topic</FormLabel>
//                                             <FormControl>
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                 // disabled={!isEditable}
//                                                 >
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select a topic" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="fixed-assets">
//                                                             Fixed Assets
//                                                         </SelectItem>
//                                                         <SelectItem value="inventory">Inventory</SelectItem>
//                                                         <SelectItem value="reporting">Reporting</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Description Textarea */}
//                                 <FormField
//                                     control={form.control}
//                                     name="description"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Description</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="Provide details of the issue"
//                                                     {...field}
//                                                     onChange={handleDescriptionChange}
//                                                     required
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />

//                                             {/* Suggestions */}
//                                             {showSuggestions && (
//                                                 <div className="suggestions mt-2 border rounded p-2 bg-gray-50">
//                                                     <p className="font-semibold">These might help:</p>
//                                                     <ul>
//                                                         {suggestedArticles.map((article) => (
//                                                             <li
//                                                                 key={article.id}
//                                                                 className="text-blue-500 cursor-pointer"
//                                                             >
//                                                                 {article.title}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>
//                                             )}
//                                         </FormItem>
//                                     )}
//                                 />
//                             </>
//                         )}
//                         {step === 2 && (
//                             <>
//                                 <DialogHeader>
//                                     <DialogTitle>Show us the Problem</DialogTitle>
//                                 </DialogHeader>
//                                 {/* Organisation Select */}
//                                 <FormField
//                                     control={form.control}
//                                     name="organisation"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Organisation</FormLabel>
//                                             <FormControl>
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                     disabled={!isEditable}
//                                                 >
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select an organisation" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="org1">
//                                                             Alphalake Ai - UK
//                                                         </SelectItem>
//                                                         <SelectItem value="org2">
//                                                             Other Organisation
//                                                         </SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Topic Select */}
//                                 <FormField
//                                     control={form.control}
//                                     name="topic"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Topic</FormLabel>
//                                             <FormControl>
//                                                 <Select
//                                                     onValueChange={field.onChange}
//                                                     value={field.value}
//                                                     disabled={!isEditable}
//                                                 >
//                                                     <SelectTrigger>
//                                                         <SelectValue placeholder="Select a topic" />
//                                                     </SelectTrigger>
//                                                     <SelectContent>
//                                                         <SelectItem value="fixed-assets">
//                                                             Fixed Assets
//                                                         </SelectItem>
//                                                         <SelectItem value="inventory">Inventory</SelectItem>
//                                                         <SelectItem value="reporting">Reporting</SelectItem>
//                                                     </SelectContent>
//                                                 </Select>
//                                             </FormControl>
//                                             <FormMessage />
//                                         </FormItem>
//                                     )}
//                                 />

//                                 {/* Edit Button */}
//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => setIsEditable(!isEditable)}
//                                     className="mt-2"
//                                 >
//                                     {isEditable ? "Lock" : "Edit"}
//                                 </Button>

//                                 {/* Description Textarea */}
//                                 <FormField
//                                     control={form.control}
//                                     name="description"
//                                     render={({ field }) => (
//                                         <FormItem>
//                                             <FormLabel>Description</FormLabel>
//                                             <FormControl>
//                                                 <Textarea
//                                                     placeholder="Provide details of the issue"
//                                                     {...field}
//                                                     onChange={handleDescriptionChange}
//                                                     required
//                                                 />
//                                             </FormControl>
//                                             <FormMessage />

//                                             {/* Suggestions */}
//                                             {showSuggestions && (
//                                                 <div className="suggestions mt-2 border rounded p-2 bg-gray-50">
//                                                     <p className="font-semibold">These might help:</p>
//                                                     <ul>
//                                                         {suggestedArticles.map((article) => (
//                                                             <li
//                                                                 key={article.id}
//                                                                 className="text-blue-500 cursor-pointer"
//                                                             >
//                                                                 {article.title}
//                                                             </li>
//                                                         ))}
//                                                     </ul>
//                                                 </div>
//                                             )}
//                                         </FormItem>
//                                     )}
//                                 />
//                             </>
//                         )}

//                         {/* Navigation Buttons */}
//                         <div className="flex justify-between mt-4">
//                             {step > 1 && (
//                                 <Button
//                                     onClick={handlePreviousStep}
//                                     size="sm"
//                                     variant="outline"
//                                 >
//                                     Previous
//                                 </Button>
//                             )}
//                             {step < 3 ? (
//                                 <Button onClick={handleNextStep} size="sm" variant="outline">
//                                     Next
//                                 </Button>
//                             ) : (
//                                 <Button disabled={working} size="sm" type="submit">
//                                     {working ? "Working..." : "Submit"}
//                                 </Button>
//                             )}
//                         </div>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     );
// }
