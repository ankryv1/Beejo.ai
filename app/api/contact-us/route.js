import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try{
        const form = await request.json();
        await resend.emails.send({
            from: "PlantX <onboarding@resend.dev>",
            replyTo : `${form.email}`,
            to : "officialplantx.store@gmail.com",
            subject : `PlantX Contact ${form.subject}`,
            html : `<h1>New Contact Us Message</h1>
                    <p><strong>Name:</strong> ${form.name}</p>
                    <p><strong>Email:</strong> ${form.email}</p>
                    <p><strong>Message:</strong><br/> ${form.message}</p>`
        })

        return new Response(JSON.stringify({success : true, message : "Message sent successfully!"}), {
            status : 200,
            
        })
    }catch(error){
        console.log(error.message);
    }
} 
