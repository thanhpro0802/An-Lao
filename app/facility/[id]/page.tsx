"use client";

import { use } from "react";
import { ArrowLeft, Share2, MapPin, Star, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

interface ReviewDto {
  id: number;
  reviewerName: string;
  reviewerRole: string;
  rating: number;
  content: string;
}

interface FacilityDetail {
  id: number;
  name: string;
  district: string;
  address: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isWarning: boolean;
  imageUrl?: string;
  images: string[];
  tags: string[];
  pricing: {
    min: number;
    max: number;
    unit: string;
    includes: string;
    excludes: string;
  };
  description: string;
  topReviews: ReviewDto[];
}

export default function FacilityDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const [facility, setFacility] = useState<FacilityDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Ưu tiên imageUrl (ảnh admin upload) lên đầu; lọc bỏ ảnh trùng
  const displayImages = facility
    ? facility.imageUrl
      ? [facility.imageUrl, ...(facility.images || []).filter(img => img !== facility.imageUrl)]
      : (facility.images || [])
    : [];

  useEffect(() => {
    const loadFacility = async () => {
      try {
        const response = await fetchApi(`/facilities/${id}`);
        if (response.status === 200 && response.data?.data) {
          setFacility(response.data.data);
        } else {
          setError("Không tìm thấy cơ sở này.");
        }
      } catch (err) {
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };
    loadFacility();
  }, [id]);

  return (
    <div className="min-h-screen bg-surface pb-28 text-on-surface">
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 h-16 bg-white border-b border-outline-variant">
        <Link href="/search" className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="font-headline-sm font-bold text-primary flex-1 px-4 truncate text-center">
          {facility ? facility.name : "An Lão"}
        </h1>
        <button className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-colors">
          <Share2 className="w-6 h-6" />
        </button>
      </header>

      <main className="mt-16">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error || !facility ? (
          <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
            <AlertTriangle className="w-12 h-12 text-error mb-4" />
            <h2 className="font-headline-md font-bold mb-2">Rất tiếc</h2>
            <p className="font-body-md text-on-surface-variant">{error || "Cơ sở này không tồn tại hoặc đã bị gỡ."}</p>
            <Link href="/search" className="mt-6 min-h-[56px] px-8 bg-primary text-white rounded font-label-lg flex items-center justify-center">
              Quay lại Tìm kiếm
            </Link>
          </div>
        ) : (
          <>
            {/* Photos Carousel */}
            <section className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
              {displayImages.length > 0 ? (
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar h-full">
                  {displayImages.map((img, index) => (
                    <div key={index} className="flex-none w-full h-full snap-center relative">
                      <Image src={img} alt={`${facility.name} - ${index + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full w-full text-outline font-body-md">
                  Không có hình ảnh
                </div>
              )}
              
              {facility.isVerified && (
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[12px] font-bold uppercase tracking-wider">Đã xác minh</span>
                </div>
              )}
              
              {displayImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {displayImages.map((_, index) => (
                    <div key={index} className="w-2 h-2 rounded-full bg-white/50 backdrop-blur-sm"></div>
                  ))}
                </div>
              )}
            </section>

            {/* Basic Info */}
            <section className="px-6 pt-8 pb-6 bg-white border-b border-outline-variant">
              <h2 className="font-headline-lg font-bold text-on-surface mb-2">{facility.name}</h2>
              <div className="flex items-start gap-2 mb-4 text-on-surface-variant">
                <MapPin className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                <p className="font-body-lg">{facility.address}</p>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-primary">
                  <Star className="w-6 h-6 text-amber-500" fill="currentColor" />
                  <span className="font-bold text-[24px] ml-1">{facility.rating ? facility.rating.toFixed(1) : "N/A"}</span>
                </div>
                <Link href={`/facility/${id}/review`} className="font-label-lg text-primary underline decoration-primary/30">
                  {facility.reviewCount || 0} đánh giá
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {facility.isWarning && (
                  <span className="bg-error text-white font-label-lg px-3 py-1.5 rounded-full uppercase flex items-center gap-1 tracking-wide">
                    <AlertTriangle className="w-4 h-4" /> Cảnh báo
                  </span>
                )}
                {facility.tags && facility.tags.map((tag) => (
                  <span key={tag} className="bg-surface-container text-on-surface-variant font-label-lg px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="p-6 bg-surface-container-low border-b border-outline-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-headline-md font-bold text-secondary">Chi phí tham khảo</h3>
              </div>
              <div className="mb-6">
                <span className="font-pricing-display font-bold text-primary">
                  {facility.pricing?.min ? facility.pricing.min.toFixed(1) : "?"} 
                  {facility.pricing?.max ? ` – ${facility.pricing.max.toFixed(1)}` : ""}
                </span>
                <span className="font-body-lg font-medium text-on-surface-variant ml-2">
                  {facility.pricing?.unit || "triệu/tháng"}
                </span>
              </div>
              <div className="space-y-4">
                {facility.pricing?.includes && (
                  <div className="p-4 bg-white border border-outline-variant rounded-lg flex items-start gap-3 shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <p className="font-label-lg font-bold text-primary">Đã bao gồm:</p>
                      <p className="font-body-md text-on-surface-variant mt-1 whitespace-pre-wrap">{facility.pricing.includes}</p>
                    </div>
                  </div>
                )}
                {facility.pricing?.excludes && (
                  <div className="p-4 bg-white border border-outline-variant rounded-lg flex items-start gap-3 shadow-sm">
                    <AlertTriangle className="w-6 h-6 text-error shrink-0" />
                    <div>
                      <p className="font-label-lg font-bold text-error">Tính riêng:</p>
                      <p className="font-body-md text-on-surface-variant mt-1 whitespace-pre-wrap">{facility.pricing.excludes}</p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* About */}
            <section className="p-6 bg-white border-b border-outline-variant">
              <h3 className="font-headline-md font-bold mb-4">Về cơ sở</h3>
              <div className={`text-on-surface font-body-lg leading-relaxed whitespace-pre-wrap ${!isDescExpanded && 'line-clamp-4'}`}>
                {facility.description}
              </div>
              {facility.description && facility.description.length > 150 && (
                <button 
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="mt-4 font-label-lg font-bold text-primary flex items-center gap-1 active:scale-95 transition-transform"
                >
                  {isDescExpanded ? "Thu gọn" : "Xem thêm"} <ChevronDown className={`w-5 h-5 transition-transform ${isDescExpanded ? 'rotate-180' : ''}`} />
                </button>
              )}
            </section>

            {/* Reviews */}
            <section className="p-6 bg-white border-b border-transparent">
              <h3 className="font-headline-md font-bold mb-6">Đánh giá nổi bật</h3>
              
              {facility.topReviews && facility.topReviews.length > 0 ? (
                <div className="space-y-4">
                  {facility.topReviews.map((review) => (
                    <article key={review.id} className="p-6 border border-outline-variant rounded-lg bg-surface-container-low shadow-sm">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-label-lg font-bold text-on-surface">{review.reviewerName}</h4>
                          <p className="font-body-sm text-on-surface-variant">{review.reviewerRole}</p>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="w-[18px] h-[18px]" fill={i < review.rating ? "currentColor" : "none"} color={i < review.rating ? "currentColor" : "#CBD5E1"} />
                          ))}
                        </div>
                      </div>
                      <p className="font-body-md text-on-surface italic">&quot;{review.content}&quot;</p>
                    </article>
                  ))}
                  <Link href={`/facility/${id}/review`} className="flex min-h-[56px] justify-center items-center mt-6 font-label-lg font-bold text-primary p-4 border border-outline-variant rounded-lg active:bg-surface-container-low transition-colors">
                    Xem tất cả {facility.reviewCount || 0} đánh giá
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="font-body-lg text-on-surface-variant">Cơ sở này chưa có đánh giá nào.</p>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Bottom Booking Bar */}
      {!isLoading && facility && !error && (
        <nav className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-t border-outline-variant shadow-lg pb-safe">
          <div className="flex flex-col">
            <span className="font-body-sm text-on-surface-variant uppercase tracking-tight font-medium">Giá chỉ từ</span>
            <span className="font-headline-sm font-bold text-primary leading-none">
              {facility.pricing?.min ? facility.pricing.min.toFixed(1) : "?"} 
              <span className="font-body-sm font-normal text-on-surface-variant ml-1">triệu</span>
            </span>
          </div>
          <Link href={`/facility/${id}/book`} className="bg-primary text-white font-label-lg px-8 min-h-[56px] rounded flex items-center justify-center shadow-md hover:bg-primary-container transition-colors">
            Đặt lịch hẹn
          </Link>
        </nav>
      )}
    </div>
  );
}
