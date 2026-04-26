import { 
  Menu, Settings, Edit2, BadgeCheck, Plus, MoreVertical, 
  CalendarDays, Star, Bookmark, Bell, ChevronRight, 
  Headset, HelpCircle, BookOpen, FileText, LogOut 
} from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
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
          <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-[32px] relative">
            <button aria-label="Edit Profile" className="absolute top-[24px] right-[24px] p-2 text-outline hover:text-primary transition-colors">
              <Edit2 className="w-5 h-5" />
            </button>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-gutter">
              <div className="w-[88px] h-[88px] rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-headline-md text-headline-md text-on-primary font-bold">NVA</span>
              </div>
              <div className="text-center md:text-left space-y-base flex-1">
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">Nguyễn Văn A</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">0912 345 xxx</p>
                <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-full mt-2">
                  <BadgeCheck className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  <span className="font-label-lg text-label-lg uppercase text-[14px]">Thành viên An Lão</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 gap-base">
            <div className="bg-surface-container-high rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">2</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Lịch hẹn</span>
            </div>
            <div className="bg-surface-container-high rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">1</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Đánh giá</span>
            </div>
            <div className="bg-surface-container-high rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span className="font-headline-md text-headline-md text-primary font-bold">3</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant text-[14px]">Đã lưu</span>
            </div>
          </div>
        </section>

        <section className="space-y-gutter">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Hồ sơ người thân</h3>
              <p className="font-body-md text-body-md text-outline mt-1 text-[14px]">Hồ sơ giúp An Lão gợi ý cơ sở phù hợp hơn</p>
            </div>
            <button aria-label="Thêm hồ sơ" className="w-[48px] h-[48px] bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-surface-tint transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[32px] flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors font-bold">Mẹ — Nguyễn Thị B</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">72 tuổi</p>
                </div>
                <MoreVertical className="w-6 h-6 text-outline" />
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="bg-surface-container-low text-on-surface px-3 py-1 rounded-full font-label-lg text-label-lg text-[14px]">Huyết áp cao</span>
                <span className="bg-surface-container-low text-on-surface px-3 py-1 rounded-full font-label-lg text-label-lg text-[14px]">Tiểu đường</span>
                <span className="bg-surface-container-low text-on-surface px-3 py-1 rounded-full font-label-lg text-label-lg text-[14px]">Tự đi lại được</span>
              </div>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-[32px] flex flex-col hover:border-primary transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors font-bold">Bà — Trần Thị C</h4>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">85 tuổi</p>
                </div>
                <MoreVertical className="w-6 h-6 text-outline" />
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-lg text-label-lg text-[14px]">Sau tai biến</span>
                <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-lg text-label-lg text-[14px]">Nằm liệt giường</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Hoạt động của tôi</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
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
            <div className="flex items-center justify-between p-4 md:px-6 min-h-[56px]">
              <div className="flex items-center gap-4">
                <Bell className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Thông báo</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input defaultChecked className="sr-only peer" type="checkbox" />
                <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Hỗ trợ</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
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
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <BookOpen className="w-6 h-6 text-primary" />
                <span className="font-body-lg text-body-lg text-on-surface">Hướng dẫn chọn viện dưỡng lão</span>
              </div>
              <ChevronRight className="w-6 h-6 text-outline" />
            </Link>
          </div>
        </section>

        <section className="space-y-margin">
          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">Tài khoản</h3>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden divide-y divide-outline-variant">
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-surface-container-low transition-colors min-h-[56px]">
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-outline" />
                <span className="font-body-lg text-body-lg text-on-surface">Điều khoản &amp; Chính sách bảo mật</span>
              </div>
              <ChevronRight className="w-6 h-6 text-outline" />
            </Link>
            <Link href="#" className="flex items-center justify-between p-4 md:px-6 hover:bg-error-container transition-colors min-h-[56px] group">
              <div className="flex items-center gap-4">
                <LogOut className="w-6 h-6 text-error group-hover:text-on-error-container" />
                <span className="font-body-lg text-body-lg text-error group-hover:text-on-error-container font-medium">Đăng xuất</span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
