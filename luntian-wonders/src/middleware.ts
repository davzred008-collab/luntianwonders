import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be public
const isPublicRoute = createRouteMatcher([
  "/", 
  "/quests(.*)", 
  "/about", 
  "/sign-in(.*)", 
  "/sign-up(.*)"
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes strictly, except the public ones
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};