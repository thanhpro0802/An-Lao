import type {Metadata} from 'next';
import { Lexend } from 'next/font/google';
import './globals.css'; // Global styles

const lexend = Lexend({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'An Lão - Elder Care',
  description: 'Tìm kiếm và đặt lịch viện dưỡng lão',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi" className={lexend.variable}>
      <body className="font-lexend bg-surface text-[#111c2c] antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
