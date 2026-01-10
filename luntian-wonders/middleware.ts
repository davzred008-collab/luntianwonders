import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: ["/", "/quests", "/quests/(.*)", "/about", "/api/webhooks(.*)"],
  // Routes that can always be accessed, and have no auth information
  ignoredRoutes: ["/no-auth-in-this-route"],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};