import SupportDashboardGrid from "./SupportDashboardGrid";
import { TicketListItemForSupport, UserListItem } from "../types";
import { SupportPageSearchParams } from "./page";
import pb from "@/lib/pocketbase";


type SupportDashboardProps = {
  searchParams: SupportPageSearchParams;
  userId?: string
};

export async function fetchSupportData(searchParams?: SupportPageSearchParams) {

  const filterConditions = [];
  if (searchParams?.status) filterConditions.push(`status="${searchParams?.status}"`);
  if (searchParams?.keyword) filterConditions.push(`title~"${searchParams?.keyword}"`);
  if (searchParams?.created) filterConditions.push(`created="${searchParams?.created}"`);

  const [users, tickets] = await Promise.all([
    pb.collection("users").getFullList<UserListItem>({
      filter: "role='SUPPORT'",
      fields: "id,name,email,role",
    }),

    pb.collection("tickets").getFullList<TicketListItemForSupport>({
      filter: filterConditions.join(" && "),
      expand: "customer,support",
      fields: "id,title,status,description,created,expand.customer.id,expand.customer.name,expand.support.id,expand.support.name",
      sort: "-created",
      $autoCancel: false,
    }),
  ]);
  return {
    users: users.length? users: [],
    tickets: tickets.length? tickets: [],
  };
}

export default async function SupportDashboard({
  userId
}: SupportDashboardProps) {

  const data = await fetchSupportData();

  const unassignedTickets: TicketListItemForSupport[] = [];
  const assignedTickets: TicketListItemForSupport[] = [];

  data.tickets.forEach((ticket) => {
    if (ticket.expand?.support?.id === userId) {
      assignedTickets.push(ticket);
    } else {
      unassignedTickets.push(ticket);
    }
  })
  return (
    <SupportDashboardGrid supportUsers={data.users} assignedTickets={assignedTickets} unassignedTickets={unassignedTickets} />
  );
}

// import SupportDashboardGrid from "./SupportDashboardGrid";
// import { TicketListItemForSupport, UserListItem } from "../types";
// import pb from "@/lib/pocketbase";

// export type SupportPageSearchParams = {
//   status?: string;
//   keyword?: string;
//   customer?: string;
//   created?: string;
// };

// type SupportDashboardProps = {
//   searchParams: SupportPageSearchParams;
//   userId?: string;
// };

// export async function fetchSupportData(
//   searchParams?: SupportPageSearchParams,
//   userId?: string
// ) {
//   const filterConditions = [];

//   if (searchParams?.status && searchParams.status !== "ALL") {
//     filterConditions.push(`status="${searchParams.status}"`);
//   }

//   if (searchParams?.keyword) {
//     filterConditions.push(`title~"${searchParams.keyword}"`);
//   }

//   if (searchParams?.customer && searchParams.customer !== "ALL") {
//     filterConditions.push(`expand.customer.name="${searchParams.customer}"`);
//   }

//   if (searchParams?.created) {
//     filterConditions.push(`created="${searchParams.created}"`);
//   }

//   const [users, tickets, customers] = await Promise.all([
//     pb.collection("users").getFullList<UserListItem>({
//       filter: "role='SUPPORT'",
//       fields: "id,name,email,role",
//     }),
//     pb.collection("tickets").getFullList<TicketListItemForSupport>({
//       filter: filterConditions.join(" && "),
//       expand: "customer,support",
//       fields: "id,title,status,description,created,expand.customer.id,expand.customer.name,expand.support.id,expand.support.name",
//       sort: "-created",
//       $autoCancel: false,
//     }),
//     pb.collection("tickets").getFullList({
//       expand: "customer",
//       fields: "expand,expand.customer.name,expand.customer.id",
//     }),
//   ]);

//   const uniqueCustomers = Array.from(
//     new Set(
//       customers
//         .map(ticket => ticket.expand?.customer?.name)
//         .filter((name): name is string => !!name)
//     )
//   ).sort();

//   console.log(uniqueCustomers);
  
//   const unassignedTickets: TicketListItemForSupport[] = [];
//   const assignedTickets: TicketListItemForSupport[] = [];

//   tickets.forEach((ticket) => {
//     if (userId && ticket.expand?.support?.id === userId) {
//       assignedTickets.push(ticket);
//     } else if (!ticket.expand?.support?.id) {
//       unassignedTickets.push(ticket);
//     }
//   });

//   return {
//     users: users.length ? users : [],
//     tickets: tickets.length ? tickets : [],
//     assignedTickets,
//     unassignedTickets,
//     customers: uniqueCustomers,
//   };
// }

// export default async function SupportDashboard({
//   searchParams,
//   userId
// }: SupportDashboardProps) {
//   const data = await fetchSupportData(searchParams, userId);

//   return (
//     <SupportDashboardGrid 
//       supportUsers={data.users} 
//       assignedTickets={data.assignedTickets} 
//       unassignedTickets={data.unassignedTickets}
//       customers={data.customers}
//     />
//   );
// }