import { 
  Bell, Search, ArrowRight, MapPin, Banknote, Sun, 
  Building2, Star, ShieldCheck, Home, Sunset, 
  Stethoscope, Activity, Receipt, MessageSquare, AlertTriangle, Quote, ChevronRight 
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function HomePage() {
  return (
    <div className="bg-background text-on-background font-body-md pb-[96px] md:pb-0">
      <header className="hidden md:flex justify-between items-center w-full px-6 py-4 h-20 bg-white sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <span className="font-bold font-headline-lg text-primary text-2xl">An Lão</span>
          <span className="text-outline font-body-md hidden lg:inline-block border-l border-outline-variant pl-4 ml-2">Tìm nơi chăm sóc cha mẹ — minh bạch, đáng tin</span>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-primary font-bold font-label-lg hover:bg-surface-container-low px-3 py-2 rounded-lg">Trang chủ</Link>
            <Link href="/search" className="text-outline font-label-lg hover:bg-surface-container-low px-3 py-2 rounded-lg">Tìm kiếm</Link>
            <Link href="/appointments" className="text-outline font-label-lg hover:bg-surface-container-low px-3 py-2 rounded-lg">Lịch hẹn</Link>
          </nav>
          <div className="flex items-center gap-4 border-l border-outline-variant pl-6">
            <Link href="/notifications" className="text-outline hover:bg-surface-container-low p-2 rounded-full relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full"></span>
            </Link>
            <Link href="/profile" className="w-10 h-10 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant cursor-pointer relative block">
              <Image alt="User Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnRAFe9HViGHnh3X40D_fGPwB1U6ttoQMT3tNOIwBdnjj4yqWCznSCf16KOj-XxDftp1nkE3suTIpnhDjaagF53LXJO4xFzoCpAANMPKGlhpscBMwSR5cOz5s0-7HrLUMEljHZa_b1VWWPz0VN1d58QvNEKs_YwBVhRNb-MrDCeNHjolKZZmsSGtwiiTy9xndYNx8ouuWv9QrDt2FY-Gm2Hk75wEj9vkM3oFa6ESpMLYcWB4cLZHTjeLHZVB_ZqdmzpKu21QUMzg" fill className="object-cover" />
            </Link>
          </div>
        </div>
      </header>

      <header className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-white sticky top-0 z-40 border-b border-outline-variant">
        <span className="font-bold text-primary font-headline-lg text-2xl">An Lão</span>
        <div className="flex items-center gap-3">
          <Link href="/notifications" className="text-on-surface-variant p-2 rounded-full relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-error rounded-full"></span>
          </Link>
          <Link href="/profile" className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant relative block">
            <Image alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD59M1qhQ-dSN-X85-5nTkdgbvx91oawOfwnhujRiMBArdboC9gESynPCzumQjM7eyY98WGtu2ZsGNNfFpgaqwOQEVem5w22Jpc_KS0489GH9_ziTumwgGGeUZgyYkIrIuLMZNJcQ2xeO8pSRjNGwwB6tTa1chH0galucVAehI4FiP1L8UQT15ZO5bmvZkF1kRX5XWg7InOMa1j1hd4fv1gBCuXe3fiyySsKfQ8fFF-hCxGSi19IMqFD1lIXah6onuy7QMFmPiEiA" fill className="object-cover" />
          </Link>
        </div>
      </header>

      <main className="max-w-container-max mx-auto w-full">
        <section className="px-4 py-8 md:py-16 md:px-margin bg-surface-container-lowest rounded-b-xl md:rounded-xl md:mt-6 border border-outline-variant shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container opacity-5 rounded-bl-full pointer-events-none"></div>
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h1 className="font-display font-bold text-on-surface mb-4">Tìm nơi chăm sóc cha mẹ — minh bạch, đáng tin</h1>
            <p className="font-body-lg text-on-surface-variant mb-8">An Lão giúp bạn dễ dàng so sánh, đánh giá và lựa chọn viện dưỡng lão phù hợp nhất với nhu cầu của gia đình.</p>
            
            <div className="bg-white rounded-xl border-2 border-outline-variant focus-within:border-primary p-2 flex flex-col md:flex-row gap-2 mb-6 shadow-sm">
              <div className="flex-1 flex items-center bg-surface-container-low rounded-lg px-4 py-3 md:py-0">
                <Search className="w-6 h-6 text-outline mr-3" />
                <input className="w-full bg-transparent border-none focus:ring-0 font-body-md text-on-surface placeholder-outline outline-none h-10 md:h-12" placeholder="Tìm viện dưỡng lão tại Hà Nội..." type="text" />
              </div>
              <Link href="/search" className="bg-primary text-on-primary font-label-lg py-3 px-8 rounded-lg h-14 min-h-[56px] hover:bg-primary-container transition-colors flex items-center justify-center gap-2">
                <ArrowRight className="w-6 h-6" />
                Tìm kiếm ngay
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant bg-white text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors text-sm">
                <MapPin className="w-[18px] h-[18px]" /> Gần tôi
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant bg-white text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors text-sm">
                <Banknote className="w-[18px] h-[18px]" /> Dưới 10 triệu
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant bg-white text-on-surface-variant font-label-lg hover:border-primary hover:text-primary transition-colors text-sm">
                <Sun className="w-[18px] h-[18px]" /> Có bán trú
              </button>
            </div>
          </div>
        </section>

        <section className="bg-surface-container px-4 py-6 md:px-margin mt-section-gap rounded-xl mx-4 md:mx-0 flex flex-col md:flex-row justify-around items-center gap-6 border border-surface-variant">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
              <Building2 className="w-6 h-6 text-on-primary-container" />
            </div>
            <div>
              <div className="font-headline-md text-primary font-bold text-2xl">50+</div>
              <div className="font-body-md text-on-surface-variant">cơ sở uy tín</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-outline-variant"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center">
              <Star className="w-6 h-6 text-on-secondary-container" fill="currentColor" />
            </div>
            <div>
              <div className="font-headline-md text-secondary font-bold text-2xl">200+</div>
              <div className="font-body-md text-on-surface-variant">đánh giá thật</div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-outline-variant"></div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-on-tertiary-container" />
            </div>
            <div>
              <div className="font-headline-md text-tertiary font-bold text-2xl">100%</div>
              <div className="font-body-md text-on-surface-variant">Minh bạch</div>
            </div>
          </div>
        </section>

        <section className="mt-section-gap px-4 md:px-margin">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-headline-lg font-bold text-on-surface">Cơ sở nổi bật</h2>
              <p className="font-body-md text-on-surface-variant mt-2">Các viện dưỡng lão được đánh giá cao nhất trong tháng.</p>
            </div>
            <Link href="/search" className="hidden md:flex items-center gap-1 text-primary font-label-lg hover:underline">
              Xem tất cả <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar snap-x">
            {/* Card 1 */}
            <div className="min-w-[320px] md:min-w-[380px] bg-white rounded-xl border border-outline-variant overflow-hidden snap-center flex flex-col">
              <div className="h-48 relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZdVrJSc5vDMwSFZF5Vr_ZRZ_5a1TEAJBUrXpfa-djdCS29wNaBIBpocNFaMAiNtt8iIDOwzUdtFjzLkxoFEh9N7Cs5ngiWOpAETUREs3caFlKIE5-KtPKoxt1cRvuOjCwoDQZd2KYp1S3Xt4zwVTcPUbzmfRFzD4xOjqwkUrMo39E7IGYTKIZ2kJJo56a2kH4u0Yz1r99LVF4WCz8l10MPLh928HbUET3xUHHIY0CHD1U9MgdBrH7reonYT--Wun_v3Yrbwr08w" alt="Viện Dưỡng Lão Diên Hồng" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-primary text-white font-label-lg text-sm px-3 py-1 rounded-full uppercase tracking-wider">
                  Nổi bật
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md font-bold text-on-surface line-clamp-1 text-xl">Lotus Care</h3>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-body-md mb-3 text-sm">
                  <MapPin className="w-[18px] h-[18px]" /> Hà Đông, Hà Nội
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                  </div>
                  <span className="font-label-lg font-bold text-on-surface">4.8</span>
                  <span className="text-on-surface-variant text-sm">(45 đánh giá)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Vườn dạo bộ</span>
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Bác sĩ 24/7</span>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div>
                    <span className="text-sm text-on-surface-variant">Từ</span>
                    <div className="font-pricing-display font-bold text-on-secondary-fixed-variant text-2xl">8.5<span className="text-lg">tr</span><span className="text-sm font-body-md font-normal text-on-surface-variant">/tháng</span></div>
                  </div>
                  <Link href="/facility/lotus-care" className="bg-white border-2 border-primary text-primary font-label-lg px-4 py-2 rounded-lg min-h-[48px] hover:bg-surface-container-low transition-colors flex items-center justify-center font-bold">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[320px] md:min-w-[380px] bg-white rounded-xl border border-outline-variant overflow-hidden snap-center flex flex-col">
              <div className="h-48 relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6ZwB0BGWwZBkxNyd7cDbvoCBUTarDzK4rhE2qNhkkY-YbkDcQt3FtjVJPYFQ2o4HAhuotyHzEc3_AyFLDyzHqIZHG1aIBm38OU9FX1mxEHxccN5wBIHFxC0vwVNL2oHkn7ZAGXsZ73GOfO-8Q7l4LFGkPLL3DSI2OZ46YAfw2LJ_hXaaywCyqkx47dLs2SGTnvYcSAZ9FJLhBRTeP08ip4rVrtEjteN3AxSKdC9tF1bBZ6TP69GETp0KC9_2t3o6c6jwiQlJRJg" alt="Trung tâm Bách Niên" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md font-bold text-on-surface line-clamp-1 text-xl">Trung tâm Bách Niên</h3>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-body-md mb-3 text-sm">
                  <MapPin className="w-[18px] h-[18px]" /> Cầu Giấy, Hà Nội
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" />
                  </div>
                  <span className="font-label-lg font-bold text-on-surface">4.0</span>
                  <span className="text-on-surface-variant text-sm">(28 đánh giá)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Vật lý trị liệu</span>
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Phòng đơn</span>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div>
                    <span className="text-sm text-on-surface-variant">Từ</span>
                    <div className="font-pricing-display font-bold text-on-secondary-fixed-variant text-2xl">12.0<span className="text-lg">tr</span><span className="text-sm font-body-md font-normal text-on-surface-variant">/tháng</span></div>
                  </div>
                  <button className="bg-white border-2 border-primary text-primary font-label-lg px-4 py-2 rounded-lg min-h-[48px] hover:bg-surface-container-low transition-colors font-bold">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="min-w-[320px] md:min-w-[380px] bg-white rounded-xl border border-outline-variant overflow-hidden snap-center flex flex-col">
              <div className="h-48 relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZj4_HtlWEGOxij2b6RNOrjk0J0moZNihPt1yufyhEJbC56BG9pGGyewP7hl9LHx-0561kdKQbyoV-QnliGFtirsn6xqlhA3nNCVRB0OmXBMSzQgo4WS4q7moPsiE9XBSou471oiYUVpG-o_KwlJj_ZldgVqQ9LQWjs89hXDNsPs4HE41mgDEtjG6Q03G5hLKbWARmQfK0QlXANb8R_y2ZWMzbxYliY9tjxO9Ki1hpUX_apKgElPY_CnGhMpRnWUm0Kj9gi2F2zg" alt="Viện Dưỡng Lão Tuệ Tĩnh" fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline-md font-bold text-on-surface line-clamp-1 text-xl">Viện Dưỡng Lão Tuệ Tĩnh</h3>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-body-md mb-3 text-sm">
                  <MapPin className="w-[18px] h-[18px]" /> Thanh Xuân, Hà Nội
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-500">
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                    <Star className="w-5 h-5" fill="currentColor" />
                  </div>
                  <span className="font-label-lg font-bold text-on-surface">5.0</span>
                  <span className="text-on-surface-variant text-sm">(89 đánh giá)</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Chăm sóc giảm nhẹ</span>
                  <span className="bg-surface-container px-3 py-1 rounded-full text-xs font-label-lg font-semibold text-on-surface-variant">Ăn kiêng Y tế</span>
                </div>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <div>
                    <span className="text-sm text-on-surface-variant">Từ</span>
                    <div className="font-pricing-display font-bold text-on-secondary-fixed-variant text-2xl">9.5<span className="text-lg">tr</span><span className="text-sm font-body-md font-normal text-on-surface-variant">/tháng</span></div>
                  </div>
                  <button className="bg-white border-2 border-primary text-primary font-label-lg px-4 py-2 rounded-lg min-h-[48px] hover:bg-surface-container-low transition-colors font-bold">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <Link href="/search" className="md:hidden block text-center text-primary font-label-lg font-bold hover:underline mt-4">
            Xem tất cả cơ sở
          </Link>
        </section>

        <section className="mt-section-gap px-4 md:px-margin">
          <h2 className="font-headline-lg font-bold text-on-surface mb-8 text-center text-3xl">Khám phá theo nhu cầu</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link href="#" className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:shadow-sm transition-all group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Home className="w-8 h-8 text-on-surface-variant group-hover:text-on-primary-container" />
              </div>
              <h3 className="font-label-lg font-bold text-on-surface text-lg">Nội trú</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-2 hidden md:block">Chăm sóc toàn diện 24/7 tại cơ sở.</p>
            </Link>
            <Link href="#" className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:shadow-sm transition-all group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Sunset className="w-8 h-8 text-on-surface-variant group-hover:text-on-primary-container" />
              </div>
              <h3 className="font-label-lg font-bold text-on-surface text-lg">Bán trú</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-2 hidden md:block">Sinh hoạt ban ngày, tối về với gia đình.</p>
            </Link>
            <Link href="#" className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:shadow-sm transition-all group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Stethoscope className="w-8 h-8 text-on-surface-variant group-hover:text-on-primary-container" />
              </div>
              <h3 className="font-label-lg font-bold text-on-surface text-lg">Chăm sóc tại nhà</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-2 hidden md:block">Điều dưỡng viên hỗ trợ tận nơi.</p>
            </Link>
            <Link href="#" className="bg-white border border-outline-variant rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-primary hover:shadow-sm transition-all group">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-primary-container transition-colors">
                <Activity className="w-8 h-8 text-on-surface-variant group-hover:text-on-primary-container" />
              </div>
              <h3 className="font-label-lg font-bold text-on-surface text-lg">Sau tai biến</h3>
              <p className="font-body-md text-on-surface-variant text-sm mt-2 hidden md:block">Phục hồi chức năng chuyên sâu.</p>
            </Link>
          </div>
        </section>

        <section className="mt-section-gap bg-surface-container-low py-16 px-4 md:px-margin rounded-xl mx-4 md:mx-0">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-headline-lg font-bold text-on-surface mb-12 text-center text-3xl">Khác biệt của chúng tôi</h2>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-xl border border-outline-variant">
                <div className="w-14 h-14 shrink-0 rounded-full bg-primary-container flex items-center justify-center">
                  <Receipt className="w-7 h-7 text-on-primary-container" />
                </div>
                <div>
                  <h3 className="font-headline-md font-bold text-on-surface mb-2 text-xl">Giá minh bạch</h3>
                  <p className="font-body-lg text-on-surface-variant">Mọi chi phí từ phí cơ bản đến phụ phí chăm sóc đặc biệt đều được niêm yết rõ ràng. Không có chi phí ẩn, giúp gia đình chủ động tài chính.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-xl border border-outline-variant">
                <div className="w-14 h-14 shrink-0 rounded-full bg-secondary-container flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-on-secondary-container" />
                </div>
                <div>
                  <h3 className="font-headline-md font-bold text-on-surface mb-2 text-xl">Review đã xác minh</h3>
                  <p className="font-body-lg text-on-surface-variant">Chỉ những tài khoản đã thực sự sử dụng dịch vụ thông qua hệ thống An Lão mới được phép để lại đánh giá. Đảm bảo thông tin chân thực, khách quan.</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-6 items-start bg-white p-6 rounded-xl border border-outline-variant">
                <div className="w-14 h-14 shrink-0 rounded-full bg-error-container flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-on-error-container" />
                </div>
                <div>
                  <h3 className="font-headline-md font-bold text-on-surface mb-2 text-xl">Cảnh báo rủi ro</h3>
                  <p className="font-body-lg text-on-surface-variant">Cung cấp báo cáo minh bạch về các vi phạm, phàn nàn phổ biến hoặc vấn đề cấp phép của từng cơ sở (nếu có) để gia đình cân nhắc kỹ lưỡng trước khi quyết định.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-section-gap px-4 md:px-margin">
          <div className="max-w-3xl mx-auto bg-white border border-outline-variant rounded-xl p-8 md:p-12 relative text-center">
            <Quote className="w-16 h-16 text-surface-variant absolute top-6 left-6 opacity-50" />
            <div className="flex justify-center text-amber-500 mb-6">
              <Star className="w-8 h-8" fill="currentColor" />
              <Star className="w-8 h-8" fill="currentColor" />
              <Star className="w-8 h-8" fill="currentColor" />
              <Star className="w-8 h-8" fill="currentColor" />
              <Star className="w-8 h-8" fill="currentColor" />
            </div>
            <p className="font-body-lg text-on-surface text-xl mb-8 relative z-10 italic">
              &quot;Sau khi mẹ tôi bị tai biến, việc tìm kiếm một nơi chăm sóc chuyên nghiệp khiến tôi rất mệt mỏi vì thông tin trên mạng quá nhiễu loạn. Nhờ An Lão, tôi đã tìm được một cơ sở gần nhà với bảng giá rõ ràng và đánh giá chân thực từ các gia đình khác. Bây giờ tôi rất an tâm khi mẹ được chăm sóc tốt.&quot;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-surface-container overflow-hidden relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXWmXo0JdaTuPYFksGNg5kZYO2pAofJUJE4JwMoy5RNcySXwc5oLUoInEXpKYdbKGvJ1BVuYtm0e0O_HHarlZwZGwdSusYZDmJzS2i8zbY8UjI9-8_34OehqbZ6QTP6s9dbizcdkQdc6R3gJGF5afA1CUf5unmRIiXH7djH53IEbOh0y-W7RLqkhyY8NLSgm19NZQGWq4wTLgXcfqovVlL0wJtE6VyaoY6zwvtzf6zoF4zOcrZl-aA8JMLved9AIq3nZDo2p-YSg" alt="Chị N.T.H" fill className="object-cover" />
              </div>
              <div className="text-left">
                <div className="font-headline-md font-bold text-on-surface text-lg">Chị N.T.H</div>
                <div className="font-body-md text-on-surface-variant">Hà Nội</div>
              </div>
            </div>
          </div>
        </section>

        <section className="my-section-gap px-4 md:px-margin">
          <div className="bg-primary text-on-primary rounded-xl p-8 md:p-12 text-center flex flex-col items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576765608532-0739c13b28b7?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-headline-lg font-bold mb-4 text-3xl">Bắt đầu tìm kiếm miễn phí</h2>
              <p className="font-body-lg mb-8 opacity-90">Hàng ngàn gia đình đã tìm được nơi chăm sóc ưng ý cho người thân yêu thông qua nền tảng An Lão. Hãy để chúng tôi đồng hành cùng bạn.</p>
              <Link href="/search" className="bg-white text-primary font-label-lg font-bold py-4 px-10 rounded-lg min-h-[56px] hover:bg-surface-container-lowest transition-colors shadow-sm inline-flex items-center justify-center gap-2 text-lg">
                Tìm ngay <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
