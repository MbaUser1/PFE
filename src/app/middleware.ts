import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: '/',  // Page de redirection si l'utilisateur n'est pas authentifié
  },
  callbacks: {
    authorized: ({ token }) => {
      // Cette fonction vérifie si l'utilisateur est authentifié
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],  // Chemins protégés par ce middleware
};
