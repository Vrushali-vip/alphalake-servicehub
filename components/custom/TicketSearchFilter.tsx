"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export default function TicketSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(searchParams.get("status"));
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "");
  const [creationDate, setCreationDate] = useState<Date | null>(searchParams.get("creationDate") ? new Date(searchParams.get("creationDate")!) : null);

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (creationDate) params.set("creationDate", creationDate.toISOString().split("T")[0]);
    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, [status, keyword, creationDate]);

  return (
    <div className="border rounded-lg p-6 text-white bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Filter Tickets</h2>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 items-center">
        
        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-md font-medium mb-1">Status:</label>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-300">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ticket Status</SelectLabel>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Creation Date Filter */}
        <div className="flex flex-col">
          <label className="text-md font-medium mb-1">Creation Date:</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-300"
              onChange={(e) => setCreationDate(e.target.value ? new Date(e.target.value) : null)}
            />
            <CalendarIcon className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Ticket Name Filter */}
        <div className="flex flex-col">
          <label className="text-md font-medium mb-1">Ticket Name:</label>
          <input
            type="text"
            className="w-full border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-300"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title or description"
          />
        </div>
      </div>
    </div>
  );
}
