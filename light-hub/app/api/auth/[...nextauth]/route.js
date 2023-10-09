import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import lightHubApi from "@/api-config";
import { API_URL } from "@/utils/constants";

export const authOptions = {
  // theme: {
  //   colorScheme: "auto", // "auto" | "dark" | "light"
  //   brandColor: "#FFF", // Hex color value
  //   logo: "/faro.png", // Absolute URL to logo image
  // },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/auth/error", // Error code passed in query string as ?error=
    newUser: "/register",
  },
  providers: [
    Credentials({
      name: "Correo",
      credentials: {
        email: {
          label: "Correo:",
          type: "email",
          placeholder: "correo@google.com",
        },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        try {
          console.log(API_URL + "/user/login");
          const res = await lightHubApi.post("/user/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const userWithToken = res.data;

          if (userWithToken) {
            // Any object returned will be saved in `user` property of the JWT
            return userWithToken;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        } catch (error) {
          throw new Error(JSON.stringify(error));
          console.log(error);
          if (error.response) {
            console.log(
              "Server responded with status code:",
              error.response.status
            );
            console.log("Response data:", error.response.data);
            throw new Error(error.response.data.error);
          } else if (error.request) {
            throw new Error(error.request);
          } else {
            throw new Error(error.message);
          }
        }
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
    // ...add more providers here
  ],
  jwt: {
    //secret: process.env.NEXTAUTH_SECRET, // deprecated
  },
  session: {
    maxAge: 2592000, /// 30d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        throw new Error("EEEOROROR");
      }
    },
    async jwt({ token, account, user, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            console.log("DATA FROM DB", account);
            const res = await lightHubApi.post("/user/signup", {
              name: token.name,
              email: token.email,
              picture: token.picture,
              provider: account.provider,
            });
            console.log(res);
            token.user = {};
            // token.user = await dbUsers.oAUthToDbUser(
            //   user?.email || "",
            //   user?.name || ""
            // );
            break;

          case "credentials":
            if (user.error) {
              token = { error: user.error };
            } else {
              token.user = user;
            }
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      if (token?.error) {
        session.error = token.error;
        return session;
      }
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as DELETE };
