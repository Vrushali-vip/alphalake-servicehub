// "use server";

// import { createClient } from "@/lib/supabase";

// export async function loginWithPassword(email: string, password: string) {
//     const supabase = createClient();
//     const { error } = await supabase.auth.signInWithPassword({ email, password });

//     if (error) {
//         return { error: error.message };
//     } else {
//         return { error: null };
//     }
// }