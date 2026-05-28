"use client";

import { 
  Menu, Settings, Edit2, BadgeCheck, Plus, MoreVertical, 
  CalendarDays, Star, Bookmark, Bell, ChevronRight, 
  Headset, HelpCircle, BookOpen, FileText, LogOut 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { CldUploadWidget } from "next-cloudinary";
import { fetchApi } from "@/lib/api";
import Image from "next/image";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      const newAvatarUrl = result.info.secure_url;
      try {
        await fetchApi("/auth/profile", {
          method: "PUT",
          body: JSON.stringify({ avatarUrl: newAvatarUrl })
        });
        // Reload to get fresh user data
        window.location.reload();
      } catch (err) {
        console.error("Failed to update profile", err);
      }
    }
  };

  return (
    <div className="bg-surface text-on-surface pb-[100px] min-h-screen">
      <header className="bg-white flex items-center justify-between px-4 h-16 w-full sticky top-0 z-50 border-b border-outline-variant max-w-5xl mx-auto">
        <div className="flex items-center gap-4">
          <button className="text-primary active:scale-95 transition-all duration-200">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold tracking-tight text-primary">Cá nhân</h1>
        </div>
        <button aria-label="Settings" className="p-2 -mr-2 text-primary">
          <Settings className="w-6 h-6" />
        </button>
      </header>

      <main className="max-w-container-max mx-auto px-4 md:px-gutter pt-margin pb-section-gap space-y-section-gap">
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-lg p-[32px] relative">
            <button aria-label="Edit Profile" className="absolute top-[24px] right-[24px] p-2 text-outline hover:text-primary transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-gutter">
              <CldUploadWidget 
                signatureEndpoint="/api/cloudinary/sign"
                onSuccess={handleUploadSuccess}
                options={{
                  multiple: false,
                  maxFiles: 1,
                  resourceType: "image",
                  clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                  maxImageFileSize: 5000000 // 5MB
                }}
              >
                {({ open }) => (
                  <div 
                    onClick={() => open()}
                    className="w-[88px] h-[88px] rounded-full bg-primary flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity relative overflow-hidden group"
                  >
                    {user.avatarUrl ? (
                      <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <span className="font-headline-md text-headline-md text-white font-bold">{getInitials(user.fullName)}</span>
                    )}
                    <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center">
                      <Edit2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </CldUploadWidget>
              <div className="text-center md:text-left space-y-base flex-1">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">{user.fullName || "Người dùng ẩn danh"}</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">{user.phone || user.email}</p>
                <div className="inline-flex items-center gap-2 bg-primary-container text-primary px-4 py-2 rounded-full mt-2">
                  <BadgeCheck className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  <span className="font-label-lg text-label-lg uppercase text-[14px]">
                    {user.role === 'ADMIN' ? 'Quản trị viên An Lão' : 'Thành viên An Lão'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-base">
            <div className="bg-surface-container-high rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">2</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Lịch hẹn</span>
            </div>
            <div className="bg-surface-container-high rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">1</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Đánh giá</span>
            </div>
            <div className="bg-surface-container-high rounded-lg p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">3</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Đã lưu</span>
            </div>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Hoạt động của tôi</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden divide-y divide-outline-variant">
            <Link href="/appointments" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <CalendarDays className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Lịch hẹn của tôi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-outline font-body-md text-body-md">2 lịch sắp diễn ra</span>
                <ChevronRight className="w-6 h-6 text-outline" />
              </div>
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <Star className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Đánh giá đã gửi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-outline font-body-md text-body-md">1 đánh giá</span>
                <ChevronRight className="w-6 h-6 text-outline" />
              </div>
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <Bookmark className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Cơ sở đã lưu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-outline font-body-md text-body-md">3 cơ sở</span>
                <ChevronRight className="w-6 h-6 text-outline" />
              </div>
            </Link>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Hỗ trợ</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden divide-y divide-outline-variant">
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <Headset className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Chat với tư vấn viên</span>
              </div>
              <ChevronRight className="w-6 h-6 text-outline" />
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Câu hỏi thường gặp</span>
              </div>
              <ChevronRight className="w-6 h-6 text-outline" />
            </Link>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Tài khoản</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden divide-y divide-outline-variant">
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-outline" />
                <span className="font-body-lg text-body-lg text-on-surface">Điều khoản &amp; Chính sách bảo mật</span>
              </div>
              <ChevronRight className="w-6 h-6 text-outline" />
            </Link>
            <button 
              onClick={logout} 
              className="w-full flex items-center justify-between p-4 md:px-6 hover:bg-error-container transition-colors min-h-[56px] group"
            >
              <div className="flex items-center gap-4">
                <LogOut className="w-6 h-6 text-error" />
                <span className="font-body-lg text-body-lg text-error font-medium">Đăng xuất</span>
              </div>
            </button>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
