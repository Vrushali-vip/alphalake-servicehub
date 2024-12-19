// "use client";

// import { TicketListItemForSupport, UserListItem } from "../types";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AssignTicketDialog from "./AssignTicketDialog";
// import { useState, useEffect } from "react";
// import TicketSearch from "./TicketSearch";

// type SupportDashboardGridProps = {
//   supportUsers: UserListItem[];
//   assignedTickets: TicketListItemForSupport[];
//   unassignedTickets: TicketListItemForSupport[];
// };

// export default function SupportDashboardGrid({
//   supportUsers,
//   assignedTickets,
//   unassignedTickets,
// }: SupportDashboardGridProps) {
// const formatDate = (date: Date) => {
//   return new Date(date).toLocaleString("en-GB", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
//   };

//   const [selectedTicketIdToAssign, setSelectedTicketIdToAssign] = useState<string | undefined>(undefined);
//   const [nameFilter, setNameFilter] = useState<string>("");
//   const [statusFilter, setStatusFilter] = useState<string>("ALL");
//   const [filteredAssignedTickets, setFilteredAssignedTickets] = useState<TicketListItemForSupport[]>(assignedTickets);
//   const [filteredUnassignedTickets, setFilteredUnassignedTickets] = useState<TicketListItemForSupport[]>(unassignedTickets);

//   function handleAssignDialogOpenChange(open: boolean) {
//     if (!open) {
//       setSelectedTicketIdToAssign(undefined);
//     }
//   }

//   const clearFilters = () => {
//     setNameFilter("");
//     setStatusFilter("ALL");
//   };

//   useEffect(() => {
//     const filterTickets = (tickets: TicketListItemForSupport[]) => {
//       return tickets.filter((ticket) => {
//         const nameMatch = ticket.title.toLowerCase().includes(nameFilter.toLowerCase());
//         const statusMatch = statusFilter === "ALL" || ticket.status === statusFilter;
//         return nameMatch && statusMatch;
//       });
//     };

//     setFilteredAssignedTickets(filterTickets(assignedTickets));
//     setFilteredUnassignedTickets(filterTickets(unassignedTickets));
//   }, [nameFilter, statusFilter, assignedTickets, unassignedTickets]);

//   return (
//     <>
//       <div className="">
//         <TicketSearch
//           nameFilter={nameFilter}
//           setNameFilter={setNameFilter}
//           statusFilter={statusFilter}
//           setStatusFilter={setStatusFilter}
//           clearFilters={clearFilters}
//         />
//       </div>

//       <Tabs defaultValue="assigned" className="w-full">
//         <div className="flex justify-center">
//           <TabsList>
//             <TabsTrigger
//               value="assigned"
//               className="px-4 py-2 bg-primary text-white rounded-md"
//             >
//               Assigned Tickets
//             </TabsTrigger>
//             <TabsTrigger
//               value="unassigned"
//               className="px-4 py-2 bg-primary text-white rounded-md"
//             >
//               Unassigned Tickets
//             </TabsTrigger>
//           </TabsList>
//         </div>

//         <TabsContent value="assigned" className="grid grid-cols-3 gap-2">
//           {filteredAssignedTickets.map((ticket) => (
//             <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
//               <div className="p-4 border rounded-lg shadow-sm">
//                 <h1 className="text-xl font-semibold">
//                   {ticket.title.split(" ").slice(0, 5).join(" ")}
//                 </h1>
//                 <p>Status: {ticket.status}</p>
//                 <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
//                 <p>Created: {formatDate(ticket.created)}</p>
//                 <div className="space-x-2">
//                   <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
//                     Assign Ticket
//                   </Button>
//                   <Link href={`/servicehub/support/${ticket.id}`}>
//                     <Button className="mt-2" size="sm">
//                       View Ticket
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </TabsContent>

//         <TabsContent value="unassigned" className="grid grid-cols-3 gap-2">
//           {filteredUnassignedTickets.map((ticket) => (
//             <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
//               <div className="p-4 border rounded-lg shadow-sm">
//                 <h1 className="text-xl font-semibold">
//                   {ticket.title.split(" ").slice(0, 5).join(" ")}
//                 </h1>
//                 <p>Status: {ticket.status}</p>
//                 <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
//                 <p>Created: {formatDate(ticket.created)}</p>
//                 <div className="space-x-2">
//                   <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
//                     Assign Ticket
//                   </Button>
//                   <Link href={`/servicehub/support/${ticket.id}`}>
//                     <Button className="mt-2" size="sm">
//                       View Ticket
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </TabsContent>
//       </Tabs>

//       <AssignTicketDialog
//         supportUsers={supportUsers}
//         ticketId={selectedTicketIdToAssign}
//         open={Boolean(selectedTicketIdToAssign)}
//         setOpen={handleAssignDialogOpenChange}
//       />
//     </>
//   );
// }


"use client";

import { TicketListItemForSupport, UserListItem } from "../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssignTicketDialog from "./AssignTicketDialog";
import { useState, useEffect } from "react";
import TicketSearch from "./TicketSearch";
import { useSearchParams, useRouter } from "next/navigation";

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
  }
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTicketIdToAssign, setSelectedTicketIdToAssign] = useState<string | undefined>(undefined);
  const [nameFilter, setNameFilter] = useState<string>(searchParams.get("name") || "");
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get("status") || "ALL");
  const [periodFilter, setPeriodFilter] = useState<string>(searchParams.get("period") || "ALL");
  const [customerFilter, setCustomerFilter] = useState<string>(searchParams.get("customer") || "ALL");
  const [filteredAssignedTickets, setFilteredAssignedTickets] = useState<TicketListItemForSupport[]>(assignedTickets);
  const [filteredUnassignedTickets, setFilteredUnassignedTickets] = useState<TicketListItemForSupport[]>(unassignedTickets);

  const allCustomers = Array.from(
    new Map(
      [
        ...assignedTickets,
        ...unassignedTickets,
      ].map((ticket) => [
        ticket.expand?.customer?.id || "unknown",
        { id: ticket.expand?.customer?.id || "unknown", name: ticket.expand?.customer?.name || "Unknown" },
      ])
    ).values()
  );

  function handleAssignDialogOpenChange(open: boolean) {
    if (!open) {
      setSelectedTicketIdToAssign(undefined);
    }
  }

  const clearFilters = () => {
    setNameFilter("");
    setStatusFilter("ALL");
    setCustomerFilter("ALL");
    setPeriodFilter("ALL");
    updateURLParams({ name: "", status: "ALL", customer: "ALL", period: "ALL" });
  };

  const updateURLParams = (params: { name: string; status: string; customer: string; period: string }) => {
    const query = new URLSearchParams();
    if (params.name) query.set("name", params.name);
    if (params.status && params.status !== "ALL") query.set("status", params.status);
    if (params.customer && params.customer !== "ALL") query.set("customer", params.customer);
    if (params.period && params.period !== "ALL") query.set("period", params.period);
    router.push(`?${query.toString()}`);
  };

  const filterByPeriod = (ticketDate: string | Date) => {
    if (periodFilter === "ALL") return true;

    const currentDate = new Date();
    const ticketCreatedDate = new Date(ticketDate);

    const currentTimestamp = currentDate.getTime();
    const ticketTimestamp = ticketCreatedDate.getTime();

    switch (periodFilter) {
      case "15_days":
        return currentTimestamp - ticketTimestamp <= 15 * 24 * 60 * 60 * 1000; 
      case "30_days":
        return currentTimestamp - ticketTimestamp <= 30 * 24 * 60 * 60 * 1000; 
      case "3_months":
        return currentTimestamp - ticketTimestamp <= 90 * 24 * 60 * 60 * 1000; 
      case "6_months":
        return currentTimestamp - ticketTimestamp <= 180 * 24 * 60 * 60 * 1000; 
      case "1_year":
        return currentTimestamp - ticketTimestamp <= 365 * 24 * 60 * 60 * 1000; 
      default:
        return true;
    }
  };

  useEffect(() => {
    const filterTickets = (tickets: TicketListItemForSupport[]) => {
      return tickets.filter((ticket) => {
        const nameMatch = ticket.title.toLowerCase().includes(nameFilter.toLowerCase());
        const statusMatch = statusFilter === "ALL" || ticket.status === statusFilter;
        const customerMatch =
          customerFilter === "ALL" || ticket.expand?.customer?.id === customerFilter;
        const periodMatch = filterByPeriod(ticket.created);
        return nameMatch && statusMatch && customerMatch && periodMatch;
      });
    };

    setFilteredAssignedTickets(filterTickets(assignedTickets));
    setFilteredUnassignedTickets(filterTickets(unassignedTickets));
  }, [nameFilter, statusFilter, customerFilter, periodFilter, assignedTickets, unassignedTickets]);

  useEffect(() => {
    updateURLParams({ name: nameFilter, status: statusFilter, customer: customerFilter, period: periodFilter });
  }, [nameFilter, statusFilter, customerFilter, periodFilter]);

  return (
    // <>
    //   <div>
    //     <TicketSearch
    //       nameFilter={nameFilter}
    //       setNameFilter={setNameFilter}
    //       statusFilter={statusFilter}
    //       setStatusFilter={setStatusFilter}
    //       customerFilter={customerFilter}
    //       setCustomerFilter={setCustomerFilter}
    //       periodFilter={periodFilter}
    //       setPeriodFilter={setPeriodFilter}
    //       clearFilters={clearFilters}
    //       customers={allCustomers}
    //     />
    //   </div>

    //   <Tabs defaultValue="assigned" className="w-full">
    //     <div className="flex justify-center">
    //       <TabsList>
    //         <TabsTrigger
    //           value="assigned"
    //           className="px-4 py-2 bg-primary text-white rounded-md"
    //         >
    //           Assigned Tickets
    //         </TabsTrigger>
    //         <TabsTrigger
    //           value="unassigned"
    //           className="px-4 py-2 bg-primary text-white rounded-md"
    //         >
    //           Unassigned Tickets
    //         </TabsTrigger>
    //       </TabsList>
    //     </div>

    //     <TabsContent value="assigned" className="grid grid-cols-3 gap-2">
    //       {filteredAssignedTickets.map((ticket) => (
    //         <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
    //           <div className="p-4 border rounded-lg shadow-sm">
    //             <h1 className="text-xl font-semibold">
    //               {ticket.title.split(" ").slice(0, 5).join(" ")}
    //             </h1>
    //             <p>Status: {ticket.status}</p>
    //             <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
    //             <p>Created: {formatDate(ticket.created)}</p>
    //             <div className="space-x-2">
    //               <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
    //                 Assign Ticket
    //               </Button>
    //               <Link href={`/servicehub/support/${ticket.id}`}>
    //                 <Button className="mt-2" size="sm">
    //                   View Ticket
    //                 </Button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </TabsContent>

    //     <TabsContent value="unassigned" className="grid grid-cols-3 gap-2">
    //       {filteredUnassignedTickets.map((ticket) => (
    //         <div key={ticket.id} className="hover:shadow-lg transition-shadow relative">
    //           <div className="p-4 border rounded-lg shadow-sm">
    //             <h1 className="text-xl font-semibold">
    //               {ticket.title.split(" ").slice(0, 5).join(" ")}
    //             </h1>
    //             <p>Status: {ticket.status}</p>
    //             <p>Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
    //             <p>Created: {formatDate(ticket.created)}</p>
    //             <div className="space-x-2">
    //               <Button onClick={() => setSelectedTicketIdToAssign(ticket.id)} variant="outline" size="sm">
    //                 Assign Ticket
    //               </Button>
    //               <Link href={`/servicehub/support/${ticket.id}`}>
    //                 <Button className="mt-2" size="sm">
    //                   View Ticket
    //                 </Button>
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </TabsContent>
    //   </Tabs>

    //   <AssignTicketDialog
    //     supportUsers={supportUsers}
    //     ticketId={selectedTicketIdToAssign}
    //     open={Boolean(selectedTicketIdToAssign)}
    //     setOpen={handleAssignDialogOpenChange}
    //   />
    // </>
    <>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-6">
          <TicketSearch
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            customerFilter={customerFilter}
            setCustomerFilter={setCustomerFilter}
            periodFilter={periodFilter}
            setPeriodFilter={setPeriodFilter}
            clearFilters={clearFilters}
            customers={allCustomers}
          />
        </div>

        <Tabs defaultValue="assigned" className="w-full">
          <div className="flex justify-center mb-6">
            <TabsList className="space-x-2">
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

          <TabsContent
            value="assigned"
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredAssignedTickets.map((ticket) => (
              <div key={ticket.id} className="hover:shadow-lg transition-shadow">
                <div className="p-4 border rounded-lg shadow-sm h-full">
                  <h1 className="text-lg md:text-xl font-semibold mb-3 line-clamp-2">
                    {ticket.title.split(" ").slice(0, 3).join(" ")}
                  </h1>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">Status: {ticket.status}</p>
                    <p className="text-sm">Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                    <p className="text-sm">Created: {formatDate(ticket.created)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                    <Button
                      onClick={() => setSelectedTicketIdToAssign(ticket.id)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto flex-1 sm:flex-initial min-w-[120px] justify-center"
                    >
                      Assign Ticket
                    </Button>
                    <Link
                      href={`/servicehub/support/${ticket.id}`}
                      className="w-full sm:w-auto flex-1 sm:flex-initial"
                    >
                      <Button
                        className="w-full min-w-[120px] justify-center"
                        size="sm"
                      >
                        View Ticket
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent
            value="unassigned"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredUnassignedTickets.map((ticket) => (
              <div key={ticket.id} className="hover:shadow-lg transition-shadow">
                <div className="p-4 border rounded-lg shadow-sm h-full">
                  <h1 className="text-lg md:text-xl font-semibold mb-3 line-clamp-2">
                    {ticket.title.split(" ").slice(0, 5).join(" ")}
                  </h1>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm">Status: {ticket.status}</p>
                    <p className="text-sm">Customer: {ticket.expand?.customer?.name || "Unknown"}</p>
                    <p className="text-sm">Created: {formatDate(ticket.created)}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => setSelectedTicketIdToAssign(ticket.id)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      Assign Ticket
                    </Button>
                    <Link href={`/servicehub/support/${ticket.id}`} className="w-full sm:w-auto">
                      <Button className="w-full" size="sm">
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
      </div>
    </>
  );
}
