// "use client";

// import { TicketListItemForSupport, UserListItem } from "../types";
// import { Button } from "@/components/ui/button";
// import Link from 'next/link';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AssignTicketDialog from "./AssignTicketDialog";
// import { useState, useEffect } from "react";
// import TicketSearch from "./TicketSearch";

// type SupportDashboardGridProps = {
//     supportUsers: UserListItem[];
//     assignedTickets: TicketListItemForSupport[];
//     unassignedTickets: TicketListItemForSupport[];
// };

// export default function SupportDashboardGrid({ supportUsers, assignedTickets, unassignedTickets }: SupportDashboardGridProps) {

//     const formatDate = (date: Date) => {
//         return new Date(date).toLocaleString("en-GB", {
//             day: "2-digit",
//             month: "2-digit",
//             year: "numeric",
//             hour: "2-digit",
//             minute: "2-digit",
//             hour12: true,
//         });
//     };

//     const [selectedTicketIdToAssign, setSelectedTicketIdToAssign] = useState<string | undefined>(undefined);
//     const [searchQuery, setSearchQuery] = useState<string>("");
//     const [filteredAssignedTickets, setFilteredAssignedTickets] = useState<TicketListItemForSupport[]>(assignedTickets);
//     const [filteredUnassignedTickets, setFilteredUnassignedTickets] = useState<TicketListItemForSupport[]>(unassignedTickets);

//     function handleAssignDialogOpenChange(open: boolean) {
//         if (!open) {
//             setSelectedTicketIdToAssign(undefined);
//         }
//     }

//     useEffect(() => {
//         const filterTickets = (tickets: TicketListItemForSupport[]) => {
//             return tickets.filter(ticket => {
//                 const nameMatch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
//                 const statusMatch = ticket.status.toLowerCase().includes(searchQuery.toLowerCase());
//                 return nameMatch || statusMatch;
//             });
//         };

//         setFilteredAssignedTickets(filterTickets(assignedTickets));
//         setFilteredUnassignedTickets(filterTickets(unassignedTickets));
//     }, [searchQuery, assignedTickets, unassignedTickets]);

//     return (
//         <>
//             <div className="flex justify-between mb-4">
//                 <TicketSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
//             </div>

//             <Tabs defaultValue="assigned" className="w-full">
//                 <div className="flex justify-center">
//                     <TabsList>
//                         <TabsTrigger
//                             value="assigned"
//                             className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
//                         >
//                             Assigned Tickets
//                         </TabsTrigger>
//                         <TabsTrigger
//                             value="unassigned"
//                             className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600"
//                         >
//                             Unassigned Tickets
//                         </TabsTrigger>
//                     </TabsList>
//                 </div>

//                 <TabsContent value="assigned" className="grid grid-cols-3 gap-2">
//                     {
//                         filteredAssignedTickets.map((ticket) => (
//                             <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
//                                 <div className="p-4 border rounded-lg shadow-sm">
//                                     <h1 className="text-xl font-semibold">{ticket.title.split(" ").slice(0, 5).join(" ")}</h1>
//                                     <p>Status: {ticket.status}</p>
//                                     <p>Customer: {ticket.expand.customer?.name || "Unknown"}</p>
//                                     <p>Created: {formatDate(ticket.created)}</p>
//                                     <div className="space-x-2">
//                                         <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm" >Assign Ticket</Button>
//                                         <Link href={`/servicehub/support/${ticket.id}`}>
//                                             <Button className="mt-2" size="sm">View Ticket</Button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </TabsContent>

//                 <TabsContent value="unassigned" className="grid grid-cols-3 gap-2">
//                     {
//                         filteredUnassignedTickets.map((ticket) => (
//                             <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
//                                 <div className="p-4 border rounded-lg shadow-sm">
//                                     <h1 className="text-xl font-semibold">{ticket.title.split(" ").slice(0, 5).join(" ")}</h1>
//                                     <p>Status: {ticket.status}</p>
//                                     <p>Customer: {ticket.expand.customer?.name || "Unknown"}</p>
//                                     <p>Created: {formatDate(ticket.created)}</p>
//                                     <div className="space-x-2">
//                                         <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm" >Assign Ticket</Button>
//                                         <Link href={`/servicehub/support/${ticket.id}`}>
//                                             <Button className="mt-2" size="sm">View Ticket</Button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     }
//                 </TabsContent>
//             </Tabs>

//             <AssignTicketDialog supportUsers={supportUsers} ticketId={selectedTicketIdToAssign} open={Boolean(selectedTicketIdToAssign)} setOpen={handleAssignDialogOpenChange} />
//         </>
//     );
// }

"use client";

import { TicketListItemForSupport, UserListItem } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignTicketDialog from "./AssignTicketDialog";
import { useState, useEffect } from "react";
import TicketSearch from "./TicketSearch";

type SupportDashboardGridProps = {
  supportUsers: UserListItem[];
  assignedTickets: TicketListItemForSupport[];
  unassignedTickets: TicketListItemForSupport[];
};

export default function SupportDashboardGrid({
  supportUsers,
  assignedTickets,
  unassignedTickets,
}: SupportDashboardGridProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [selectedTicketIdToAssign, setSelectedTicketIdToAssign] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [filteredAssignedTickets, setFilteredAssignedTickets] = useState<TicketListItemForSupport[]>(assignedTickets);
  const [filteredUnassignedTickets, setFilteredUnassignedTickets] = useState<TicketListItemForSupport[]>(unassignedTickets);

  function handleAssignDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedTicketIdToAssign(undefined);
    }
  }

  const clearFilters = () => {
    setNameFilter("");
    setStatusFilter("ALL");
  };

  useEffect(() => {
    const filterTickets = (tickets: TicketListItemForSupport[]) => {
      return tickets.filter((ticket) => {
        const nameMatch = ticket.title.toLowerCase().includes(nameFilter.toLowerCase());
        const statusMatch = statusFilter === "ALL" || ticket.status === statusFilter;
        return nameMatch && statusMatch;
      });
    };

    setFilteredAssignedTickets(filterTickets(assignedTickets));
    setFilteredUnassignedTickets(filterTickets(unassignedTickets));
  }, [nameFilter, statusFilter, assignedTickets, unassignedTickets]);

  return (
    <>
      <div className="">
        <TicketSearch
          nameFilter={nameFilter}
          setNameFilter={setNameFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          clearFilters={clearFilters}
        />
      </div>

      <Tabs defaultValue="assigned" className="w-full">
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger
              value="assigned"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Assigned Tickets
            </TabsTrigger>
            <TabsTrigger
              value="unassigned"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              Unassigned Tickets
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="assigned" className="grid grid-cols-3 gap-2">
          {filteredAssignedTickets.map((ticket) => (
            <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
              <div className="p-4 border rounded-lg shadow-sm">
                <h1 className="text-xl font-semibold">
                  {ticket.title.split(" ").slice(0, 5).join(" ")}
                </h1>
                <p>Status: {ticket.status}</p>
                <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                <p>Created: {formatDate(ticket.created)}</p>
                <div className="space-x-2">
                  <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
                    Assign Ticket
                  </Button>
                  <Link href={`/servicehub/support/${ticket.id}`}>
                    <Button className="mt-2" size="sm">
                      View Ticket
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="unassigned" className="grid grid-cols-3 gap-2">
          {filteredUnassignedTickets.map((ticket) => (
            <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
              <div className="p-4 border rounded-lg shadow-sm">
                <h1 className="text-xl font-semibold">
                  {ticket.title.split(" ").slice(0, 5).join(" ")}
                </h1>
                <p>Status: {ticket.status}</p>
                <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                <p>Created: {formatDate(ticket.created)}</p>
                <div className="space-x-2">
                  <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
                    Assign Ticket
                  </Button>
                  <Link href={`/servicehub/support/${ticket.id}`}>
                    <Button className="mt-2" size="sm">
                      View Ticket
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <AssignTicketDialog
        supportUsers={supportUsers}
        ticketId={selectedTicketIdToAssign}
        open={Boolean(selectedTicketIdToAssign)}
        setOpen={handleAssignDialogOpenChange}
      />
    </>
  );
}
