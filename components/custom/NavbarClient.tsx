// "use client";
// import { Button } from "../ui/button";
// import { UserCircle } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { signOut, useSession } from "next-auth/react"
// import { useToast } from "@/hooks/use-toast";

// export default function NavbarClient() {

//     const session = useSession();
//     const { toast } = useToast();
//     function onLogOutClick() {
//         signOut();
//         toast({
//             title: "Logged out",
//             description: "You have been logged out."
//         })
//     }

//     return (
//             session?.data?.user ? (
//                 <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                         <Button size="sm" >
//                              <UserCircle size={18} />
//                         </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent>
//                         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem disabled>Profile</DropdownMenuItem>
//                         <DropdownMenuItem asChild>
//                             <button className="w-full cursor-pointer" onClick={onLogOutClick}>Log Out</button>
//                         </DropdownMenuItem>
//                     </DropdownMenuContent>
//                 </DropdownMenu>

//             ) :
//                 <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
//                     Book A Demo
//                 </Button>
//     )
// }


// "use client";
// import { Button } from "../ui/button";
// import { UserCircle, ChevronDown } from "lucide-react";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { signOut, useSession } from "next-auth/react";
// import { useToast } from "@/hooks/use-toast";
// import Image from "next/image";
// import React, { useState } from "react";
// import Link from "next/link";

// interface Country {
//     code: string;
//     name: string;
//     flag: string;
// }

// const countries: Country[] = [
//     { code: "ind", name: "INDIA", flag: "/ind_flag.png" },
//     { code: "uk", name: "UK", flag: "/uk_flag.jpg" },
// ];

// export default function NavbarClient() {
//     const session = useSession();
//     const { toast } = useToast();

//     const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]); 

//     const handleCountrySelect = (country: Country) => {
//         setSelectedCountry(country); 
//     };

//     const onLogOutClick = () => {
//         signOut();
//         toast({
//             title: "Logged out",
//             description: "You have been logged out.",
//         });
//     };

//     return (
//         <div className="flex items-center gap-2">
//             <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                     <Button variant="outline" size="sm" className="flex items-center bg-background  text-primary border-none">
//                         <Image
//                             src={selectedCountry.flag}
//                             alt={selectedCountry.name}
//                             width={24}
//                             height={24}
//                             className="rounded-full object-cover object-center bg-background"
//                             style={{
//                                 borderRadius: '50%', 
//                                 aspectRatio: '1/1', 
//                                 width: '24px', 
//                                 height: '24px'
//                             }}
//                         />
//                         {selectedCountry.name}
//                         <ChevronDown size={16} />
//                     </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent>
//                     {countries.map((country) => (
//                         <DropdownMenuItem
//                             key={country.code}
//                             onClick={() => handleCountrySelect(country)}
//                             className="flex items-center gap-2 cursor-pointer bg-background  text-primary"
//                         >
//                             <Image
//                                 src={country.flag}
//                                 alt={country.name}
//                                 width={24}
//                                 height={24}
//                                 className="rounded-full object-cover object-center  "
//                             style={{
//                                 borderRadius: '50%', 
//                                 aspectRatio: '1/1', 
//                                 width: '24px', 
//                                 height: '24px'
//                             }}
//                             />
//                             {country.name}
//                         </DropdownMenuItem>
//                     ))}
//                 </DropdownMenuContent>
//             </DropdownMenu>
//             <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/c relative pl-3 lg:pl-0 mb-2 mr-4">
//                 <Link href="/servicehub" className=" text-primary hover:cursor-pointer">
//                     Log in
//                 </Link>
//             </div>
            // {session?.data?.user ? (
            //     <DropdownMenu>
            //         <DropdownMenuTrigger asChild>
            //             <Button size="sm">
            //                 <UserCircle size={18} />
            //             </Button>
            //         </DropdownMenuTrigger>
            //         <DropdownMenuContent>
            //             <DropdownMenuLabel>My Account</DropdownMenuLabel>
            //             <DropdownMenuSeparator />
            //             <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            //             <DropdownMenuItem asChild>
            //                 <button className="w-full cursor-pointer" onClick={onLogOutClick}>
            //                     Log Out
            //                 </button>
            //             </DropdownMenuItem>
            //         </DropdownMenuContent>
            //     </DropdownMenu>
            // ) : (
            //     <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
            //         Book A Demo
            //     </Button>
            // )}
//         </div>
//     );
// }


"use client";
import { UserCircle, ChevronUp, ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Country {
  code: string;
  name: string;
  flag: string;
}

const countries: Country[] = [
  { code: "ind", name: "INDIA", flag: "/ind_flag.png" },
  { code: "uk", name: "UK", flag: "/uk_flag.jpg" },
];

export default function NavbarClient() {
  const session = useSession();
  const { toast } = useToast();

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryDropdownRef.current && 
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsCountryMenuOpen(false);
  };

  const onLogOutClick = () => {
    signOut();
    toast({
      title: "Logged out",
      description: "You have been logged out.",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div 
        ref={countryDropdownRef} 
        className="relative w-[120px]"
      >
        <div
          className="flex items-center gap-2 cursor-pointer bg-background  text-primary px-2 py-1"
          onClick={() => setIsCountryMenuOpen((prev) => !prev)}
        >
          <Image
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            width={24}
            height={24}
            className="rounded-full object-cover object-center bg-background"
            style={{
              borderRadius: '50%',
              aspectRatio: '1/1',
              width: '24px',
              height: '24px',
            }}
          />
          <span>{selectedCountry.name}</span>
          {isCountryMenuOpen ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </div>
        <div 
          className={`absolute top-full left-0 mt-1 bg-background text-primary shadow-md border rounded-md z-50 w-full 
          ${isCountryMenuOpen ? 'block' : 'hidden'}`}
        >
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => handleCountrySelect(country)}
              className="flex items-center gap-2 cursor-pointer px-3 py-2"
            >
              <Image
                src={country.flag}
                alt={country.name}
                width={24}
                height={24}
                className="rounded-full object-cover object-center"
                style={{
                  borderRadius: '50%',
                  aspectRatio: '1/1',
                  width: '24px',
                  height: '24px',
                }}
              />
              {country.name}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 border-t lg:border-none pt-2 lg:pt-0 group/c relative pl-3 lg:pl-0 mb-2 mr-4">
        {session?.data?.user ? (
          <button
            className=" text-primary hover:cursor-pointer"
            onClick={onLogOutClick}
          >
            Log Out
          </button>
        ) : (
          <Link href="/servicehub" className=" text-primary hover:cursor-pointer">
            Log in
          </Link>
        )}
      </div>
      {session?.data?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <UserCircle size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled>Profile</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button className="w-full cursor-pointer" onClick={onLogOutClick}>
                Log Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
          Book A Demo
        </Button>
      )}
    </div>
  );
}