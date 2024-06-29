import NextAuth from "next-auth"
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs' 

const prisma=new PrismaClient();

interface Credentials {
    email: string;
    password: string;
}

interface User {
    id: string;
    email: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
            name: { label: 'name', type: 'text', placeholder: '' },
           email: { label: 'email', type: 'text', placeholder: '' },
          password: { label: 'password', type: 'password', placeholder: '' },
        },
        //@ts-ignore
        async authorize(credentials: any) {
          const salt= await bcryptjs.genSalt(10)
          const hashedPassword = await bcryptjs.hash(credentials.password, salt);
          const existingUser = await prisma.user.findFirst({
              where: {
                  email: credentials.email
              }
          });

          if (existingUser) {
              const passwordValidation = await bcryptjs.compare(credentials.password, existingUser.password);
              if (passwordValidation) {
                  return {
                      id: existingUser.id,
                      email: existingUser.email
                  }
              }
              return null;
          }

          try {
              const user = await prisma.user.create({
                  data: {
                      email: credentials.email,
                      password: hashedPassword
                  }
              });
          
              return {
                  id: user.id.toString(),
                  email: user.email
              }
          } catch(e) {
              console.error(e);
          }

        },
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
      jwt: async ({ user, token }: any) => {
      if (user) {
          token.uid = user.id;
      }
      return token;
      },
    session: ({ session, token, user }: any) => {
        if (session.user) {
            session.user.id = token.uid
        }
        return session
    }
  },

})


export { handler as GET, handler as POST }