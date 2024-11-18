"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(
    searchParams.get("status")
  );
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || ""
  );
  const [created, setCreated] = useState<string | null>(
    searchParams.get("created") || ""
  );

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (created) params.set("created", created);

    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, [status, keyword, created]);

  return (
    <div className="border rounded-lg p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Filter Tickets</h2>

      <div className="flex gap-4 items-center">
        <div className="flex flex-col w-full md:w-1/2 lg:w-1/2">
          <label className="text-md font-medium mb-1">Title:</label>
          <input
            type="text"
            className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        {/* Date Filter */}
        <div className="flex flex-col w-full md:w-1/4 lg:w-1/4">
          <label className="text-md font-medium mb-1">Ticket Date:</label>
          <input
            type="date"
            className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300"
            value={created || ""}
            onChange={(e) => {
              const selectedDate = e.target.value || null;
              setCreated(selectedDate);
              // console.log("Selected Creation Date:", selectedDate);
              console.log(searchParams.get("created"));
            }}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col w-full md:w-1/4 lg:w-1/4">
          <label className="text-md font-medium mb-1">Status:</label>
          <Select onValueChange={(value) => setStatus(value)}>
            <SelectTrigger className="w-full border border-gray-600 rounded-md p-2 bg-gray-700 text-gray-300">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Ticket Status</SelectLabel>
                <SelectItem value="OPEN">Open</SelectItem>
                <SelectItem value="PROGRESS">In Progress</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
