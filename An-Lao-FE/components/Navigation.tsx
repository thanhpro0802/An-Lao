'use client';
import { Home, Search, Calendar, User, Menu, Bell, LogOut, ChevronDown, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { name: 'Trang chủ', href: '/', icon: Home, active: pathname === '/' },
    { name: 'Tìm kiếm', href: '/search', icon: Search, active: pathname.startsWith('/search') },
    { name: 'Tư vấn AI', href: '/chat', icon: Sparkles, active: pathname.startsWith('/chat') },
    { name: 'Lịch hẹn', href: '/appointments', icon: Calendar, active: pathname.startsWith('/appointments') },
    { name: 'Cá nhân', href: '/profile', icon: User, active: pathname.startsWith('/profile') },
  ];

  return (
    <>
      {/* MOBILE: Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-white border-t border-outline-variant shadow-[0_-1px_3px_0_rgba(0,0,0,0.05)] md:hidden pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex flex-col items-center justify-center px-4 py-2 transition-transform active:scale-90',
                item.active 
                  ? 'text-primary bg-primary-container rounded-xl font-bold' 
                  : 'text-on-surface-variant hover:text-primary font-medium'
              )}
            >
              <Icon className={clsx("w-6 h-6 mb-1", item.active && "fill-primary/20")} />
              <span className="text-[12px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* DESKTOP: Sticky Top Navigation */}
      <header className="hidden md:flex fixed top-0 left-0 w-full z-50 h-20 bg-white border-b border-outline-variant shadow-sm items-center justify-between px-8 lg:px-16">
        {/* Left side: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
            <span className="text-white font-headline-sm font-bold">AL</span>
          </div>
          <span className="font-headline-md font-bold text-primary tracking-tight">An Lão</span>
        </Link>
          
        {/* Right side: Nav Links + Auth */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 rounded font-label-lg transition-colors flex items-center gap-2',
                  item.active 
                    ? 'bg-primary text-white' 
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="w-px h-8 bg-outline-variant"></div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-1.5 pr-4 border border-outline-variant rounded hover:border-primary hover:bg-surface-container-low transition-colors"
              >
                <div className="w-9 h-9 bg-primary text-white rounded flex items-center justify-center font-bold text-sm">
                  {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="font-label-lg text-on-surface max-w-[150px] truncate">{user.fullName}</span>
                <ChevronDown className="w-4 h-4 text-on-surface-variant" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-outline-variant rounded shadow-lg overflow-hidden py-2 z-50 flex flex-col">
                  <div className="px-4 py-3 border-b border-outline-variant">
                    <p className="font-label-lg font-bold text-on-surface">{user.fullName}</p>
                    <p className="font-body-sm text-on-surface-variant truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container font-body-md text-on-surface" onClick={() => setShowDropdown(false)}>
                    <User className="w-5 h-5 text-on-surface-variant" />
                    Trang cá nhân
                  </Link>
                  <Link href="/appointments" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container font-body-md text-on-surface" onClick={() => setShowDropdown(false)}>
                    <Calendar className="w-5 h-5 text-on-surface-variant" />
                    Quản lý lịch hẹn
                  </Link>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin/facilities" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-container font-body-md text-primary" onClick={() => setShowDropdown(false)}>
                      <Menu className="w-5 h-5 text-primary" />
                      Quản trị hệ thống
                    </Link>
                  )}
                  <button onClick={() => { setShowDropdown(false); logout(); }} className="flex items-center gap-3 px-4 py-3 hover:bg-error-container font-body-md text-error transition-colors w-full text-left">
                    <LogOut className="w-5 h-5" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-6 py-2.5 font-label-lg text-primary hover:bg-primary-container rounded transition-colors">
                Đăng nhập
              </Link>
              <Link href="/register" className="px-6 py-2.5 font-label-lg bg-primary text-white hover:bg-primary-container hover:text-white rounded transition-colors shadow-sm">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
