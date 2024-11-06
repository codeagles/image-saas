import NextAuth from "next-auth"
import GitLab from "next-auth/providers/gitlab"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "@/server/db/db";
import {accounts, users} from "@/server/db/schema";
import {eq} from "drizzle-orm";
import {AdapterAccountType} from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [GitLab],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "gitlab" && user.email != null) {
                const existingUser = await db.query.users.findFirst({
                    where: eq(users.email, user.email)
                });
                console.info("profile---->", profile)
                if (existingUser) {
                    // 更新现有用户的 OAuth 账户信息
                    await db.update(accounts).set({
                        userId: existingUser.id,
                        provider: account?.provider,
                        providerAccountId: account?.providerAccountId,
                        type: account.type as AdapterAccountType,
                        access_token: account.access_token,
                        token_type: account.token_type,
                        scope: account.scope,
                        refresh_token: account?.refresh_token, // 可选
                        expires_at: account?.expires_at, // 可选
                        id_token: account.id_token, // 可选
                        // session_state: account?.session_state, // 可选
                    }).where(eq(accounts.userId, existingUser.id));
                    return true;
                }
            }
            return true; // 允许登录
        },
    },
})