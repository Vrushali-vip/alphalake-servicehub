// import { Input } from "@/components/ui/input";

// type TicketSearchProps = {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
// };

// const TicketSearch = ({ searchQuery, setSearchQuery }: TicketSearchProps) => {
//   return (
//       <Input
//           type="text"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="p-2 border rounded-md w-1/3"
//           placeholder="Search by ticket name or status..."
//       />
//   );
// };

// export default TicketSearch;

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
