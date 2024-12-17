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
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

export default function TicketSearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<string | null>(searchParams.get("status"));
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    if (startDateParam && endDateParam) {
      return {
        from: new Date(startDateParam),
        to: new Date(endDateParam),
      };
    }
    return undefined;
  });

  const debouncedUpdateQuery = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (keyword) params.set("keyword", keyword);
    if (dateRange?.from) {
      params.set("startDate", format(dateRange.from, "yyyy-MM-dd"));
    }
    if (dateRange?.to) {
      params.set("endDate", format(dateRange.to, "yyyy-MM-dd"));
    }

    router.push(`/servicehub?${params.toString()}`);
  }, 300);

  useEffect(() => {
    debouncedUpdateQuery();
  }, [status, keyword, dateRange, debouncedUpdateQuery]);

  const clearFilters = () => {
    setStatus(null);
    setKeyword("");
    setDateRange(undefined);
    router.push("/servicehub");
  };

  const hasActiveFilters = status || keyword || dateRange?.from || dateRange?.to;

  return (
    <div className="rounded-lg p-6 text-white">
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

      <div className="flex items-center gap-3">
        <div className="flex flex-col" style={{ flex: "0 0 50%" }}>
          <Label className="text-md font-medium mb-1">Title</Label>
          <Input
            type="text"
            className="w-full border rounded-md p-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title"
          />
        </div>

        <div className="flex flex-col flex-1">
          <Label className="text-md font-medium mb-1">Date Range</Label>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>

        <div className="flex flex-col flex-1">
          <Label className="text-md font-medium mb-1">Status</Label>
          <Select
            value={status || undefined}
            onValueChange={(value) => setStatus(value)}
          >
            <SelectTrigger className="w-full border rounded-md p-2 text-gray-400">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel></SelectLabel>
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