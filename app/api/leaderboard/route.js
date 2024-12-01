import { createClerkClient } from '@clerk/backend';
import { auth } from '@clerk/nextjs/server';

// Instantiate Clerk client
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Missing userId' }), { status: 400 });
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
    };

    return new Response(JSON.stringify(userData), { status: 200 });
  } catch (error) {
    console.error('Error fetching user from Clerk:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
