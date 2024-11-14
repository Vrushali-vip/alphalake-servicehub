import pb, { getImageUrl } from "@/lib/pocketbase";
import { Ticket, TicketComment } from "../types";
import FullScreenImage from "@/components/custom/FullScreenImage";
import { Suspense, useState, useEffect } from "react";
import { Clock } from "lucide-react";
import GoBack from "@/components/custom/GoBack";
import CommentForm from "../[ticketId]/CommentForm";

export default function AdminTicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [comments, setComments] = useState<TicketComment[]>([]);

    const [users, setUsers] = useState<{ id: string; name: string }[]>([]); // List of users for filtering
    const statuses = ["Open", "In Progress", "Closed"]; // Ticket statuses

    useEffect(() => {
        const fetchTickets = async () => {
            const ticketsData = await pb.collection("tickets").getFullList<Ticket>({
                expand: "customer",
                fields: "id,title,status,description,created,attachments,expand,customer.id,customer.name",
                sort: "-created"
            });
            setTickets(ticketsData);
            setFilteredTickets(ticketsData);
        };
        
        const fetchUsers = async () => {
            const usersData = await pb.collection("users").getFullList<{ id: string; name: string }>({
                fields: "id,name"
            });
            setUsers(usersData);
        };

        fetchTickets();
        fetchUsers();
    }, []);

    const fetchComments = async (ticketId: string) => {
        const commentsData = await pb.collection("ticket_comments").getFullList<TicketComment>({
            filter: `ticket.id="${ticketId}"`,
            expand: "user",
            fields: "id,ticket,user,content,created,attachments,expand,user.id,user.name",
            sort: "-created"
        });
        setComments(commentsData);
    };

    const handleTicketSelect = async (ticket: Ticket) => {
        setSelectedTicket(ticket);
        await fetchComments(ticket.id);
    };

    const handleSearch = (filters: {
        ticketId?: string;
        userId?: string;
        date?: string;
        status?: string;
    }) => {
        const { ticketId, userId, date, status } = filters;
        
        const filtered = tickets.filter(ticket => {
            const matchesTicketId = ticketId ? ticket.id.includes(ticketId) : true;
            const matchesUser = userId ? ticket.expand.customer?.id === userId : true;
            const matchesDate = date ? new Date(ticket.created).toLocaleDateString() === new Date(date).toLocaleDateString() : true;
            const matchesStatus = status ? ticket.status === status : true;
            
            return matchesTicketId && matchesUser && matchesDate && matchesStatus;
        });
        
        setFilteredTickets(filtered);
    };

    return (
        <main className="min-h-screen p-4 lg:px-8">
            <div className="flex gap-2 mb-6">
                <GoBack />
                <h1 className="text-2xl font-bold">Admin - Ticket Management</h1>
            </div>
            
            {/* Search & Filter Section */}
            <div className="mb-6">
                <TicketSearchFilter onSearch={handleSearch} users={users} statuses={statuses} />
            </div>
            
            {/* Ticket List Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Tickets</h2>
                    {filteredTickets.map(ticket => (
                        <div
                            key={ticket.id}
                            className="border p-4 rounded-md cursor-pointer hover:bg-gray-100"
                            onClick={() => handleTicketSelect(ticket)}
                        >
                            <h3 className="text-lg font-medium">{ticket.title}</h3>
                            <p className="text-sm text-muted-foreground">
                                {new Date(ticket.created).toLocaleString()} - Status: <span className={`status-${ticket.status}`}>{ticket.status}</span>
                            </p>
                        </div>
                    ))}
                </div>

                {/* Ticket Details Section */}
                {selectedTicket && (
                    <div className="md:col-span-2 border p-4 rounded-md">
                        <h2 className="text-xl font-semibold">Ticket Details</h2>
                        <div className="mt-4">
                            <div className="flex justify-between border-b pb-2 mb-2">
                                <span className="text-sm flex items-center">
                                    <Clock size={18} className="mr-2" /> {new Date(selectedTicket.created).toLocaleString()}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-md status-${selectedTicket.status}`}>{selectedTicket.status}</span>
                            </div>
                            <h3 className="text-xl font-medium">{selectedTicket.title}</h3>
                            <p>{selectedTicket.description}</p>
                            
                            {/* Attachments for Ticket */}
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3 mt-4">
                                <Suspense>
                                    {selectedTicket.attachments.map((a) => (
                                        <FullScreenImage key={a} src={getImageUrl("tickets", selectedTicket.id, a)} />
                                    ))}
                                </Suspense>
                            </div>

                            {/* Comments Section */}
                            <div className="pt-4 mt-4 border-t space-y-4">
                                <div className="flex justify-between items-center">
                                    <h5>Comments ({comments.length})</h5>
                                    <Suspense>
                                        <CommentForm ticketId={selectedTicket.id} />
                                    </Suspense>
                                </div>
                                {comments.map(c => (
                                    <div key={c.id} className="border p-2 space-y-2">
                                        <p className="text-xs text-muted-foreground">{c.expand.user.name} | {new Date(c.created).toLocaleString()}</p>
                                        <p>{c.content}</p>
                                        
                                        {/* Attachments for Comments */}
                                        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
                                            <Suspense>
                                                {c.attachments.map((a) => (
                                                    <FullScreenImage key={a} src={getImageUrl("ticket_comments", c.id, a)} />
                                                ))}
                                            </Suspense>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
