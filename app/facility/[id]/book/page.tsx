import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BookingForm() {
  return (
    <div className="min-h-screen bg-surface pb-32 text-[#111c2c]">
      <header className="sticky top-0 z-50 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center px-4 h-16 w-full max-w-md mx-auto">
          <Link href="/facility/lotus-care" className="mr-4 text-primary p-2 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold text-primary">Đặt lịch tham quan</h1>
            <span className="text-[12px] text-slate-500 font-medium">Lotus Care - Quận Cầu Giấy</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <div className="px-4 py-6">
          <div className="bg-white border border-[#bccac1] rounded-lg p-4 flex gap-4 shadow-sm mb-8">
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeIriB4D942edvDyEsPmLiueTmZSnPvkFIHFjcEK94nU2I_Pu0N7LXg4zuhamUa2BFdUwizqFj53y52GMqqJgRZRN4yGC6hlUZ23V0-TGeDwyW_PUAhJfPdD-FXem8hw5Wb4t5Ny9ErSYfc4KCG_DVSx6XZUgJ0gYhJl89-wj63OZVANr5X8GAxr0brU1HoBz7_gmgozyb9aaJj9eCTKHb5YFx-oK4uKGyegz8iWvB4DJXsgjDcQ4QVSh12gn67iLC8Go3XmD59Q" alt="Room" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-[16px] font-semibold mb-1">Lotus Care - Quận Cầu Giấy</h2>
              <div className="inline-flex items-center bg-[#D1FAE5] text-primary px-2 py-0.5 rounded-full w-fit mb-2">
                <CheckCircle2 className="w-[14px] h-[14px] mr-1" fill="currentColor" stroke="white" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Đã xác minh</span>
              </div>
              <p className="text-[13px] text-[#3d4943]">15 – 25 triệu/tháng · Có phụ phí tính riêng</p>
            </div>
          </div>

          <form className="space-y-6 flex flex-col items-stretch w-full">
            <div>
              <label className="block text-[16px] font-semibold mb-2">Họ và tên người liên hệ</label>
              <input type="text" placeholder="Nhập họ và tên của bạn" className="w-full h-14 px-4 bg-white border-2 border-[#bccac1] rounded-lg focus:border-primary focus:ring-0 text-[18px] outline-none" />
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-2">Số điện thoại</label>
              <input type="tel" placeholder="0xxx xxx xxx" className="w-full h-14 px-4 bg-white border-2 border-[#bccac1] rounded-lg focus:border-primary focus:ring-0 text-[18px] outline-none" />
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-3">Người cần chăm sóc</label>
              <div className="flex flex-wrap gap-3">
                <label className="relative flex items-center cursor-pointer group">
                  <input type="radio" name="relative" className="peer sr-only" defaultChecked />
                  <div className="px-5 h-12 flex items-center justify-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-[#e9f7f2] peer-checked:text-primary font-medium transition-all">Cha/Mẹ</div>
                </label>
                <label className="relative flex items-center cursor-pointer group">
                  <input type="radio" name="relative" className="peer sr-only" />
                  <div className="px-5 h-12 flex items-center justify-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-[#e9f7f2] peer-checked:text-primary font-medium transition-all">Ông/Bà</div>
                </label>
                <label className="relative flex items-center cursor-pointer group">
                  <input type="radio" name="relative" className="peer sr-only" />
                  <div className="px-5 h-12 flex items-center justify-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-[#e9f7f2] peer-checked:text-primary font-medium transition-all">Người thân khác</div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-3">Tình trạng sức khỏe sơ bộ</label>
              <div className="grid grid-cols-1 gap-3">
                {['Tự đi lại được', 'Cần hỗ trợ một phần', 'Nằm liệt giường', 'Sau tai biến', 'Sa sút trí tuệ'].map(status => (
                  <label key={status} className="flex items-center p-4 bg-white border-2 border-[#bccac1] rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <input type="checkbox" className="w-6 h-6 rounded border-[#6d7a73] text-primary focus:ring-primary transition-all" />
                    <span className="ml-4 text-[18px] text-[#3d4943]">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-3">Ngày muốn đến tham quan</label>
              <div className="flex overflow-x-auto gap-3 hide-scrollbar pb-2">
                {[20, 21, 22, 23, 24].map((day, idx) => (
                  <label key={day} className="flex-shrink-0 cursor-pointer">
                    <input type="radio" name="date" className="peer sr-only" defaultChecked={idx === 0} />
                    <div className="px-5 py-3 text-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition-all">
                      <div className="text-[12px] opacity-80 mb-1">Thứ {idx + 2}</div>
                      <div className="text-[18px] font-bold">{day}/05</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-3">Buổi</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative cursor-pointer">
                  <input type="radio" name="time" className="peer sr-only" defaultChecked />
                  <div className="h-14 flex items-center justify-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-[#e9f7f2] peer-checked:text-primary font-medium transition-all">Sáng (8–11h)</div>
                </label>
                <label className="relative cursor-pointer">
                  <input type="radio" name="time" className="peer sr-only" />
                  <div className="h-14 flex items-center justify-center bg-white border-2 border-[#bccac1] rounded-lg peer-checked:border-primary peer-checked:bg-[#e9f7f2] peer-checked:text-primary font-medium transition-all">Chiều (14–17h)</div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-[16px] font-semibold mb-2">Ghi chú thêm (không bắt buộc)</label>
              <textarea rows={4} placeholder="VD: Mẹ tôi cần phòng riêng, hỏi thêm về gói bán trú..." className="w-full p-4 bg-white border-2 border-[#bccac1] rounded-lg focus:border-primary text-[18px] outline-none resize-none" />
            </div>

            <div className="bg-[#f0f3ff] p-4 rounded-lg border border-[#bccac1]/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0" />
              <p className="text-[13px] text-slate-500 leading-relaxed">
                Thông tin của bạn chỉ được chia sẻ với cơ sở sau khi xác nhận. Không spam, không bán data.
              </p>
            </div>
          </form>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 z-50 pb-safe">
        <div className="max-w-md mx-auto">
          <Link href="/booking-success" className="w-full h-14 bg-primary text-white flex items-center justify-center rounded-lg font-bold text-lg active:scale-[0.98] transition-all shadow-md">
            Xác nhận đặt lịch
          </Link>
        </div>
      </div>
    </div>
  );
}
