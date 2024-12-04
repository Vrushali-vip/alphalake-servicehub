"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import pb from "@/lib/pocketbase";
import { useRouter } from 'next/navigation';

export function MarkResolvedButton({ 
  ticketId, 
  currentStatus 
}: { 
  ticketId: string, 
  currentStatus: string 
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMarkResolved = async () => {
    try {
      setIsLoading(true);
      
      await pb.collection("tickets").update(ticketId, { 
        status: "RESOLVED"
      });
      
      setStatus("RESOLVED");
      router.refresh();
    } catch (error) {
      console.error("Failed to mark ticket as resolved:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleMarkResolved} 
      disabled={isLoading || status === "RESOLVED"}
    >
      {isLoading ? "Updating..." : 
       status === "RESOLVED" ? "Marked ticket as Resolved" : 
       "Mark ticket as resolved"}
    </Button>
  );
}