"use client";

import { Menu, Bell, CalendarDays, User, Stethoscope, Lightbulb, Clock, CheckCircle2, XCircle, Building2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchApi } from "@/lib/api";

interface BookingResponse {
  id: number;
  facilityId: number;
  facilityName: string;
  contactName: string;
  contactPhone: string;
  relativeType: string;
  healthStatuses: string[];
  visitDate: string;
  visitTime: string;
  note: string;
  status: string;
  adminNote: string;
  cancelReason: string;
  hasReviewed: boolean;
  createdAt: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "COMPLETED" | "CANCELLED">("UPCOMING");
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState<number | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(`/login?redirect=/appointments`);
    }
  }, [user, isAuthLoading, router]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const response = await fetchApi('/bookings/me');
      if (response.status === 200 && response.data?.data) {
        // Sort bookings by creation date (newest first) or visit date
        const sortedBookings = (response.data.data as BookingResponse[]).sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setBookings(sortedBookings);
      }
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const handleCancelBooking = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?")) return;
    
    try {
      setIsCancelling(id);
      const response = await fetchApi(`/bookings/${id}/cancel`, {
        method: 'PUT'
      });
      if (response.status === 200) {
        // Reload bookings to reflect the new status
        await loadBookings();
        // Switch to CANCELLED tab automatically
        setActiveTab("CANCELLED");
      } else {
        alert(response.data?.message || "Đã xảy ra lỗi khi hủy lịch.");
      }
    } catch (err) {
      alert("Đã xảy ra lỗi hệ thống.");
    } finally {
      setIsCancelling(null);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "VDL";
    const parts = name.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter(booking => {
    if (activeTab === "UPCOMING") return booking.status === "PENDING" || booking.status === "CONFIRMED";
    if (activeTab === "COMPLETED") return booking.status === "COMPLETED";
    if (activeTab === "CANCELLED") return booking.status === "CANCELLED" || booking.status === "REJECTED";
    return false;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <span className="bg-amber-100 text-amber-800 text-[14px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1"><Clock className="w-4 h-4" /> Chờ xác nhận</span>;
      case "CONFIRMED":
        return <span className="bg-primary text-white text-[14px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Đã xác nhận</span>;
      case "COMPLETED":
        return <span className="bg-[#dbe4e2] text-[#404947] text-[14px] font-bold px-3 py-1 rounded-full uppercase">Đã tham quan</span>;
      case "CANCELLED":
      case "REJECTED":
        return <span className="bg-error-container text-on-error-container text-[14px] font-bold px-3 py-1 rounded-full uppercase inline-flex items-center gap-1"><XCircle className="w-4 h-4" /> Đã hủy</span>;
      default:
        return null;
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24 md:pb-0 md:pt-20">
      <header className="bg-white border-b border-outline-variant sticky top-0 z-40 md:hidden">
        <div className="flex items-center justify-between w-full h-16 px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="text-primary active:scale-95 transition-all duration-200">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="font-headline-sm font-bold tracking-tight text-primary">Lịch hẹn của tôi</h1>
          </div>
          <button className="text-primary active:scale-95 transition-all duration-200 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
          </button>
        </div>
      </header>

      <main className="max-w-container-max mx-auto px-4 md:px-gutter py-6">
        <h1 className="hidden md:block font-headline-lg font-bold text-on-surface mb-6">Quản lý Lịch hẹn</h1>

        <nav className="flex border-b border-outline-variant overflow-x-auto hide-scrollbar sticky top-16 md:top-0 bg-surface z-30">
          <button 
            onClick={() => setActiveTab("UPCOMING")}
            className={`px-6 py-4 font-label-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === "UPCOMING" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            Sắp diễn ra ({bookings.filter(b => b.status === "PENDING" || b.status === "CONFIRMED").length})
          </button>
          <button 
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-6 py-4 font-label-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === "COMPLETED" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            Đã hoàn thành ({bookings.filter(b => b.status === "COMPLETED").length})
          </button>
          <button 
            onClick={() => setActiveTab("CANCELLED")}
            className={`px-6 py-4 font-label-lg whitespace-nowrap transition-colors border-b-2 ${activeTab === "CANCELLED" ? "border-primary text-primary" : "border-transparent text-on-surface-variant hover:bg-surface-container-low"}`}
          >
            Đã hủy ({bookings.filter(b => b.status === "CANCELLED" || b.status === "REJECTED").length})
          </button>
        </nav>

        <div className="mt-8 space-y-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-16 bg-white border border-outline-variant rounded-xl shadow-sm">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-10 h-10 text-outline" />
              </div>
              <h2 className="font-headline-sm font-bold text-on-surface mb-2">Chưa có lịch hẹn nào</h2>
              <p className="font-body-lg text-on-surface-variant mb-6">Bạn chưa có lịch hẹn nào trong danh sách này.</p>
              <Link href="/search" className="inline-flex min-h-[56px] px-8 items-center justify-center bg-primary text-white font-label-lg rounded hover:bg-primary-container hover:text-white transition-colors">
                Tìm viện dưỡng lão ngay
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className={`bg-white rounded-xl border border-outline-variant border-l-4 p-8 shadow-sm transition-transform hover:-translate-y-0.5 ${booking.status === 'CANCELLED' || booking.status === 'REJECTED' ? 'border-l-error' : booking.status === 'COMPLETED' ? 'border-l-outline' : 'border-l-primary'}`}>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
                      <span className="font-headline-md font-bold text-primary tracking-tighter">
                        {getInitials(booking.facilityName)}
                      </span>
                    </div>
                    <div>
                      <Link href={`/facility/${booking.facilityId}`} className="hover:text-primary transition-colors">
                        <h3 className="font-headline-md font-bold text-on-surface mb-1 line-clamp-1">{booking.facilityName}</h3>
                      </Link>
                      {getStatusBadge(booking.status)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 font-body-lg text-on-surface-variant">
                    <CalendarDays className="w-5 h-5 text-primary shrink-0" />
                    <span>{booking.visitDate ? booking.visitDate.split('-').reverse().join('/') : 'Chưa cập nhật'} · {booking.visitTime}</span>
                  </div>
                  <div className="flex items-center gap-3 font-body-lg text-on-surface-variant">
                    <User className="w-5 h-5 text-primary shrink-0" />
                    <span>{booking.contactName} · {booking.contactPhone}</span>
                  </div>
                  {(booking.healthStatuses && booking.healthStatuses.length > 0) && (
                    <div className="flex items-start gap-3 font-body-lg text-on-surface-variant">
                      <Stethoscope className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>Tình trạng: {booking.healthStatuses.join(', ')}</span>
                    </div>
                  )}
                </div>

                {booking.note && (
                  <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded mb-6">
                    <p className="font-body-md text-on-surface-variant"><span className="font-bold text-on-surface">Ghi chú của bạn:</span> {booking.note}</p>
                  </div>
                )}
                
                {booking.adminNote && (
                  <div className="bg-primary-container/30 border border-primary-container p-4 rounded flex gap-3 mb-6">
                    <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="currentColor" />
                    <p className="font-body-md text-on-surface"><span className="font-bold">Lưu ý từ cơ sở:</span> {booking.adminNote}</p>
                  </div>
                )}
                
                {booking.cancelReason && (
                  <div className="bg-error-container/30 border border-error-container p-4 rounded mb-6">
                    <p className="font-body-md text-error"><span className="font-bold">Lý do hủy:</span> {booking.cancelReason}</p>
                  </div>
                )}

                {activeTab === "UPCOMING" && (
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <button 
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={isCancelling === booking.id}
                      className="flex-1 min-h-[56px] border-2 border-primary text-primary font-label-lg rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-50"
                    >
                      {isCancelling === booking.id ? "Đang hủy..." : "Hủy lịch"}
                    </button>
                    <Link 
                      href={`/facility/${booking.facilityId}`}
                      className="flex-1 min-h-[56px] bg-primary text-white font-label-lg rounded-lg hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center"
                    >
                      Xem cơ sở
                    </Link>
                  </div>
                )}

                {activeTab === "COMPLETED" && !booking.hasReviewed && (
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 border-2 border-dashed border-outline-variant rounded-lg bg-surface-container-lowest mt-4">
                    <div className="text-center md:text-left">
                      <p className="font-label-lg font-bold text-on-surface mb-1">Bạn chưa đánh giá cơ sở này</p>
                      <p className="font-body-md text-on-surface-variant">Chia sẻ trải nghiệm của bạn để giúp đỡ cộng đồng.</p>
                    </div>
                    <Link href={`/facility/${booking.facilityId}/review`} className="min-h-[56px] px-8 flex items-center justify-center bg-primary text-white font-label-lg rounded-lg hover:bg-primary-container hover:text-white transition-all whitespace-nowrap">
                      Để lại đánh giá
                    </Link>
                  </div>
                )}

                {activeTab === "CANCELLED" && (
                  <div className="flex justify-end mt-4">
                    <Link 
                      href={`/facility/${booking.facilityId}/book`}
                      className="min-h-[56px] px-8 border-2 border-primary text-primary font-label-lg rounded-lg hover:bg-surface-container-low transition-colors flex items-center justify-center"
                    >
                      Đặt lịch lại
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
