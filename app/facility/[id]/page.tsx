import { ArrowLeft, Share2, MapPin, Star, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FacilityDetails() {
  return (
    <div className="min-h-screen bg-surface pb-28 text-[#111c2c]">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-[#E2E8F0]">
        <Link href="/" className="p-2 text-primary hover:bg-slate-50 rounded-full active:scale-95 duration-200">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-semibold text-lg text-primary flex-1 px-4 truncate text-center">
          An Lão
        </h1>
        <button className="p-2 text-primary hover:bg-slate-50 rounded-full active:scale-95 duration-200">
          <Share2 className="w-6 h-6" />
        </button>
      </header>

      <main className="mt-16">
        {/* Photos */}
        <section className="relative w-full aspect-[4/3] overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full">
            <div className="flex-none w-full h-full snap-center relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAntsfUo1RvoLVnCCEzejzYT4JQeGoPzPT2N0fWJrTpR2aUNM8krOzl65csTZq1d-D1l1ZY3s9Go6j13p0OIX9015lQbS722prys74IrHq7DnVDyNeaU0xMFppndUVKizhVu1NrFY4wYskEQTODag1qITpkAwVJcmfi-NE0SEHrFn_7UIdFQ86XnU1KwVf4lR6ttZ1JbsDoTLIAirY3Fe9TM3rY2RcgqrPO1h8CYOZwk_PpEhTot9oA4Aefg7q4QTLsMSE91z_A-w" alt="Lotus Care Room 1" fill className="object-cover" />
            </div>
            <div className="flex-none w-full h-full snap-center relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDICZoi-10AEKVShkHWPnW6w25qwAM9Fd3B8UL87XjLE73jWBGm59IyawXQrdZ2WK_RzQeS_wQSjWh0XpEJi00KGR4KlsiPVd-TjNzbQkKJk0DjhEBjd6WcVxqxTLkmsmSr7c0pEL2LmB_mYo8f4oVgn9xjjtXYB-Ub_fRhIn8gJdFUU99uYWKJ8d5jfB__isQcIg_i5xtzEFs67FIEgXprMYKQeI_vjjrxUNNsEDeaKUB1Ez0NyD2VGXIPER2b1xQqRwb1YmP5XQ" alt="Lotus Care Room 2" fill className="object-cover" />
            </div>
          </div>
          <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-[12px] font-bold uppercase">Đã xác minh</span>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
        </section>

        {/* Basic Info */}
        <section className="px-6 pt-8 bg-white border-b border-[#E2E8F0]">
          <h2 className="text-[32px] font-semibold mb-2">Lotus Care - Quận Cầu Giấy</h2>
          <div className="flex items-start gap-2 mb-4 text-[#6d7a73]">
            <MapPin className="w-5 h-5 mt-0.5 text-primary" />
            <p className="text-[18px]">123 Đường Cầu Giấy, Hà Nội</p>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center text-primary">
              <Star className="w-6 h-6" fill="currentColor" />
              <span className="font-semibold text-[24px] ml-1">5.0</span>
            </div>
            <Link href="/facility/lotus-care/review" className="text-[16px] font-semibold text-primary underline decoration-primary/30">
              89 đánh giá đã xác minh
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 pb-8">
            {['Y TẾ 24/7', 'BÁN TRÚ', 'CAMERA', 'XE ĐƯA ĐÓN', 'NHẬN TAI BIẾN'].map((tag) => (
              <span key={tag} className="bg-primary text-white font-semibold text-[14px] px-3 py-1 rounded-full uppercase tracking-wider">{tag}</span>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="p-6 bg-[#f0f3ff] border-b border-[#E2E8F0]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[24px] font-semibold text-[#2a4d43]">Chi phí thực tế</h3>
            <div className="w-6 h-6 rounded-full bg-slate-300 text-white flex justify-center items-center font-bold text-sm">i</div>
          </div>
          <div className="mb-6">
            <span className="text-[36px] font-bold text-primary">15 – 25</span>
            <span className="text-[20px] text-[#2a4d43] font-semibold ml-2">triệu/tháng</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary rounded-xl flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
              <div>
                <p className="text-[18px] text-primary font-semibold">Đã bao gồm:</p>
                <p className="text-[18px] text-[#3d4943] mt-1">Ăn uống, chăm sóc cơ bản, điện nước sinh hoạt.</p>
              </div>
            </div>
            <div className="p-4 bg-error/10 border border-error/30 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-error shrink-0" />
              <div>
                <p className="text-[18px] text-error font-semibold">Tính riêng:</p>
                <p className="text-[18px] text-[#93000a] mt-1">Thuốc theo đơn, bỉm, vật tư y tế chuyên sâu.</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs italic text-[#6d7a73]">Nguồn: khảo sát thực tế tháng 4/2026</p>
        </section>

        {/* About */}
        <section className="p-6 bg-white border-b border-[#E2E8F0]">
          <h3 className="text-[24px] font-semibold mb-4">Về cơ sở</h3>
          <p className="text-[18px] text-[#3d4943] leading-relaxed">
            Lotus Care là hệ thống chăm sóc người cao tuổi cao cấp được thành lập từ năm 2018. Với quy mô hơn 100 giường và đội ngũ y tế trực 24/7, chúng tôi cam kết mang lại môi trường sống an lành, ổn định và nhân văn nhất cho các cụ.
          </p>
          <button className="mt-4 text-[16px] font-semibold text-primary flex items-center gap-1 active:scale-95 transition-transform">
            Xem thêm <ChevronDown className="w-5 h-5" />
          </button>
        </section>

        {/* Reviews */}
        <section className="p-6 bg-white border-b border-transparent">
          <h3 className="text-[24px] font-semibold mb-6">Đánh giá từ gia đình thật</h3>
          <div className="space-y-4">
            <article className="p-6 border border-[#bccac1] rounded-2xl bg-[#f9f9ff]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-[16px] font-semibold">Chị N.T.H</h4>
                  <p className="text-sm text-[#6d7a73]">Con gái của cụ đang ở đây</p>
                </div>
                <div className="flex text-primary">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-[18px] h-[18px]" fill="currentColor" />)}
                </div>
              </div>
              <p className="text-[18px] text-[#3d4943] italic">&quot;Gia đình rất yên tâm khi gửi bà tại đây. Các điều dưỡng cực kỳ nhẹ nhàng và kiên nhẫn với người già.&quot;</p>
            </article>

            <article className="p-6 border border-[#bccac1] rounded-2xl bg-[#f9f9ff]">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-[16px] font-semibold">Anh T.M.P</h4>
                  <p className="text-sm text-[#6d7a73]">Người thân của cụ đã xuất viện</p>
                </div>
                <div className="flex text-primary">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-[18px] h-[18px]" fill="currentColor" />)}
                </div>
              </div>
              <p className="text-[18px] text-[#3d4943] italic">&quot;Phòng ốc sạch sẽ như khách sạn, chế độ dinh dưỡng rất khoa học giúp sức khỏe của bố tôi cải thiện rõ rệt.&quot;</p>
            </article>
          </div>
          <Link href="/facility/lotus-care/review" className="block text-center mt-8 text-[16px] font-semibold text-primary p-4 border border-primary rounded-xl active:scale-95 transition-transform">
            Xem tất cả 89 đánh giá
          </Link>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] shadow-lg pb-safe">
        <div className="flex flex-col">
          <span className="text-xs text-[#6d7a73] uppercase tracking-tight font-medium">Giá chỉ từ</span>
          <span className="text-[24px] font-semibold text-primary leading-none">15 triệu<span className="text-sm font-normal">/tháng</span></span>
        </div>
        <Link href="/facility/lotus-care/book" className="bg-primary text-white text-[18px] font-semibold px-8 py-4 rounded-xl shadow-md active:scale-95 transition-all">
          Đặt lịch tham quan
        </Link>
      </nav>
    </div>
  );
}
