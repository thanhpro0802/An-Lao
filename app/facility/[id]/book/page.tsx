"use client";

import { use } from "react";
import { ArrowLeft, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { fetchApi } from "@/lib/api";

interface FacilityBase {
  id: number;
  name: string;
  district: string;
  isVerified: boolean;
  images: string[];
  pricing: {
    min: number;
    max: number;
    unit: string;
  };
}

export default function BookingForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, isLoading: isAuthLoading } = useAuth();
  
  const [facility, setFacility] = useState<FacilityBase | null>(null);
  const [isFacilityLoading, setIsFacilityLoading] = useState(true);
  
  // Generate next 5 days
  const [availableDates, setAvailableDates] = useState<{dateStr: string, displayDate: string, label: string}[]>([]);
  
  // Form State
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [relativeType, setRelativeType] = useState("Cha/Mẹ");
  const [healthStatuses, setHealthStatuses] = useState<string[]>([]);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("Sáng (8–11h)");
  const [note, setNote] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(`/login?redirect=/facility/${id}/book`);
    } else if (user) {
      if (!contactName) setContactName(user.fullName || "");
      if (!contactPhone) setContactPhone(user.phone || "");
    }
  }, [user, isAuthLoading, router, id]);

  // Load facility & generate dates
  useEffect(() => {
    const today = new Date();
    const nextDays = Array.from({ length: 14 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return {
        dateStr: d.toISOString().split('T')[0],
        displayDate: `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`,
        label: i === 0 ? "Hôm nay" : d.getDay() === 0 ? "Chủ nhật" : `Thứ ${d.getDay() + 1}`
      };
    });
    setAvailableDates(nextDays);
    setVisitDate(nextDays[0].dateStr); // Default to today

    const loadFacility = async () => {
      try {
        const response = await fetchApi(`/facilities/${id}`);
        if (response.status === 200 && response.data?.data) {
          setFacility(response.data.data);
        }
      } catch (err) {
        console.error("Failed to load facility", err);
      } finally {
        setIsFacilityLoading(false);
      }
    };
    loadFacility();
  }, [id]);

  const toggleHealthStatus = (status: string) => {
    setHealthStatuses(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      setError("Vui lòng nhập đầy đủ họ tên và số điện thoại.");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          facilityId: parseInt(id),
          contactName,
          contactPhone,
          relativeType,
          healthStatuses,
          visitDate,
          visitTime,
          note
        })
      });

      if (response.status === 201 || response.status === 200) {
        router.push('/booking-success');
      } else {
        setError(response.data?.message || "Đã xảy ra lỗi khi đặt lịch.");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi hệ thống.");
      setIsSubmitting(false);
    }
  };

  if (isAuthLoading || isFacilityLoading) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Prevent rendering form if not authenticated (useEffect will redirect)
  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface pb-32 text-on-surface overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-white border-b border-outline-variant">
        <div className="flex items-center px-4 h-16 w-full max-w-md mx-auto">
          <Link href={`/facility/${id}`} className="mr-4 text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-headline-sm font-bold text-primary">Đặt lịch tham quan</h1>
            <span className="font-body-sm text-on-surface-variant line-clamp-1">{facility ? facility.name : "Đang tải..."}</span>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <div className="px-4 py-6">
          {facility && (
            <div className="bg-white border border-outline-variant rounded-lg p-4 flex gap-4 shadow-sm mb-8">
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 relative bg-surface-container">
                {facility.images && facility.images[0] ? (
                  <Image src={facility.images[0]} alt="Facility" fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full text-outline font-body-sm text-center">Không có ảnh</div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="font-label-lg font-bold mb-1 line-clamp-2">{facility.name}</h2>
                {facility.isVerified && (
                  <div className="inline-flex items-center bg-[#D1FAE5] text-primary px-2 py-0.5 rounded-full w-fit mb-2">
                    <CheckCircle2 className="w-[14px] h-[14px] mr-1" fill="currentColor" stroke="white" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Đã xác minh</span>
                  </div>
                )}
                <p className="font-body-sm text-on-surface-variant">
                  {facility.pricing?.min ? facility.pricing.min.toFixed(1) : "?"} 
                  {facility.pricing?.max ? ` – ${facility.pricing.max.toFixed(1)}` : ""} triệu/tháng
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 text-error rounded-lg flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-body-md">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col items-stretch w-full">
            <div>
              <label className="block font-label-lg font-bold mb-2">Họ và tên người liên hệ</label>
              <input 
                type="text" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nhập họ và tên của bạn" 
                className="w-full h-14 px-4 bg-white border-2 border-outline rounded-lg focus:border-primary focus:ring-0 font-body-lg outline-none" 
              />
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-2">Số điện thoại</label>
              <input 
                type="tel" 
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="0xxx xxx xxx" 
                className="w-full h-14 px-4 bg-white border-2 border-outline rounded-lg focus:border-primary focus:ring-0 font-body-lg outline-none" 
              />
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-3">Người cần chăm sóc</label>
              <div className="flex flex-wrap gap-3">
                {['Cha/Mẹ', 'Ông/Bà', 'Người thân khác'].map(rel => (
                  <label key={rel} className="relative flex items-center cursor-pointer group">
                    <input type="radio" name="relative" value={rel} checked={relativeType === rel} onChange={() => setRelativeType(rel)} className="peer sr-only" />
                    <div className="px-5 h-12 flex items-center justify-center bg-white border-2 border-outline rounded-lg peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-primary font-label-lg transition-all">{rel}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-3">Tình trạng sức khỏe sơ bộ</label>
              <div className="grid grid-cols-1 gap-3">
                {['Tự đi lại được', 'Cần hỗ trợ một phần', 'Nằm liệt giường', 'Sau tai biến', 'Sa sút trí tuệ'].map(status => (
                  <label key={status} className="flex items-center p-4 bg-white border-2 border-outline rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
                    <input 
                      type="checkbox" 
                      checked={healthStatuses.includes(status)}
                      onChange={() => toggleHealthStatus(status)}
                      className="w-6 h-6 rounded border-outline-variant text-primary focus:ring-primary transition-all" 
                    />
                    <span className="ml-4 font-body-lg text-on-surface">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-3">Ngày muốn đến tham quan</label>
              <div className="flex overflow-x-auto gap-3 pb-4 snap-x">
                {availableDates.map((day) => (
                  <label key={day.dateStr} className="relative flex-shrink-0 cursor-pointer snap-center">
                    <input 
                      type="radio" 
                      name="date" 
                      value={day.dateStr}
                      checked={visitDate === day.dateStr}
                      onChange={(e) => {
                        setVisitDate(day.dateStr);
                        const container = e.target.closest('.flex.overflow-x-auto');
                        const item = e.target.parentElement;
                        if (container && item) {
                          const containerCenter = container.clientWidth / 2;
                          const itemCenter = item.offsetLeft + item.clientWidth / 2;
                          container.scrollTo({
                            left: itemCenter - containerCenter,
                            behavior: 'smooth'
                          });
                        }
                      }}
                      className="peer sr-only" 
                    />
                    <div className="px-5 py-3 text-center bg-white border-2 border-outline rounded-lg peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition-all">
                      <div className="font-body-sm opacity-80 mb-1">{day.label}</div>
                      <div className="font-headline-sm font-bold">{day.displayDate}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-3">Buổi</label>
              <div className="grid grid-cols-2 gap-3">
                {['Sáng (8–11h)', 'Chiều (14–17h)'].map(time => (
                  <label key={time} className="relative cursor-pointer">
                    <input 
                      type="radio" 
                      name="time" 
                      value={time}
                      checked={visitTime === time}
                      onChange={() => setVisitTime(time)}
                      className="peer sr-only" 
                    />
                    <div className="h-14 flex items-center justify-center bg-white border-2 border-outline rounded-lg peer-checked:border-primary peer-checked:bg-primary-container peer-checked:text-primary font-label-lg transition-all">{time}</div>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-label-lg font-bold mb-2">Ghi chú thêm (không bắt buộc)</label>
              <textarea 
                rows={4} 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Mẹ tôi cần phòng riêng, hỏi thêm về gói bán trú..." 
                className="w-full p-4 bg-white border-2 border-outline rounded-lg focus:border-primary font-body-lg outline-none resize-none" 
              />
            </div>

            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant flex items-start gap-3">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="font-body-sm text-on-surface-variant leading-relaxed">
                Thông tin của bạn chỉ được chia sẻ với cơ sở sau khi xác nhận. Không spam, không bán data.
              </p>
            </div>
            
            {/* Invisible submit trigger for the bottom bar button */}
            <button id="submitBtn" type="submit" className="hidden"></button>
          </form>
        </div>
      </main>

      {user && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-outline-variant p-4 z-50 pb-safe">
          <div className="max-w-md mx-auto">
            <button 
              onClick={() => document.getElementById('submitBtn')?.click()}
              disabled={isSubmitting}
              className="w-full min-h-[56px] bg-primary text-white flex items-center justify-center rounded font-label-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100"
            >
              {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
