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
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

const countries = [
    { code: 'ind', name: 'India', flag: '/ind_flag.png', route: '/ind' },
    { code: 'uk', name: 'UK', flag: '/uk_flag.jpg', route: '/uk' }
];

export default function NavbarClient() {
    const router = useRouter();
    const session = useSession();
    const { toast } = useToast();

    function onLogOutClick() {
        signOut();
        toast({
            title: "Logged out",
            description: "You have been logged out."
        })
    }

    function handleCountrySelect(country: { code?: string; name?: string; flag?: string; route: any; }) {
        router.push(country.route);
    }

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Image 
                            src={countries[0].flag} 
                            width={24} 
                            height={24} 
                            className="rounded-full object-cover object-center" 
                            style={{
                                borderRadius: '50%', 
                                aspectRatio: '1/1', 
                                width: '24px', 
                                height: '24px'
                            }}
                            alt={countries[0].name} 
                        />
                        {countries[0].name}
                        <ChevronDown size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {countries.map((country) => (
                        <div 
                            key={country.code} 
                            onClick={() => handleCountrySelect(country)}
                            className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-sm hover:bg-accent"
                        >
                            <Image 
                                src={country.flag} 
                                width={24} 
                                height={24} 
                                className="rounded-full object-cover object-center" 
                                style={{
                                    borderRadius: '50%', 
                                    aspectRatio: '1/1', 
                                    width: '24px', 
                                    height: '24px'
                                }}
                                alt={country.name} 
                            />
                            {country.name}
                        </div>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {/* User Account Dropdown */}
            {session?.data?.user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm">
                            <UserCircle size={18} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div className="px-2 py-1.5 text-sm">My Account</div>
                        <div className="h-[1px] bg-border my-1"></div>
                        <div 
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent text-muted-foreground"
                            onClick={() => {}}
                        >
                            Profile
                        </div>
                        <div 
                            className="px-2 py-1.5 text-sm cursor-pointer hover:bg-accent text-destructive"
                            onClick={onLogOutClick}
                        >
                            Log Out
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button variant="default" className="ml-2 lg:ml-auto rounded-full px-4" size="sm">
                    Book A Demo
                </Button>
            )}
        </div>
    )
}