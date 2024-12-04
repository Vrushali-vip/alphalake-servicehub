"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import pb from "@/lib/pocketbase";
import { toast } from "@/hooks/use-toast"; 

type UpdateTicketStatusProps = {
  ticketId: string;
};

export default function UpdateTicketStatus({ ticketId }: UpdateTicketStatusProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!ticketId || !newStatus) {
      toast({ variant: "destructive", title: "Error", description: "Invalid ticket or status." });
      return;
    }

    try {
      setLoading(true);
      await pb.collection("tickets").update(ticketId, { status: newStatus });
      toast({ title: "Success", description: `Ticket status updated to ${newStatus}.` });
    } catch (error) {
      console.error("Error updating ticket status:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to update ticket status." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(value) => setStatus(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PROGRESS">PROGRESS</SelectItem>
          <SelectItem value="RESOLVED">RESOLVED</SelectItem>
          <SelectItem value="CLOSED">CLOSED</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={() => status && handleUpdateStatus(status)}
        disabled={!status || loading}
      >
        {loading ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
}
