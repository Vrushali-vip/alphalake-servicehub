// // import { getServerSession } from "next-auth";
// // import TicketSearchFilter from "@/components/custom/TicketSearchFilter";
// // import TicketForm from "./TicketForm";
// // import TicketGrid from "./TicketGrid";
// // import TicketSkeleton from "@/components/custom/TicketSkeleton";
// // import authOptions from "../api/auth/[...nextauth]/authOptions";
// // import { Suspense } from "react";

// // export type Filters = {
// //   status?: string;
// //   keyword?: string;
// //   created?: string;
// // };

// // export default async function ServiceHub({
// //   searchParams,
// // }: {
// //   searchParams: Filters;
// // }) {
// //   const session = await getServerSession(authOptions);

// //   return (
// //     <main className="min-h-screen">
// //       <div className="p-4 lg:px-8">
// //         <h1 className="text-xl font-bold">
// //           Service Hub for {session?.user.sub}
// //         </h1>
// //       </div>
// //       <div className="p-4 lg:px-8 flex justify-between items-center">
// //         <Suspense>
// //           <TicketForm />
// //         </Suspense>
// //       </div>

// //       <Suspense fallback={<div>Loading Filter...</div>}>
// //         <TicketSearchFilter />
// //       </Suspense>

// //       <div className="p-4 lg:px-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
// //         <Suspense fallback={<TicketSkeleton />}>
// //           <TicketGrid searchParams={searchParams} userId={session?.user?.id} />
// //         </Suspense>
// //       </div>
// //     </main>
// //   );
// // }


// import { getServerSession } from "next-auth";
// import TicketSearchFilter from "@/components/custom/TicketSearchFilter";
// import TicketForm from "./TicketForm";
// import TicketGrid from "./TicketGrid";
// import TicketSkeleton from "@/components/custom/TicketSkeleton";
// import authOptions from "../api/auth/[...nextauth]/authOptions";
// import { Suspense } from "react";

// export type Filters = {
//   status?: string;
//   keyword?: string;
//   startDate?: string;
//   endDate?: string;
// };

// export default async function ServiceHub({
//   searchParams,
// }: {
//   searchParams: Filters;
// }) {
//   const session = await getServerSession(authOptions);

//   return (
//     <main className="min-h-screen">
//       <div className="p-4 lg:px-8">
//         <h1 className="text-xl font-bold">
//           Service Hub for {session?.user.sub}
//         </h1>
//       </div>
//       <div className="p-4 lg:px-8 flex justify-between items-center">
//         <Suspense>
//           <TicketForm />
//         </Suspense>
//       </div>

//       <Suspense fallback={<div>Loading Filter...</div>}>
//         <TicketSearchFilter />
//       </Suspense>

//       <div className="p-4 lg:px-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         <Suspense fallback={<TicketSkeleton />}>
//           <TicketGrid searchParams={searchParams} userId={session?.user?.id} />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

import { getServerSession } from "next-auth";
import TicketSearchFilter from "@/components/custom/TicketSearchFilter";
import TicketForm from "./TicketForm";
import TicketGrid from "./TicketGrid";
import TicketSkeleton from "@/components/custom/TicketSkeleton";
import authOptions from "../api/auth/[...nextauth]/authOptions";
import { Suspense } from "react";

export type Filters = {
  status?: string;
  keyword?: string;
  startDate?: string;
  endDate?: string;
  created?: string;
};

export default async function ServiceHub({
  searchParams,
}: {
  searchParams: Filters;
}) {
  const session = await getServerSession(authOptions);
  return (
    // <main className="min-h-screen">
    //   <div className="p-4 lg:px-8">
    //     <h1 className="text-xl font-bold">
    //       Service Hub for {session?.user.sub}
    //     </h1>
    //   </div>
    //   <div className="p-4 lg:px-8 flex justify-between items-center">
    //     <Suspense>
    //       <TicketForm />
    //     </Suspense>
    //   </div>

    //   <Suspense fallback={<div>Loading Filter...</div>}>
    //     <TicketSearchFilter />
    //   </Suspense>

    //   <div className="p-4 lg:px-8 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    //     <Suspense fallback={<TicketSkeleton />}>
    //       <TicketGrid searchParams={searchParams} userId={session?.user?.id} />
    //     </Suspense>
    //   </div>
    // </main>
    <main className="min-h-screen flex justify-center ">
  <div className="w-full max-w-5xl p-4 lg:px-8"> 
    <h1 className="text-xl font-bold mb-6">
      Service Hub for {session?.user.sub}
    </h1>

    <div className=" flex justify-between items-center mb-2">
      <Suspense>
        <TicketForm />
      </Suspense>
    </div>

    <Suspense fallback={<div>Loading Filter...</div>}>
      <TicketSearchFilter />
    </Suspense>

    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Suspense fallback={<TicketSkeleton />}>
        <TicketGrid searchParams={searchParams} userId={session?.user?.id} />
      </Suspense>
    </div>
  </div>
</main>

  );
}
