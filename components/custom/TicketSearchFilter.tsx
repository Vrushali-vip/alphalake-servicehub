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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function TicketSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(
    searchParams.get("status")
  );
  const [keyword, setKeyword] = useState<string>(
    searchParams.get("keyword") || ""
  );
  const [startDate, setStartDate] = useState<string | null>(
    searchParams.get("startDate") || ""
  );
  const [endDate, setEndDate] = useState<string | null>(
    searchParams.get("endDate") || ""
  );

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, [status, keyword, startDate, endDate]);

  const clearFilters = () => {
    setStatus(null);
    setKeyword("");
    setStartDate(null);
    setEndDate(null);
    router.push('/servicehub');
  };

  const hasActiveFilters = status || keyword || startDate || endDate;

  return (
    <div className="rounded-lg p-6 text-white">
      <h2 className="text-lg font-semibold mb-4">Filter Tickets</h2>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Keyword Filter */}
        <div className={`flex flex-col ${hasActiveFilters ? 'flex-[0.8]' : 'flex-1'}`}>
          <Label className="text-md font-medium mb-1">Title</Label>
          <Input
            type="text"
            className="w-full border border-gray-600 rounded-md p-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        {/* Start Date Filter */}
        <div className="flex flex-col w-40">
          <Label className="text-md font-medium mb-1">Start Date</Label>
          <Input
            type="date"
            className="w-full border border-gray-600 rounded-md p-2"
            value={startDate || ""}
            onChange={(e) => {
              const selectedDate = e.target.value || null;
              setStartDate(selectedDate);
            }}
          />
        </div>

        {/* End Date Filter */}
        <div className="flex flex-col w-40">
          <Label className="text-md font-medium mb-1">End Date</Label>
          <Input
            type="date"
            className="w-full border border-gray-600 rounded-md p-2 "
            value={endDate || ""}
            onChange={(e) => {
              const selectedDate = e.target.value || null;
              setEndDate(selectedDate);
            }}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col w-40">
          <Label className="text-md font-medium mb-1">Status</Label>
          <div className="flex items-center gap-2">
            <Select 
              value={status || undefined} 
              onValueChange={(value) => setStatus(value)}
            >
              <SelectTrigger className="w-full border border-gray-600 rounded-md p-2">
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
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                // size="lg"
                onClick={clearFilters}
                className="text-white border-gray-600 hover:bg-gray-700"
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}