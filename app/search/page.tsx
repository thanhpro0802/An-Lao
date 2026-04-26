import BottomNav from "@/components/BottomNav";
import { Menu, Bell, Search, ChevronDown, Star, AlertTriangle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-surface pb-24 text-[#111c2c]">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-50 transition-colors rounded-full active:scale-95 duration-150">
            <Menu className="w-6 h-6 text-primary" />
          </button>
          <Link href="/notifications">
            <h1 className="font-bold text-2xl text-primary">Tìm kiếm</h1>
          </Link>
        </div>
        <Link href="/notifications" className="p-2 hover:bg-slate-50 transition-colors rounded-full active:scale-95 duration-150">
          <Bell className="w-6 h-6 text-primary" />
        </Link>
      </header>

      <main className="mt-16 max-w-5xl mx-auto px-4 pt-6">
        <section className="mb-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            <input 
              type="text"
              placeholder="Tìm viện dưỡng lão tại Hà Nội..."
              className="w-full h-14 pl-12 pr-4 bg-white border-2 border-[#f0f3ff] rounded-2xl focus:border-primary focus:ring-0 outline-none text-[16px] shadow-sm transition-all"
            />
          </div>
        </section>

        <section className="mb-6 overflow-x-auto whitespace-nowrap -mx-4 px-4 hide-scrollbar flex gap-3">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#bccac1] rounded-full font-semibold hover:border-primary hover:text-primary transition-colors active:scale-95 group">
            Quận/Huyện <ChevronDown className="w-4 h-4 group-hover:text-primary" />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#bccac1] rounded-full font-semibold hover:border-primary hover:text-primary transition-colors active:scale-95 group">
            Giá <ChevronDown className="w-4 h-4 group-hover:text-primary" />
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary text-primary rounded-full font-semibold transition-colors active:scale-95">
            Bán trú
          </button>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#bccac1] rounded-full font-semibold hover:border-primary hover:text-primary transition-colors active:scale-95">
            Nhận tai biến
          </button>
        </section>

        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[24px] font-semibold">Kết quả tìm kiếm</h2>
          <p className="text-slate-500 font-semibold">3 cơ sở phù hợp</p>
        </div>

        <div className="flex flex-col gap-4">
          <article className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-all hover:border-primary hover:shadow-md group">
            <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_homVbaPJ2MaU-4hieP_zOyFkfkbb72l6erwj8H_ytHmWoORAlPqa3KAip7qVPhHopubXEU0LL_AhwpoZZpkjagCaswKIaNXRzyGiBzuMD_t30_c4KMuycUSzUq6J3Y0zxrqMQKaFlmMHsTWvUPqWHASqvNklEBjF-KOBlaP4anQAGq5MyZsnm93jm2S3t9gddvglYwkOx2hwraE5xNmiYWeatsqO1wDII8BgT0ddnIofJ9ngTR0cCCGq8E4D5G1fSTqYFy-f_w" alt="Thiên Đức" fill className="object-cover" />
            </div>
            <div className="flex-grow flex flex-col justify-between py-2">
              <div>
                <h3 className="text-[24px] font-semibold text-primary mb-2">Viện dưỡng lão Thiên Đức - Quận Bắc Từ Liêm</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" fill="currentColor" />
                  <span className="font-bold text-[16px]">4.8</span>
                  <span className="text-slate-500 text-sm">(124 đánh giá đã xác minh)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Camera', 'Bán trú', 'Xe đưa đón'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary font-bold uppercase text-[12px] rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold text-sm">Giá tham khảo</span>
                  <span className="text-[36px] font-bold text-[#3d4943] leading-none mt-1">6 – 11 <span className="text-xl font-normal">triệu/tháng</span></span>
                </div>
                <Link href="/facility/thien-duc" className="h-14 px-8 bg-primary text-white rounded-xl font-semibold active:scale-95 transition-transform hover:brightness-110 flex justify-center items-center">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-all hover:border-error hover:shadow-md">
            <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuYggcEdW1iqPN9z6-FIbQmyzsvG5qaHfF9GaqEOI_-BmfUQ6pVsRP-E9vckTcv838o2yBn4pYUe4Im1MBE8S6olzAAZIyddxPz7UyL8qkvYAMi0qMWi11XYIhDAlj-7Xn21PvtsA0MLB8kFdV2vugTq4Sam1Eg-W15oGYqjLFgnNsexDXZYtsZAceWukSH-3YTN17_0smhqcgEzkGyCLrvvSlEpVgvDtIRw-cXZTvHsBUmGZx0fttvdVnh5ekaVpQ9Rw-G8mdvw" alt="Bình Minh" fill className="object-cover" />
            </div>
            <div className="flex-grow flex flex-col justify-between py-2">
              <div>
                <h3 className="text-[24px] font-semibold text-slate-800 mb-2">Trung tâm dưỡng lão Bình Minh - Quận Hà Đông</h3>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" fill="currentColor" />
                  <span className="font-bold text-[16px]">3.5</span>
                  <span className="text-slate-500 text-sm">(45 đánh giá đã xác minh)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-error text-white font-bold uppercase text-[12px] rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Cần xem xét
                  </span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold text-sm">Giá tham khảo</span>
                  <span className="text-[36px] font-bold text-[#3d4943] leading-none mt-1">5 – 9 <span className="text-xl font-normal">triệu/tháng</span></span>
                </div>
                <Link href="/facility/binh-minh" className="h-14 px-8 bg-primary text-white rounded-xl font-semibold active:scale-95 transition-transform hover:brightness-110 flex justify-center items-center">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </article>

          <article className="bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col md:flex-row gap-6 transition-all hover:border-primary hover:shadow-md">
            <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2vpEl8xUeXGfLGJ2Co7c1ZY-xGGPneiUrNCcTqUoF7XrOQaq4w7PdZGLxF6CyKTJG7UG3NbKW6Jkq8I6Jo1BLvgY858MiSGUi7YRFSpS-0-fX52MCCoBWj2lOvmRx8k-ca6l-mwwv1VjcoOs-hKydMtmaiV9on29WVG8Dyymt1h3R8fYdbN5q2na9VMExo9V-qoffaEAp2NeEpL2qtk9zyYuM3waDcyh5KIanI4la8PyBZwhdZq7yoAGJ9Ne9wFokm515pu9a6A" alt="Lotus Care" fill className="object-cover" />
            </div>
            <div className="flex-grow flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-[24px] font-semibold text-primary">Lotus Care - Quận Cầu Giấy</h3>
                  <BadgeCheck className="w-6 h-6 text-primary" fill="currentColor" stroke="white" />
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" fill="currentColor" />
                  <span className="font-bold text-[16px]">5.0</span>
                  <span className="text-slate-500 text-sm">(89 đánh giá đã xác minh)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Y tế 24/7', 'Bán trú'].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-primary/10 text-primary font-bold uppercase text-[12px] rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="text-slate-500 font-semibold text-sm">Giá tham khảo</span>
                  <span className="text-[36px] font-bold text-[#3d4943] leading-none mt-1">15 – 25 <span className="text-xl font-normal">triệu/tháng</span></span>
                </div>
                <Link href="/facility/lotus-care" className="h-14 px-8 bg-primary text-white rounded-xl font-semibold active:scale-95 transition-transform hover:brightness-110 flex justify-center items-center">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
