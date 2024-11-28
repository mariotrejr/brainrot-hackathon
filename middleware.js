import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

// Define a list of protected routes
const protectedRoutes = [
  "/dashboard",       // Add the dashboard route
  "/profile",         // Example: Profile page
  "/settings",        // Example: Settings page
  "/admin/*",         // Example: Protect all admin subroutes
];

// Export the middleware configuration
export const config = {
  matcher: [
    // Include the protected routes dynamically
    ...protectedRoutes,

    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',

    // Always protect API routes
    '/(api|trpc)(.*)',

    'sign-in(/.*)',    // Protect the sign-in page
  ],
};
