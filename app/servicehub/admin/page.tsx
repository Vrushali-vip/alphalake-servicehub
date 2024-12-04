import pb from "@/lib/pocketbase";
import { UserListItemForAdmin } from "../types";
import AdminDashboard from "./AdminDashboard";

export async function fetchUsers() {
    try {
        const users = await pb.collection("users").getFullList<UserListItemForAdmin>({
            fields: "id,name,email,role,sub,description,avatar",
        });

        return users;
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return [];
    }
}

export default async function AdminPage() {
    const initialUsers = await fetchUsers();  

    return <AdminDashboard  initialUsers={initialUsers}/>;
}