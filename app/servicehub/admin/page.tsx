// import pb from "@/lib/pocketbase";
// import { UserListItemForAdmin } from "../types";
// import AdminDashboard from "./AdminDashboard";

// export async function fetchUsers() {
//     try {
//         const users = await pb.collection("users").getFullList<UserListItemForAdmin>({
//             fields: "id,name,email,role,sub,description,avatar",
//         });

//         return users;
//     } catch (error) {
//         console.error("Failed to fetch users:", error);
//         return [];
//     }
// }

// export default async function AdminPage() {
//     const initialUsers = await fetchUsers();  

//     return <AdminDashboard  initialUsers={initialUsers}/>;
// }

// "use server"
import AdminDashboard from "./AdminDashboard";
import pb from "@/lib/pocketbase";


export const revalidate = 0;
async function getUsers() {
    try {
        const users = await pb.collection("users").getFullList({
            fields: "id,name,email,role,avatar,sub,description",
            sort: "name",
        });
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            sub: user.sub,
            description: user.description,
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export default async function AdminPage() {
    const initialUsers = await getUsers();
    return <AdminDashboard initialUsers={initialUsers} />;
}
