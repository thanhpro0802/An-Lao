import { CheckCircle2, Bell, X, Phone, CalendarDays, Heart, Lightbulb } from "lucide-react";
import Link from "next/link";

export default function BookingSuccess() {
  return (
    <div className="bg-surface text-[#111c2c] min-h-screen pb-12">
      <header className="bg-white border-b border-[#E2E8F0] flex justify-between items-center w-full px-4 h-16 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <X className="w-6 h-6 text-primary" />
          </Link>
          <h1 className="text-xl font-bold text-primary">Đặt lịch thành công</h1>
        </div>
        <button className="flex items-center">
          <Bell className="w-6 h-6 text-primary" />
        </button>
      </header>

      <main className="max-w-md mx-auto px-4 pt-8 space-y-8">
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 bg-[#c4ebdd] rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-[60px] h-[60px] text-primary" fill="currentColor" stroke="white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-[32px] font-semibold text-primary">Đặt lịch thành công!</h2>
            <p className="text-[18px] text-[#3d4943]">Cơ sở sẽ liên hệ xác nhận trong vòng 2 giờ</p>
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-xl p-8 space-y-6 shadow-sm">
          <h3 className="text-[24px] font-semibold text-[#42655a] border-b border-[#E2E8F0] pb-4">Thông tin lịch hẹn</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-[18px] text-[#3d4943] shrink-0">Cơ sở</span>
              <span className="text-[16px] font-semibold text-right">Lotus Care, Quận Cầu Giấy</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-[18px] text-[#3d4943] shrink-0">Ngày tham quan</span>
              <span className="text-[16px] font-semibold text-right">Thứ 2, 20/05/2026</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-[18px] text-[#3d4943] shrink-0">Buổi</span>
              <span className="text-[16px] font-semibold text-right">Sáng (8–11h)</span>
            </div>
            <div className="flex justify-between items-start gap-4 border-t border-[#F1F5F9] pt-4">
              <span className="text-[18px] text-[#3d4943] shrink-0">Người liên hệ</span>
              <span className="text-[16px] font-semibold text-right">Nguyễn Văn A · 0912 345 678</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-[18px] text-[#3d4943] shrink-0">Tình trạng</span>
              <span className="text-[16px] font-semibold text-right">Sau tai biến, Cần hỗ trợ một phần</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-[24px] font-semibold">Bước tiếp theo</h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <p className="text-[18px] pt-1">Cơ sở gọi xác nhận lịch <span className="text-primary font-medium">(trong 2 giờ)</span></p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                <CalendarDays className="w-5 h-5" />
              </div>
              <p className="text-[18px] pt-1">Đến tham quan theo giờ đã hẹn</p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-[18px] pt-1">Quyết định sau khi đã xem thực tế</p>
            </div>
          </div>
        </section>

        <section className="bg-[#c4ebdd] rounded-xl p-6 flex gap-4">
          <Lightbulb className="w-6 h-6 text-primary shrink-0" />
          <div className="space-y-1">
            <span className="text-[16px] font-semibold text-[#2a4d43]">Mẹo chuyên gia:</span>
            <p className="text-[18px] text-[#2a4d43] leading-relaxed mt-1">
              Khi đến tham quan, hỏi thẳng về các khoản phụ phí bỉm, thuốc và vật tư y tế — những khoản này thường không có trong báo giá ban đầu.
            </p>
          </div>
        </section>

        <section className="space-y-4 pt-4">
          <Link href="/appointments" className="w-full h-14 bg-primary text-white rounded-lg text-[16px] font-semibold flex items-center justify-center transition-opacity active:opacity-80">
            Xem lịch hẹn của tôi
          </Link>
          <Link href="/" className="w-full h-14 bg-white border-2 border-primary text-primary rounded-lg text-[16px] font-semibold flex items-center justify-center transition-colors hover:bg-slate-50">
            Tìm thêm cơ sở khác
          </Link>
          <p className="text-center text-sm text-[#3d4943]">Bạn sẽ nhận SMS xác nhận tại 0912 345 xxx</p>
        </section>
      </main>
    </div>
  );
}
