import pb, { getImageUrl } from "@/lib/pocketbase";
import { Ticket, TicketComment } from "../types";
import FullScreenImage from "@/components/custom/FullScreenImage";
import CommentForm from "./CommentForm";
import GoBack from "@/components/custom/GoBack";
import ArticleCardSkeleton from "@/components/custom/ArticleCardSkeleton";
import { MarkResolvedButton } from "@/components/custom/MarkResolvedButton";


export const revalidate = 0;
export default async function TicketById({ params }: { params: { ticketId: string } }) {
    const [ticket, comments] = await Promise.all([
        pb.collection("tickets").getOne<Ticket>(params.ticketId, {
            expand: "customer,support",
            fields: "id,title,status,description,created,attachments,expand,customer,customer.id,exapand,support,support.id,support.name,support.role,support.sub",
        }),
        pb.collection("ticket_comments").getFullList<TicketComment>({
            filter: `ticket.id="${params.ticketId}"`,
            expand: "user,created,updated",
            fields: "id,ticket,user,content,created,attachments,expand,user.id,user.name,expand.created.id,expand.created.name,expand.updated.id,expand.updated.name",
            // sort: "-created",
            $autoCancel: false
        }),
    ]);

    return (
        <main className="min-h-screen p-4 lg:px-8">
            <div className="flex justify-between items-center mb-6 mr-2">
                <GoBack />
                <MarkResolvedButton ticketId={params.ticketId} currentStatus={ticket.status} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Ticket details */}
                <div className="col-span-3 space-y-6">
                    <div className="p-6 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-start">
                            {/* Title and Description */}
                            <div>
                                <h1 className="text-2xl font-semibold">{ticket.title}</h1>
                                <p className="text-sm text-gray-200 mt-2 flex items-center gap-2">
                                    <span
                                        className={`text-xs border rounded-md px-2 py-1 status-${ticket.status}`}
                                    >
                                        {ticket.status}
                                    </span>
                                    <span className="w-2 h-2 inline-block"></span>
                                    {ticket.id}
                                </p>
                                <p className="mt-2 text-gray-200">{ticket.description}</p>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-200 flex items-center justify-end gap-2 mb-2">
                                    {new Date(ticket.created).toLocaleString()}
                                </div>
                            </div>
                        </div>
                        {ticket.attachments.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                                {ticket.attachments.map((attachment) => (
                                    <FullScreenImage
                                        key={attachment}
                                        src={getImageUrl("tickets", params.ticketId, attachment)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Comments section */}

                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
                        {comments.map((comment) => (
                            <div key={comment.id} className="p-4 border rounded-lg shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={
                                                comment.expand.user.avatar
                                                    ? pb.files.getUrl(comment.expand.user, comment.expand.user.avatar)
                                                    : "/default-avatar.png"
                                            }
                                            alt={comment.expand.user.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="text-sm text-white-600 font-semibold">{comment.expand.user.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{comment.expand.user.role}</p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-400">
                                        {new Date(comment.created).toLocaleString()}
                                    </p>
                                </div>

                                <p className="mt-2">{comment.content}</p>
                                {comment.attachments.length > 0 && (
                                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {comment.attachments.map((attachment) => (
                                            <FullScreenImage
                                                key={attachment}
                                                src={getImageUrl("ticket_comments", comment.id, attachment)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <CommentForm ticketId={params.ticketId} />
                </div>

                {/* Support Specialist */}
                {
                    ticket.expand.support &&
                    <div className="">
                        <div className="border rounded-lg p-6 shadow-sm space-y-6" >
                            <h3 className="text-lg font-semibold mb-4">Your Support Specialist</h3>
                            <div className="flex items-center mb-4">
                                <img
                                    src={
                                        ticket.expand.support.avatar
                                            ? pb.files.getUrl(ticket.expand.support, ticket.expand.support.avatar)
                                            : "/default-avatar.png"
                                    }
                                    alt={ticket.expand.support.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                    <h4 className="font-medium">{ticket.expand.support.name}</h4>
                                    <p className="text-sm text-gray-600">{ticket.expand.support.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                {ticket.expand.support.sub}
                            </p>
                        </div>

                        <div className="mt-4">
                            <ArticleCardSkeleton />
                        </div>
                    </div>
                }
            </div>
        </main>
    );
}

