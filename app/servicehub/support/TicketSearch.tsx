// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// type TicketSearchProps = {
//   nameFilter: string;
//   setNameFilter: (filter: string) => void;
//   statusFilter: string;
//   setStatusFilter: (filter: string) => void;
//   clearFilters: () => void;
// };

// const TicketSearch = ({
//   nameFilter,
//   setNameFilter,
//   statusFilter,
//   setStatusFilter,
//   clearFilters,
// }: TicketSearchProps) => {
//   return (

//     <div className="flex space-x-2 items-center mb-4">

//       <Input
//         type="text"
//         value={nameFilter}
//         onChange={(e) => setNameFilter(e.target.value)}
//         className="flex-grow"
//         placeholder="Search by ticket name..."
//       />


//       <Select
//         value={statusFilter}
//         onValueChange={(value) => setStatusFilter(value)}
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

//       <Select>
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder="Customer" />
//           </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ALL">Select customer</SelectItem>
//         </SelectContent>
//       </Select>

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








//working with customer name and searchparams
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";

// type TicketSearchProps = {
//   nameFilter: string;
//   setNameFilter: (filter: string) => void;
//   statusFilter: string;
//   setStatusFilter: (filter: string) => void;
//   customerFilter: string;
//   setCustomerFilter: (filter: string) => void;
//   clearFilters: () => void;
//   customers: { id: string; name: string }[];
// };

// const TicketSearch = ({
//   nameFilter,
//   setNameFilter,
//   statusFilter,
//   setStatusFilter,
//   customerFilter,
//   setCustomerFilter,
//   clearFilters,
//   customers,
// }: TicketSearchProps) => {
//   return (
//     <div className="flex space-x-2 items-center mb-4">
//       {/* Search by Ticket Name */}
//       <Input
//         type="text"
//         value={nameFilter}
//         onChange={(e) => setNameFilter(e.target.value)}
//         className="flex-grow"
//         placeholder="Search by ticket name..."
//       />

//       {/* Filter by Status */}
//       <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
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
//       <Select value={customerFilter} onValueChange={(value) => setCustomerFilter(value)}>
//         <SelectTrigger className="w-[200px]">
//           <SelectValue placeholder="Customer" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="ALL">Select customer</SelectItem>
//           {customers.map((customer) => (
//             <SelectItem key={customer.id} value={customer.id}>
//               {customer.name}
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* Clear Filters Button */}
//       <Button onClick={clearFilters} className="w-[80px] text-sm">
//         Clear
//       </Button>
//     </div>
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
  customerFilter: string;
  setCustomerFilter: (filter: string) => void;
  periodFilter: string;
  setPeriodFilter: (filter: string) => void;
  clearFilters: () => void;
  customers: { id: string; name: string }[];
};

const TicketSearch = ({
  nameFilter,
  setNameFilter,
  statusFilter,
  setStatusFilter,
  customerFilter,
  setCustomerFilter,
  periodFilter,
  setPeriodFilter,
  clearFilters,
  customers,
}: TicketSearchProps) => {
  return (
    // <div className="flex space-x-2 items-center mb-4">
    //   {/* Search by Ticket Name */}
    //   <Input
    //     type="text"
    //     value={nameFilter}
    //     onChange={(e) => setNameFilter(e.target.value)}
    //     className="flex-grow"
    //     placeholder="Search by ticket name..."
    //   />

    //   <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value)}>
    //     <SelectTrigger className="w-[250px]">
    //       <SelectValue placeholder="Period" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="ALL">Select period</SelectItem>
    //       <SelectItem value="15_days">Last 15 Days</SelectItem>
    //       <SelectItem value="30_days">Last 30 Days</SelectItem>
    //       <SelectItem value="3_months">Last 3 Months</SelectItem>
    //       <SelectItem value="6_months">Last 6 Months</SelectItem>
    //       <SelectItem value="1_year">Last Year</SelectItem>
    //     </SelectContent>
    //   </Select>

    //   {/* Filter by Status */}
    //   <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
    //     <SelectTrigger className="w-[250px]">
    //       <SelectValue placeholder="Status" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="ALL">Select status</SelectItem>
    //       <SelectItem value="OPEN">Open</SelectItem>
    //       <SelectItem value="PROGRESS">In Progress</SelectItem>
    //       <SelectItem value="CLOSED">Closed</SelectItem>
    //       <SelectItem value="RESOLVED">Resolved</SelectItem>
    //     </SelectContent>
    //   </Select>

    //   {/* Filter by Customer */}
    //   <Select value={customerFilter} onValueChange={(value) => setCustomerFilter(value)}>
    //     <SelectTrigger className="w-[280px]">
    //       <SelectValue placeholder="Customer" />
    //     </SelectTrigger>
    //     <SelectContent>
    //       <SelectItem value="ALL">Select customer</SelectItem>
    //       {customers.map((customer) => (
    //         <SelectItem key={customer.id} value={customer.id}>
    //           {customer.name}
    //         </SelectItem>
    //       ))}
    //     </SelectContent>
    //   </Select>

    //   {/* Filter by Period */}
      

    //   {/* Clear Filters Button */}
    //   <Button onClick={clearFilters} className="w-[80px] text-sm">
    //     Clear
    //   </Button>
    // </div>
    <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:space-x-2 lg:items-center mb-4">
  {/* Search by Ticket Name */}
  <div className="w-full lg:w-auto lg:flex-grow">
    <Input
      type="text"
      value={nameFilter}
      onChange={(e) => setNameFilter(e.target.value)}
      className="w-full"
      placeholder="Search by ticket name..."
    />
  </div>

  {/* Filter Row for smaller screens */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-none lg:flex lg:space-x-2 gap-4 lg:gap-0 w-full lg:w-auto">
    {/* Period Filter */}
    <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value)}>
      <SelectTrigger className="w-full lg:w-[180px]">
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Select period</SelectItem>
        <SelectItem value="15_days">Last 15 Days</SelectItem>
        <SelectItem value="30_days">Last 30 Days</SelectItem>
        <SelectItem value="3_months">Last 3 Months</SelectItem>
        <SelectItem value="6_months">Last 6 Months</SelectItem>
        <SelectItem value="1_year">Last Year</SelectItem>
      </SelectContent>
    </Select>

    {/* Status Filter */}
    <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
      <SelectTrigger className="w-full lg:w-[180px]">
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

    {/* Customer Filter */}
    <Select value={customerFilter} onValueChange={(value) => setCustomerFilter(value)}>
      <SelectTrigger className="w-full lg:w-[200px]">
        <SelectValue placeholder="Customer" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">Select customer</SelectItem>
        {customers.map((customer) => (
          <SelectItem key={customer.id} value={customer.id}>
            {customer.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {/* Clear Filters Button */}
    <Button 
      onClick={clearFilters} 
      className="w-full sm:w-auto lg:w-[80px] text-sm"
    >
      Clear
    </Button>
  </div>
</div>
  );
};

export default TicketSearch;
