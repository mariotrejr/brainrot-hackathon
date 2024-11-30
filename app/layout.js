import localFont from 'next/font/local';
import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from '@/components/ui/provider';
import Navbar from '@/components/Navbar.jsx'; // Import the Navbar component
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'WeRCooked',
  description: 'Dont even try to apply lil bro',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <Provider>
            <Navbar /> {/* Reusable Navbar */}
            <main>{children}</main>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
