import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const ACCESS_TOKEN_LIFETIME = 60; // 60 giây theo đề bài

async function refreshAccessToken(token) {
  try {
    // Log kịch tính nhất theo yêu cầu
    console.log("Token hết hạn, đang refresh...");
    
    const now = Math.floor(Date.now() / 1000);
    
    return {
      ...token,
      accessToken: "access_token_" + Date.now(), // Token mới
      accessTokenExpires: now + ACCESS_TOKEN_LIFETIME,
      refreshToken: token.refreshToken, // Giữ nguyên refresh token
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Thông tin đăng nhập để test theo yêu cầu
        const users = [
          { id: "1", name: "student", role: "ROLE_STUDENT", password: "123456" },
          { id: "2", name: "advisor", role: "ROLE_ADVISOR", password: "123456" },
        ];

        const user = users.find(u => u.name === credentials.username && u.password === credentials.password);

        if (user) {
          const now = Math.floor(Date.now() / 1000);
          return {
            id: user.id,
            name: user.name,
            role: user.role,
            accessToken: "access_token_" + Date.now(),
            refreshToken: "refresh_token_" + Date.now(),
            accessTokenExpires: now + ACCESS_TOKEN_LIFETIME,
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.role = user.role;
        return token;
      }

      // Kiểm tra token hết hạn (Bước 3 kịch tính)
      const now = Math.floor(Date.now() / 1000);
      if (now < token.accessTokenExpires) {
        return token;
      }

      // Tự động gọi refresh
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.name = token.name;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    }
  },
  pages: {
    signIn: '/login',
  }
});
