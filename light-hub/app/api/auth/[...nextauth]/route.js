import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { log } from "console";

export const authOptions = {
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "#FFF", // Hex color value
    logo: "/faro.png", // Absolute URL to logo image
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
          console.log({ credentials });
          const res = await fetch(process.env.NEXTAUTH_URL + "/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          console.log(res);
        } catch (error) {
          console.log(error);
        }

        return { name: "Juan", correo: "juan@google.com", role: "admin" };

        //return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );
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
    // secret: process.env.JWT_SECRET_SEED, // deprecated
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
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, user, profile }) {
      console.log(user);
      if (account) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case "oauth":
            console.log("DATA FROM DB??");
            // token.user = await dbUsers.oAUthToDbUser(
            //   user?.email || "",
            //   user?.name || ""
            // );
            break;

          case "credentials":
            token.user = user;
            break;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== "iat" && c !== "exp" && c !== "jti" && c !== "apiToken") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});
      return { ...session, user: sanitizedToken, apiToken: token.apiToken };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
