import { Input } from "@/components/ui/input";

type TicketSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const TicketSearch = ({ searchQuery, setSearchQuery }: TicketSearchProps) => {
  return (
      <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-1/3"
          placeholder="Search by ticket name or status..."
      />
  );
};

export default TicketSearch;
