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
  const [dateRange, setDateRange] = useState<{
    startDate: string | null,
    endDate: string | null
  }>({
    startDate: searchParams.get("startDate") || null,
    endDate: searchParams.get("endDate") || null
  });

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (dateRange.startDate) params.set("startDate", dateRange.startDate);
    if (dateRange.endDate) params.set("endDate", dateRange.endDate);

    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, );

  const clearFilters = () => {
    setStatus(null);
    setKeyword("");
    setDateRange({ startDate: null, endDate: null });
    router.push('/servicehub');
  };

  const hasActiveFilters = status || keyword || dateRange.startDate || dateRange.endDate;

  return (
    <div className="rounded-lg p-6 text-white">
      {/* Header: Filter Tickets and Clear Filters Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filter Tickets</h2>
        {hasActiveFilters && (
          <Button
            
            onClick={clearFilters}
            className="text-white border-gray-600 hover:bg-gray-700"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-3">
        {/* Title Filter */}
        <div className="flex flex-col" style={{ flex: "0 0 50%" }}>
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
        <div className="flex flex-col flex-1">
          <Label className="text-md font-medium mb-1">Start Date</Label>
          <Input
            type="date"
            className="w-full border border-gray-600 rounded-md p-2 text-white"
            value={dateRange.startDate || ""}
            onChange={(e) => {
              const selectedDate = e.target.value || null;
              setDateRange((prev) => ({ ...prev, startDate: selectedDate }));
            }}
          />
        </div>

        {/* End Date Filter */}
        <div className="flex flex-col flex-1">
          <Label className="text-md font-medium mb-1">End Date</Label>
          <Input
            type="date"
            className="w-full border border-gray-600 rounded-md p-2 text-white"
            value={dateRange.endDate || ""}
            onChange={(e) => {
              const selectedDate = e.target.value || null;
              setDateRange((prev) => ({ ...prev, endDate: selectedDate }));
            }}
          />
        </div>

        {/* Status Filter */}
        <div className="flex flex-col flex-1">
          <Label className="text-md font-medium mb-1">Status</Label>
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
                <SelectItem value="RESOLVED">Resolved</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>

  );
}