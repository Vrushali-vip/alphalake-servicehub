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


"use client";
import { Button } from "../ui/button";
import { UserCircle, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import React, { useState } from "react";

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

    const handleCountrySelect = (country: Country) => {
        setSelectedCountry(country); 
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Image
                            src={selectedCountry.flag}
                            alt={selectedCountry.name}
                            width={24}
                            height={24}
                            className="rounded-full object-cover object-center"
                            style={{
                                borderRadius: '50%', 
                                aspectRatio: '1/1', 
                                width: '24px', 
                                height: '24px'
                            }}
                        />
                        {selectedCountry.name}
                        <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {countries.map((country) => (
                        <DropdownMenuItem
                            key={country.code}
                            onClick={() => handleCountrySelect(country)}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <Image
                                src={country.flag}
                                alt={country.name}
                                width={24}
                                height={24}
                                className="rounded-full object-cover object-center "
                            style={{
                                borderRadius: '50%', 
                                aspectRatio: '1/1', 
                                width: '24px', 
                                height: '24px'
                            }}
                            />
                            {country.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

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
