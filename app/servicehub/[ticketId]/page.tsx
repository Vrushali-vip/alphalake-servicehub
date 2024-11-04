import pb, { getImageUrl } from "@/lib/pocketbase"
import { Ticket, TicketComment } from "../types";
import FullScreenImage from "@/components/custom/FullScreenImage";
import { Suspense } from "react";
import { Clock } from "lucide-react";
import CommentForm from "../CommentForm";
import GoBack from "@/components/custom/GoBack";

export default async function TicketById({ params }: { params: { ticketId: string } }) {

    const [ticket, comments] = await Promise.all([
        pb.collection("tickets").getOne<Ticket>(params.ticketId, {
            expand: "customer",
            fields: "id,title,status,description,created,attachments,expand,customer.id,customer.name"
        }),
        pb.collection("ticket_comments").getFullList<TicketComment>({
            filter: `ticket.id="${params.ticketId}"`,
            expand: "user",
            fields: "id,ticket,user,content,created,attachments,expand,user.id,user.name",
            sort: "-created",
            $autoCancel: false
        })
    ]);
    

    return (
        <main>
            <div className="min-h-screen">
                <div className="p-4 lg:px-8 flex gap-2">
                    <Suspense>
                        <GoBack />
                    </Suspense>
                    <h1 className="text-2xl font-bold">Ticket #{params.ticketId}</h1>
                </div>
                <div className="p-4 lg:px-8">
                    <div className="border rounded-md p-4 spave-y-4">
                        <div className="flex justify-between border-b pb-2 mb-2">
                            <span className="text-sm flex items-center"><Clock size={18} className="mr-2" /> {new Date(ticket.created).toLocaleString()}</span>
                            <span className={`text-xs px-2 py-1 rounded-md status-${ticket.status}`}>{ticket.status}</span>
                        </div>
                        <h2 className="text-xl font-semibold">{ticket.title}</h2>
                        <p>{ticket.description}</p>
                        <br />
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
                            <Suspense>
                                {
                                    ticket.attachments.map((a) => <FullScreenImage key={a} src={getImageUrl("tickets", params.ticketId, a)} />)
                                }
                            </Suspense>
                        </div>
                        <div className="pt-4 mt-4 border-t space-y-4">
                            <div className="flex justify-between items-center">
                                <h5>Comments ({comments.length})</h5>
                                <Suspense>
                                    <CommentForm ticketId={params.ticketId} />
                                </Suspense>
                            </div>
                            {
                                comments.map(c => <div key={c.id} className="border p-2 space-y-2">
                                    <p className="text-xs text-muted-foreground">{c.expand.user.name} | {new Date(c.created).toLocaleString()}</p>
                                    <p>{c.content}</p>
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
                                        <Suspense>
                                            {
                                                c.attachments.map((a) => <FullScreenImage key={a} src={getImageUrl("ticket_comments", c.id, a)} />)
                                            }
                                        </Suspense>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}