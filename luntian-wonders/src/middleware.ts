import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that allow guests (no login required)
const isPublicRoute = createRouteMatcher([
  "/", 
  "/quests", 
  "/quests(.*)", 
  "/about", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // Protect any route that is NOT public
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};