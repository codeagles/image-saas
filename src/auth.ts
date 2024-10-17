import NextAuth from "next-auth"
import GitLab from "next-auth/providers/gitlab"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/server/db/db";



export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitLab],
    secret: process.env.AUTH_SECRET,
})