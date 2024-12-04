type TicketSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const TicketSearch = ({ searchQuery, setSearchQuery }: TicketSearchProps) => {
  return (
      <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 bg-black border rounded-md w-1/3"
          placeholder="Search by ticket name or status..."
      />
  );
};

export default TicketSearch;
