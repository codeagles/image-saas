import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: {
                    lable: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password : {
                    label: "Password",
                    type: "password"
                },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    return null
                }

                const {username, password} = credentials
                if (username !== "bob" && password !== "123456") {
                    return null
                }
                // return user object with their profile data
                return {
                    id: "1",
                    ...credentials,
                }
            },
        }),
    ],
})