import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TicketSearchProps = {
  nameFilter: string;
  setNameFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  clearFilters: () => void;
};

const TicketSearch = ({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
  clearFilters,
}: TicketSearchProps) => {
  return (
    
    <div className="flex space-x-2 items-center mb-4">
      {/* Search by Ticket Name */}
      <Input
        type="text"
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
        className="flex-grow"
        placeholder="Search by ticket name..."
      />

      {/* Filter by Status */}
      <Select
        value={statusFilter}
        onValueChange={(value) => setStatusFilter(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Select status</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="PROGRESS">In Progress</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
          <SelectItem value="RESOLVED">Resolved</SelectItem>

        </SelectContent>
      </Select>
{/* 
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Customer" />
          </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Select customer</SelectItem>
        </SelectContent>
      </Select> */}

      {/* Clear Filters Button */}
      <Button
        
        onClick={clearFilters}
        className="w-[80px] text-sm"
      >
        Clear
      </Button>
    </div>
  );
};

export default TicketSearch;

// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Label } from "@/components/ui/label";
// import { DatePickerWithRange } from "@/components/ui/date-range-picker";
// import { useState } from "react";
// import { DateRange } from "react-day-picker";

// type TicketSearchProps = {
//   customers: string[];
// };

// const TicketSearch = ({ customers }: TicketSearchProps) => {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const currentNameFilter = searchParams.get('keyword') || '';
//   const currentStatusFilter = searchParams.get('status') || 'ALL';
//   const currentCustomerFilter = searchParams.get('customer') || 'ALL';
//   const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
//     const startDateParam = searchParams.get("startDate");
//     const endDateParam = searchParams.get("endDate");

//     if (startDateParam && endDateParam) {
//       return {
//         from: new Date(startDateParam),
//         to: new Date(endDateParam),
//       };
//     }
//     return undefined;
//   });

//   const updateSearchParams = (newParams: Record<string, string>) => {
//     const params = new URLSearchParams(searchParams);
    
//     Object.entries(newParams).forEach(([key, value]) => {
//       if (value === 'ALL' || value === '') {
//         params.delete(key);
//       } else {
//         params.set(key, value);
//       }
//     });

//     router.push(`?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     router.push('');
//   };

//   return (
//     <div className="flex space-x-2 items-center mb-4">
//       {/* Search by Ticket Name */}
//       <Input
//         type="text"
//         value={currentNameFilter}
//         onChange={(e) => updateSearchParams({ keyword: e.target.value })}
//         // className="flex-grow"
//         placeholder="Search by ticket name..."
//       />

//       <div className="flex flex-col flex-1">
//           <DatePickerWithRange date={dateRange} setDate={setDateRange} />
//       </div>

//       {/* Filter by Status */}
//       <Select
//         value={currentStatusFilter}
//         onValueChange={(value) => updateSearchParams({ status: value })}
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Status" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ALL">Select status</SelectItem>
//           <SelectItem value="OPEN">Open</SelectItem>
//           <SelectItem value="PROGRESS">In Progress</SelectItem>
//           <SelectItem value="CLOSED">Closed</SelectItem>
//           <SelectItem value="RESOLVED">Resolved</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Filter by Customer */}
//       <Select
//         value={currentCustomerFilter}
//         onValueChange={(value) => updateSearchParams({ customer: value })}
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Customer" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ALL">Select customer</SelectItem>
//           {customers.map((customerName) => (
//             <SelectItem key={customerName} value={customerName}>
//               {customerName}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* Clear Filters Button */}
//       <Button
//         onClick={clearFilters}
//         className="w-[80px] text-sm"
//       >
//         Clear
//       </Button>
//     </div>
//   );
// };

// export default TicketSearch;