import SupportDashboardGrid from "./SupportDashboardGrid";
import { TicketListItemForSupport, UserListItem } from "../types";
import { SupportPageSearchParams } from "./page";
import pb from "@/lib/pocketbase";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

type SupportDashboardProps = {
  searchParams: SupportPageSearchParams;
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

}: SupportDashboardProps) {

  const data = await fetchSupportData();
  const session = await getServerSession(authOptions);

  const unassignedTickets: TicketListItemForSupport[] = [];
  const assignedTickets: TicketListItemForSupport[] = [];

  // console.log(data.tickets);

  data.tickets.forEach((ticket) => {
    if (ticket.expand?.support?.id === session?.user.id) {
      assignedTickets.push(ticket);
    } else {
      unassignedTickets.push(ticket);
    }
  })
  return (
    <SupportDashboardGrid supportUsers={data.users} assignedTickets={assignedTickets} unassignedTickets={unassignedTickets} />
  );
}

