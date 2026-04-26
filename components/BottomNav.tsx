'use client';
import { Home, Search, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Trang chủ', href: '/', icon: Home, active: pathname === '/' },
    { name: 'Tìm kiếm', href: '/search', icon: Search, active: pathname.startsWith('/search') },
    { name: 'Lịch hẹn', href: '/appointments', icon: Calendar, active: pathname.startsWith('/appointments') },
    { name: 'Cá nhân', href: '/profile', icon: User, active: pathname.startsWith('/profile') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-white border-t border-[#E2E8F0] shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)] md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={clsx(
              'flex flex-col items-center justify-center px-4 py-2 transition-transform active:scale-90',
              item.active 
                ? 'text-primary bg-primary/10 rounded-xl' 
                : 'text-slate-500 hover:text-primary'
            )}
          >
            <Icon className="w-6 h-6 mb-1" />
            <span className="text-[12px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
