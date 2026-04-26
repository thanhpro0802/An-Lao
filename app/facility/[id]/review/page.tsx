import { ArrowLeft, BadgeCheck, Star, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SubmitReviewPage() {
  return (
    <div className="bg-surface text-[#111c2c] min-h-screen pb-40">
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#E2E8F0] flex items-center h-16 px-4 max-w-md mx-auto relative md:max-w-none md:justify-center mb-16">
        <Link href="/facility/lotus-care" className="absolute left-4 active:opacity-70 transition-opacity">
          <ArrowLeft className="w-6 h-6 text-primary" />
        </Link>
        <h1 className="font-semibold text-lg text-primary">Chia sẻ trải nghiệm</h1>
      </header>

      <main className="pt-20 px-4 max-w-md mx-auto space-y-6">
        <section className="bg-white border border-[#E2E8F0] rounded-lg p-4 flex items-center gap-4 shadow-sm">
          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 relative">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmBY6VF_jRMZoJPaeFn89opwiKk2US127ci5mNYMysbj-s-bas60BfNIJ7iAmS4hSQsBdvOpYeNpBlUe9Om0wVE340jqE_-05S6yg1pCCuM0bjTjEaQvD7nTiEHIV6K5ipFnUtzq_PRqsqaSy-4aHwgSPVr2JRMoGuP27MvBmKIzJrMqRx2Hh--4ZuaKOuDGAF8pjS9v4rGIvu53dd7h9AJi8f8P1Pc8TjtSM_QtGCgMMsot0cI2zdL_pM6tQSgxtVaJ1uj6Io5Q" alt="Lotus Care" fill className="object-cover" />
          </div>
          <div className="flex-grow">
            <h2 className="text-[18px] font-bold leading-tight">Lotus Care - Quận Cầu Giấy</h2>
            <p className="text-[14px] text-[#6d7a73] mt-1">Bạn đã tham quan ngày 20/05/2026</p>
          </div>
        </section>

        <section className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3">
          <div className="shrink-0">
            <BadgeCheck className="w-6 h-6 text-primary" fill="currentColor" stroke="white" />
          </div>
          <div>
            <p className="text-[14px] font-semibold">
              ✓ Đánh giá của bạn sẽ được gắn nhãn &apos;Gia đình đã xác minh&apos;
            </p>
            <p className="text-[12px] text-[#6d7a73] mt-1">
              Chúng tôi xác minh qua lịch hẹn đã đặt trên YênTâm
            </p>
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-lg p-6 text-center shadow-sm">
          <h3 className="text-[16px] font-semibold mb-4">Đánh giá tổng thể</h3>
          <div className="flex justify-center gap-2">
            {[1,2,3,4].map(i => <Star key={i} className="w-10 h-10 text-primary cursor-pointer" fill="currentColor" />)}
            <Star className="w-10 h-10 text-slate-300 cursor-pointer" />
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-lg p-6 space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-medium">Vệ sinh & môi trường</span>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-primary" fill="currentColor" />)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-medium">Thái độ nhân viên</span>
            <div className="flex gap-1">
              {[1,2,3].map(i => <Star key={i} className="w-5 h-5 text-primary" fill="currentColor" />)}
              {[4,5].map(i => <Star key={i} className="w-5 h-5 text-slate-300" />)}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[16px] font-medium">Minh bạch chi phí</span>
            <div className="flex gap-1">
              {[1,2,3,4].map(i => <Star key={i} className="w-5 h-5 text-primary" fill="currentColor" />)}
              <Star className="w-5 h-5 text-slate-300" />
            </div>
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
          <h3 className="text-[16px] font-semibold mb-3">Chia sẻ chi tiết (không bắt buộc)</h3>
          <div className="relative">
            <textarea 
              className="w-full h-32 p-4 border border-[#bccac1] rounded-lg focus:border-primary focus:ring-1 focus:ring-primary text-[16px] placeholder-slate-400 resize-none outline-none" 
              placeholder="VD: Nhân viên rất tận tâm, nhưng phòng hơi nhỏ. Chi phí phát sinh thêm khoảng 2 triệu/tháng ngoài báo giá ban đầu..."
            ></textarea>
            <span className="absolute bottom-3 right-3 text-[12px] text-[#6d7a73]">0/500</span>
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
          <h3 className="text-[16px] font-semibold mb-3">Thêm ảnh thực tế (không bắt buộc)</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="aspect-square border-2 border-dashed border-primary rounded-lg flex items-center justify-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer group">
              <Camera className="w-6 h-6 text-primary" />
            </div>
            <div className="aspect-square border-2 border-dashed border-[#bccac1] rounded-lg flex items-center justify-center bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors cursor-pointer">
              <Camera className="w-6 h-6 text-[#6d7a73]" />
            </div>
            <div className="aspect-square border-2 border-dashed border-[#bccac1] rounded-lg flex items-center justify-center bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors cursor-pointer">
              <Camera className="w-6 h-6 text-[#6d7a73]" />
            </div>
          </div>
        </section>

        <section className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-semibold">Ẩn họ tên đầy đủ</h3>
              <p className="text-[14px] text-[#6d7a73] mt-1">Tên hiển thị sẽ là &apos;Chị N.T.H&apos; thay vì tên đầy đủ</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 w-full bg-white p-4 border-t border-[#E2E8F0] z-50 pb-safe">
        <div className="max-w-md mx-auto">
          <button className="w-full h-12 bg-primary text-white font-semibold text-[16px] rounded-lg active:scale-95 transition-transform duration-150 flex items-center justify-center">
            Gửi đánh giá
          </button>
          <p className="text-[12px] text-[#6d7a73] text-center mt-3">
            Đánh giá sẽ được kiểm duyệt trong 24 giờ trước khi hiển thị
          </p>
        </div>
      </footer>
    </div>
  );
}
