import pb, { getImageUrl } from "@/lib/pocketbase";
import { Ticket, TicketComment } from "../types";
import CommentForm from "./CommentForm";
import ArticleCardSkeleton from "@/components/custom/ArticleCardSkeleton";
import { MarkResolvedButton } from "@/components/custom/MarkResolvedButton";
import FullScreenImage from "@/components/custom/FullScreenImage";


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
      sort: "created",
      $autoCancel: false
    }),
  ]);

  // console.log(ticket, ticket.expand.user);
  return (
    <main className="min-h-screen p-4 flex justify-center items-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 p-6 shadow-md rounded-md">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <img
                src={
                  ticket.expand.customer.avatar
                    ? pb.files.getUrl(ticket.expand.customer, ticket.expand.customer.avatar)
                    : "/default-avatar.png"
                }
                alt={ticket.expand.customer.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h2 className="text-2xl font-bold">{ticket.expand.customer.name}</h2>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold">{ticket.title}</p>
              <p className="text-sm text-gray-400">
                {new Date(ticket.created)
                  .toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                  .replace(/,/g, "")
                  .replace("am", "AM")
                  .replace("pm", "PM")}
              </p>
            </div>

            <p className="text-sm text-gray-200 mt-2 flex items-center gap-2">
              <span
                className={`text-xs border rounded-md px-2 py-1 status-${ticket.status}`}
              >
                {ticket.status}
              </span>
              <span className="w-2 h-2 inline-block"></span>
              {ticket.id}
            </p>

            <p className="mt-6 whitespace-pre-wrap">
              {ticket.description}
            </p>
          </div>
          <div className="py-4">
            <div className="flex justify-center">
              <div className="border p-2 rounded">
                <MarkResolvedButton ticketId={params.ticketId} currentStatus={ticket.status} />
              </div>
            </div>
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 p-6 shadow-md rounded-md ">
          <div className="lg:col-span-2 space-y-4 ">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="shadow-sm p-6 bg-gray-800"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      comment.expand.user.avatar
                        ? pb.files.getUrl(comment.expand.user, comment.expand.user.avatar)
                        : "/default-avatar.png"
                    }
                    alt={comment.expand.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex w-full items-center">
                    <div>
                      <p className="text-sm font-semibold">{comment.expand.user.name}</p>
                      <p className="text-xs text-gray-400">{comment.expand.user.sub}</p>
                    </div>
                    <p className="text-sm text-gray-400 ml-auto">
                      {new Date(comment.created)
                        .toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .replace(/,/g, "")
                        .replace("am", "AM")
                        .replace("pm", "PM")}
                    </p>
                  </div>
                </div>
                <p className="mt-6 whitespace-pre-wrap">
                  {comment.content}
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
                </p>
              </div>
            ))}
            <CommentForm ticketId={params.ticketId} />
          </div>


          <div className="space-y-4">
            {ticket.expand.support && (
              <div className="border rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold">Support Specialist</h3>
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={
                      ticket.expand.support.avatar
                        ? pb.files.getUrl(ticket.expand.support, ticket.expand.support.avatar)
                        : "/default-avatar.png"
                    }
                    alt={ticket.expand.support.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{ticket.expand.support.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{ticket.expand.support.description}</p>
              </div>
            )}
            <div className=" rounded-lg shadow-sm">
              <ArticleCardSkeleton />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

