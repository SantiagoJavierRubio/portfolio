import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  secret: process.env.SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user && user.id === process.env.ADMIN_ID) return true
      return false
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/admin`
    }
  }
}

export default NextAuth(authOptions)
