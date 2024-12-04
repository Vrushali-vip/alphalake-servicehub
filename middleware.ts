import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login', // Redirect to this page if not authenticated
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if(!token) {
        return false;
      }
      
      if(req.nextUrl.pathname.startsWith('/api')) {
        return true;
      }

      if(token?.role === 'ADMIN') {
        return req.nextUrl.pathname.startsWith('/servicehub/admin');
      }

      if(token?.role === 'SUPPORT') {
        return req.nextUrl.pathname.startsWith('/servicehub/support');
      }

      if(token?.role === 'CUSTOMER') {
        return !(/\/(admin|support)/.test(req.nextUrl.pathname));
      }

      return true;
    }
  },
});


export const config = {
    matcher: ['/servicehub/:path*', '/api/tickets', '/api/comments'],
};

