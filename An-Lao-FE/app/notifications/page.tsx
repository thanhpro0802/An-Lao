import { ArrowLeft, CalendarDays, Building2, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="bg-surface min-h-screen text-[#111c2c]">
      <header className="bg-white fixed top-0 w-full z-50 border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between px-4 h-16 w-full max-w-5xl mx-auto">
          <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-slate-50 active:scale-95 transition-transform duration-200">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="font-semibold text-lg text-primary font-bold">Thông báo</h1>
          <div className="w-12 h-12"></div>
        </div>
      </header>

      <main className="pt-[88px] pb-[120px] px-4 md:px-8 max-w-[800px] mx-auto flex flex-col gap-8">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 pt-2 snap-x">
          <button className="snap-start shrink-0 bg-primary text-white px-6 py-3 rounded-full font-semibold text-[16px] shadow-sm border border-primary transition-colors">
            Tất cả
          </button>
          <button className="snap-start shrink-0 bg-white text-[#111c2c] px-6 py-3 rounded-full font-semibold text-[16px] border border-[#bccac1] hover:bg-[#f0f3ff] transition-colors">
            Dịch vụ
          </button>
          <button className="snap-start shrink-0 bg-white text-[#111c2c] px-6 py-3 rounded-full font-semibold text-[16px] border border-[#bccac1] hover:bg-[#f0f3ff] transition-colors">
            Hệ thống
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <article className="relative bg-white rounded-3xl border-2 border-primary p-6 shadow-sm overflow-hidden flex flex-col gap-4 transition-transform hover:-translate-y-0.5">
            <div className="absolute top-6 right-6 w-3.5 h-3.5 bg-primary rounded-full shadow-[0_0_0_4px_rgba(29,158,117,0.1)]"></div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#D1FAE5] text-[#008560] flex items-center justify-center shrink-0">
                <CalendarDays className="w-7 h-7" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[12px] text-primary uppercase tracking-wider">Cập nhật Dịch vụ</span>
                <span className="text-[18px] text-[#555e5c]">2 phút trước</span>
              </div>
            </div>
            <p className="text-[20px] text-[#111c2c] font-medium pr-8 mt-2">
              Lịch hẹn tại Lotus Care đã được xác nhận.
            </p>
            <div className="mt-2">
              <Link href="/appointments" className="inline-block bg-[#d8e3fa] text-[#3d4943] font-semibold text-[16px] px-6 py-3 rounded-full hover:bg-[#cfdaf1] transition-colors">
                Xem chi tiết lịch hẹn
              </Link>
            </div>
          </article>

          <article className="bg-white rounded-3xl border border-[#bccac1] p-6 flex flex-col gap-5 transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#c4ebdd] text-[#486b60] flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[12px] text-[#42655a] uppercase tracking-wider">Tin tức Cộng đồng</span>
                <span className="text-[18px] text-[#555e5c]">1 giờ trước</span>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden aspect-video w-full relative bg-[#d8e3fa]">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Genbye8C2J2P1kIhqjK0kqX43lYHuZqNF1tTyHOqA5CTKV3ZzdTqZ01tQj5wA90V6K3tOOsNBTvnxAOjGOXFiepDspD0fHrjp7fnZRwBNVx-uKtM5meO6CK4XwIP73vn6Yn7TaJU7fG4uWzjh0AvO5zjHOWMLCVJpEQT4xde_0Nu_6_A0Lms5R1p0YA0Vfyv3xfc6HTzuhBiqFE6JZeruf9YiYWOfI4m7zSAkWUKRBlB-WJgqVri3l3fXBSON55bk3ZBMWNg1g" alt="Sen Vàng" fill className="object-cover" />
            </div>
            <p className="text-[20px] text-[#111c2c] leading-relaxed">
              <strong className="font-semibold block mb-1">Cơ sở mới:</strong> 
              Viện dưỡng lão Sen Vàng vừa gia nhập YênTâm tại khu vực Hà Đông.
            </p>
          </article>

          <article className="bg-[#f0f3ff] rounded-3xl border border-[#bccac1] p-6 flex flex-col gap-4 opacity-90 transition-transform hover:-translate-y-0.5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#d8e3fa] text-[#3d4943] flex items-center justify-center shrink-0">
                <Smartphone className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[12px] text-[#555e5c] uppercase tracking-wider">Hệ thống</span>
                <span className="text-[18px] text-[#555e5c]">Hôm qua</span>
              </div>
            </div>
            <p className="text-[20px] text-[#111c2c] mt-2">
              <strong className="font-semibold block mb-1">Cập nhật ứng dụng:</strong>
              Trải nghiệm tìm kiếm nhanh hơn với bộ lọc mới.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}
