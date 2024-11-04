"use server";

export default async function subscribeNewsletter(fd: FormData) {
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;

    const googleChatMessage: GoogleChatMessage = {
        time: new Date().toLocaleString(),
        site: "Alphalake Services",
        formName: "Subscribe Newsletter",
        fields: [
            {
                key: "Name",
                value: name
            },
            {
                key: "Email",
                value: email
            }
        ]
    }

    try {
        const res = await fetch(process.env.GOOGLE_CHAT_FUNCTION_URL!, {
            method: "POST",
            body: JSON.stringify(googleChatMessage)
        });

        if(res.ok) return {
            error: false,
            message: "You have now subscribed the newsletter."
        }

        return {
            error: true,
            message: "Submission Failed"
        }
    } catch (error) {
        console.log(error);
        
        return {
            error: true,
            message: "Submission Failed"
        }
    }
}