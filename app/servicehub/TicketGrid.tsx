import pb from "@/lib/pocketbase";
import Link from "next/link";
import type { Filters } from "./page";
import type { TicketListItem } from "./types";
interface ITicketGrid {
  searchParams: Filters;
  userId: string | undefined;
}

async function fetchTickets(userId: string | undefined, filters: Filters) {
  if (!userId) return [];

  const filterConditions = [`customer.id="${userId}"`];
  if (filters.status) filterConditions.push(`status="${filters.status}"`);
  if (filters.keyword) filterConditions.push(`title~"${filters.keyword}"`);
  if (filters.created) filterConditions.push(`created="${filters.created}"`);

  try {
    return await pb.collection("tickets").getFullList<TicketListItem>({
      expand: "title,created,status,id,description",
      filter: filterConditions.join(" && "),
      sort: "-created",
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}

export default async function TicketGrid({
  searchParams,
  userId,
}: ITicketGrid) {
  const tickets = await fetchTickets(userId, searchParams);

  return tickets.length ? (
    tickets.map((t) => (
      <Link
        key={t.id}
        href={`/servicehub/${t.id}`}
        className="border rounded p-4"
      >
        <h3>{t.title}</h3>
        <p className="text-muted-foreground line-clamp-1">{t.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs">
            {new Date(t.created).toLocaleString()}
          </span>
          <span
            className={`text-xs border rounded-md px-2 py-1 status-${t.status}`}
          >
            {t.status}
          </span>
        </div>
      </Link>
    ))
  ) : (
    <div>No items match your search.</div>
  );
}

// import pb from "@/lib/pocketbase";
// import Link from "next/link";
// import AssignTicketClient from "@/components/custom/AssignTicketClient";
// import type { Filters } from "./page";
// import type { TicketListItem } from "./types";

// interface ITicketGrid {
//   searchParams: Filters;
//   userId: string | undefined;
//   allowAssign?: boolean; // Prop to enable the "Assign" functionality
// }

// async function fetchTickets(userId: string | undefined, filters: Filters) {
//   if (!userId) return [];

//   const filterConditions = [`customer.id="${userId}"`];
//   if (filters.status) filterConditions.push(`status="${filters.status}"`);
//   if (filters.keyword) filterConditions.push(`title~"${filters.keyword}"`);
//   if (filters.created) filterConditions.push(`created="${filters.created}"`);

//   try {
//     return await pb.collection("tickets").getFullList<TicketListItem>({
//       expand: "title,created,status,id,description",
//       filter: filterConditions.join(" && "),
//       sort: "-created",
//     });
//   } catch (error) {
//     console.error("Error fetching tickets:", error);
//     return [];
//   }
// }

// export default async function TicketGrid({
//   searchParams,
//   userId,
//   allowAssign = false,
// }: ITicketGrid) {
//   const tickets = await fetchTickets(userId, searchParams);

//   return (
//     <div className="grid gap-4">
//       {tickets.length ? (
//         tickets.map((ticket) => (
//           <div key={ticket.id} className="border rounded p-4">
//             <Link href={`/servicehub/${ticket.id}`}>
//               <h3>{ticket.title}</h3>
//               <p className="text-muted-foreground line-clamp-1">{ticket.description}</p>
//               <div className="flex items-center justify-between mt-2">
//                 <span className="text-xs">{new Date(ticket.created).toLocaleString()}</span>
//                 <span
//                   className={`text-xs border rounded-md px-2 py-1 status-${ticket.status}`}
//                 >
//                   {ticket.status}
//                 </span>
//               </div>
//             </Link>
//             {allowAssign && (
//               <AssignTicketClient ticketId={ticket.id} />
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No items match your search.</div>
//       )}
//     </div>
//   );
// }
