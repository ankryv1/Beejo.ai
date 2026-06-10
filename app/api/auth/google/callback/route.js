import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import connectDB from "@/lib/mongodb";
import userModel from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/google/callback",
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const ticket = await client.verifyIdToken({
  idToken: data.id_token,
  audience: process.env.GOOGLE_CLIENT_ID,
});
const payload = ticket.getPayload();
await connectDB();

let user = await userModel.findOne({
  email: payload.email,
});

if (!user) {

  user = await userModel.create({

    name: payload.name,

    email: payload.email,

    provider: "google",

  });

}

const token = jwt.sign(
  {
    userId: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "6d",
  }
);

const cookieStore = await cookies();

cookieStore.set("token", token, {
  httpOnly: true,
  path: "/",
  maxAge:60*60*24*7
});

console.log(payload);
  console.log(data);

 return NextResponse.redirect(
  new URL("/", request.url)
);
}
