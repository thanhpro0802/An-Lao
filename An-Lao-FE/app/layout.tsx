import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/hooks/useAuth';

export const metadata: Metadata = {
  title: 'An Lão - Elder Care',
  description: 'Tìm kiếm và đặt lịch viện dưỡng lão',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="vi">
      <body className="font-lexend bg-surface text-[#111c2c] antialiased" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
