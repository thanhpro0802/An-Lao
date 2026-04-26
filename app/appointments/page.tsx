import BottomNav from "@/components/BottomNav";
import { Menu, Bell, CheckCircle2, CalendarDays, User, Stethoscope, Lightbulb } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <div className="bg-surface text-[#111c2c] min-h-screen pb-24">
      <header className="bg-white border-b border-[#E2E8F0] sticky top-0 z-50">
        <div className="flex items-center justify-between w-full h-16 px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="text-primary active:scale-95 transition-all duration-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold tracking-tight text-primary">Lịch hẹn của tôi</h1>
          </div>
          <button className="text-primary active:scale-95 transition-all duration-200 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-8">
        <nav className="flex border-b border-[#bccac1] mt-4 overflow-x-auto hide-scrollbar sticky top-16 bg-surface z-40">
          <button className="px-6 py-4 font-semibold text-[16px] border-b-4 border-primary text-primary whitespace-nowrap">Sắp diễn ra</button>
          <button className="px-6 py-4 font-semibold text-[16px] text-[#6d7a73] whitespace-nowrap hover:bg-[#f0f3ff] transition-colors">Đã hoàn thành</button>
          <button className="px-6 py-4 font-semibold text-[16px] text-[#6d7a73] whitespace-nowrap hover:bg-[#f0f3ff] transition-colors">Đã hủy</button>
        </nav>

        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[24px] font-semibold text-[#111c2c]">Sắp diễn ra</h2>
            <span className="text-[16px] font-semibold text-primary">1 lịch hẹn</span>
          </div>

          {/* Sắp diễn ra Card */}
          <div className="bg-white rounded-lg border border-[#E2E8F0] border-l-4 border-l-primary p-6 shadow-sm transition-transform hover:-translate-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6n6CjCWXgavtjmvnvMA5F-nnsa-bOPC9iMLWh3jxY_ErDBtpyU3SwMDeHXnHQy3yJTEHl-zFZX57xN38kvQ1VgU_hZ_NI_qW2lbBu-KfI9RRsRIFRfP6jCy7ALfq-rZsnFiNXa8ftgVr0bNlSu-JPZD54gggYrrlpQ9u5Sg2XTe99BageeFjaJFUtnrVtgUr4pImPchfOc30282yZCkeJPY8V9YSexNHBBur8uP4aVZs6BpirsGI4iVBM253VpqmqFG6UaGuHcQ" alt="Lotus Care" fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-[24px] font-semibold text-[#111c2c] mb-1">Lotus Care - Quận Cầu Giấy</h3>
                  <span className="bg-primary text-white text-[14px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Đã xác nhận
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 text-[18px] text-[#3d4943]">
                <CalendarDays className="w-5 h-5 text-primary" />
                <span>Thứ 2, 20/05/2026 · Sáng (8–11h)</span>
              </div>
              <div className="flex items-center gap-3 text-[18px] text-[#3d4943]">
                <User className="w-5 h-5 text-primary" />
                <span>Nguyễn Văn A · 0912 345 678</span>
              </div>
              <div className="flex items-center gap-3 text-[18px] text-[#3d4943]">
                <Stethoscope className="w-5 h-5 text-primary" />
                <span>Tình trạng: Sau tai biến</span>
              </div>
            </div>

            <div className="bg-[#c4ebdd]/30 border border-[#c4ebdd] p-4 rounded-lg flex gap-3 mb-8">
              <Lightbulb className="w-5 h-5 text-primary" fill="currentColor" />
              <p className="font-semibold text-[16px] text-[#2a4d43]">Nhớ hỏi về phụ phí bỉm, thuốc khi đến</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 h-14 border-2 border-primary text-primary font-semibold text-[16px] rounded-lg hover:bg-primary/5 transition-colors">
                Hủy lịch
              </button>
              <button className="flex-1 h-14 bg-primary text-white font-semibold text-[16px] rounded-lg hover:brightness-110 transition-colors shadow-md">
                Xem chỉ đường
              </button>
            </div>
          </div>

          {/* Đã hoàn thành */}
          <div className="mt-16">
            <h2 className="text-[24px] font-semibold text-[#111c2c] mb-4">Đã hoàn thành</h2>
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-[24px] font-semibold text-[#6d7a73]">Viện dưỡng lão Thiên Đức - Bắc Từ Liêm</h3>
                <span className="bg-[#dbe4e2] text-[#404947] text-[14px] font-bold px-3 py-1 rounded-full uppercase">
                  Đã tham quan · 10/05/2026
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-2 border-dashed border-[#bccac1] rounded-lg bg-[#f0f3ff]">
                <div className="text-center md:text-left">
                  <p className="text-[20px] font-bold text-[#111c2c] mb-1">Bạn chưa đánh giá cơ sở này</p>
                  <p className="text-[18px] text-[#6d7a73]">Chia sẻ trải nghiệm của bạn để giúp đỡ cộng đồng.</p>
                </div>
                <Link href="/facility/thien-duc/review" className="h-14 px-8 flex items-center justify-center bg-primary text-white font-semibold text-[16px] rounded-lg hover:brightness-110 transition-all shadow-md">
                  Để lại đánh giá
                </Link>
              </div>
            </div>
          </div>

          {/* Đã hủy */}
          <div className="mt-16 pb-12">
            <h2 className="text-[24px] font-semibold text-[#111c2c] mb-4">Đã hủy</h2>
            <div className="bg-white rounded-lg border border-[#E2E8F0] border-l-4 border-l-error p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-[24px] font-semibold text-[#111c2c]">Trung tâm Điều dưỡng Ánh Dương</h3>
                  <p className="text-[18px] text-error mt-1 font-medium">Lý do: Bạn đã hủy · 08/05/2026</p>
                </div>
                <span className="bg-[#ffdad6] text-[#93000a] text-[14px] font-bold px-3 py-1 rounded-full uppercase">
                  Đã hủy
                </span>
              </div>
              <div className="flex justify-end mt-4">
                <button className="h-14 px-8 border-2 border-primary text-primary font-semibold text-[16px] rounded-lg hover:bg-primary/5 transition-colors">
                  Đặt lịch lại
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
