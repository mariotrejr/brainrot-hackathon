import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define a list of protected routes
const protectedRoutes = createRouteMatcher([
  '/brainrot-quiz(/.*)?',  // Protect brainrot-quiz and all its subroutes
  '/speedrun(/.*)?',       // Protect speedrun and all its subroutes
  '/leaderboard(/.*)?',    // Protect leaderboard and all its subroutes
  '/instructions(/.*)?',   // Protect instructions and all its subroutes
  '/engines(/.*)?',        // Protect engines and all its subroutes
  '/end-screen(/.*)?',     // Protect end-screen and all its subroutes
  '/dashboard(/.*)?',             // Protect dashboard
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the current request matches any protected route
  if (protectedRoutes(req)) {
    // Enforce authentication for these routes
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Include protected routes dynamically
    '/brainrot-quiz(/.*)?',
    '/speedrun(/.*)?',
    '/leaderboard(/.*)?',
    '/instructions(/.*)?',
    '/engines(/.*)?',
    '/end-screen(/.*)?',

    // Always protect API routes
    '/api(/.*)?',
    '/trpc(/.*)?',

    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
