// next-auth.d.ts
import { DefaultSession } from "next-auth";

// Extend the default User object with custom fields (id, role, etc.)
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: {
      id: string;
      name: string;
      permissions: Array<{
        action: string;
        subject: string;
      }>;
    };
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: {
        [x: string]: any;
        name: string;
        permissions: Array<{
          action: string;
          subject: string;
        }>;
      };
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email: string;
    role: {
      name: string;
      permissions: Array<{
        action: string;
        subject: string;
      }>;
    };
  }
}
