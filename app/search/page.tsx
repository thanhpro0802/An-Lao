"use client";

import Navigation from "@/components/Navigation";
import { Menu, Bell, Search, ChevronDown, Star, AlertTriangle, BadgeCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";

interface Facility {
  id: number;
  name: string;
  district: string;
  rating: number;
  reviewCount: number;
  priceMin: number;
  priceMax: number;
  priceUnit: string;
  imageUrl: string;
  isVerified: boolean;
  isWarning: boolean;
  tags: string[];
}

export default function SearchPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  
  // Filters
  const [district, setDistrict] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  // Debounced search
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);

  // When filters change, reset page to 0 and clear existing list
  useEffect(() => {
    setPage(0);
    loadFacilities(0, true);
  }, [debouncedKeyword, district, maxPrice]);

  const loadFacilities = async (pageNumber: number, isReset: boolean) => {
    if (isReset) setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedKeyword) params.append("keyword", debouncedKeyword);
      if (district) params.append("district", district);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("page", pageNumber.toString());
      
      const response = await fetchApi(`/facilities?${params.toString()}`);
      if (response.status === 200 && response.data?.data) {
        const { content, totalPages: tp, totalElements: te } = response.data.data;
        if (isReset) {
          setFacilities(content);
        } else {
          setFacilities(prev => [...prev, ...content]);
        }
        setTotalPages(tp);
        setTotalElements(te);
      }
    } catch (error) {
      console.error("Failed to load facilities:", error);
    } finally {
      if (isReset) setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    if (nextPage < totalPages) {
      setPage(nextPage);
      loadFacilities(nextPage, false);
    }
  };

  const DISTRICTS = ["Cầu Giấy", "Hà Đông", "Bắc Từ Liêm", "Nam Từ Liêm", "Đống Đa", "Thanh Xuân"];
  const PRICES = [
    { label: "Dưới 10 triệu", value: "10" },
    { label: "Dưới 15 triệu", value: "15" },
    { label: "Dưới 20 triệu", value: "20" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 text-on-surface">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
            <Menu className="w-6 h-6 text-primary" />
          </button>
          <Link href="/">
            <h1 className="font-headline-md font-bold text-primary">Tìm kiếm</h1>
          </Link>
        </div>
        <Link href="/notifications" className="p-2 hover:bg-surface-container-low transition-colors rounded-full">
          <Bell className="w-6 h-6 text-primary" />
        </Link>
      </header>

      <main className="mt-16 max-w-container-max mx-auto px-4 pt-6">
        <section className="mb-6">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
            <input 
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm viện dưỡng lão tại Hà Nội..."
              className="w-full min-h-[56px] pl-14 pr-4 bg-white border border-outline-variant focus:border-2 focus:border-primary rounded font-body-md text-on-surface outline-none transition-all"
            />
          </div>
        </section>

        <section className="mb-8 flex gap-3 overflow-x-visible -mx-4 px-4 hide-scrollbar">
          {/* District Filter */}
          <div className="relative">
            <button 
              onClick={() => { setShowDistrictDropdown(!showDistrictDropdown); setShowPriceDropdown(false); }}
              className={`inline-flex items-center gap-2 px-6 min-h-[56px] bg-white border ${district ? 'border-primary text-primary' : 'border-outline-variant text-on-surface-variant'} rounded-full font-label-lg hover:border-primary hover:text-primary transition-colors`}
            >
              {district || "Quận/Huyện"} <ChevronDown className="w-4 h-4" />
            </button>
            {showDistrictDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-outline-variant rounded shadow-sm z-20 py-2">
                <button className="w-full text-left px-4 py-3 hover:bg-surface-container-low font-body-md" onClick={() => { setDistrict(""); setShowDistrictDropdown(false); }}>Tất cả Quận/Huyện</button>
                {DISTRICTS.map(d => (
                  <button key={d} className="w-full text-left px-4 py-3 hover:bg-surface-container-low font-body-md" onClick={() => { setDistrict(d); setShowDistrictDropdown(false); }}>{d}</button>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative">
            <button 
              onClick={() => { setShowPriceDropdown(!showPriceDropdown); setShowDistrictDropdown(false); }}
              className={`inline-flex items-center gap-2 px-6 min-h-[56px] bg-white border ${maxPrice ? 'border-primary text-primary' : 'border-outline-variant text-on-surface-variant'} rounded-full font-label-lg hover:border-primary hover:text-primary transition-colors`}
            >
              {maxPrice ? PRICES.find(p => p.value === maxPrice)?.label : "Mức giá"} <ChevronDown className="w-4 h-4" />
            </button>
            {showPriceDropdown && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-outline-variant rounded shadow-sm z-20 py-2">
                <button className="w-full text-left px-4 py-3 hover:bg-surface-container-low font-body-md" onClick={() => { setMaxPrice(""); setShowPriceDropdown(false); }}>Mọi mức giá</button>
                {PRICES.map(p => (
                  <button key={p.value} className="w-full text-left px-4 py-3 hover:bg-surface-container-low font-body-md" onClick={() => { setMaxPrice(p.value); setShowPriceDropdown(false); }}>{p.label}</button>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="font-headline-md text-on-surface">Kết quả tìm kiếm</h2>
          <p className="font-label-lg text-on-surface-variant">{isLoading ? "Đang tải..." : `${totalElements} cơ sở phù hợp`}</p>
        </div>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : facilities.length > 0 ? (
            <>
              {facilities.map(facility => (
                <article key={facility.id} className="bg-white border border-outline-variant rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 transition-all hover:border-primary">
                  <div className="w-full md:w-64 h-48 bg-surface-container rounded overflow-hidden flex-shrink-0 relative">
                    {facility.imageUrl ? (
                      <Image src={facility.imageUrl} alt={facility.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-outline font-body-md">Không có ảnh</div>
                    )}
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-headline-md text-primary line-clamp-2">{facility.name}</h3>
                        {facility.isVerified && <BadgeCheck className="w-6 h-6 text-primary flex-shrink-0" fill="currentColor" stroke="white" />}
                      </div>
                      <div className="text-on-surface-variant font-body-md mb-4">Quận {facility.district}</div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-amber-500" fill="currentColor" />
                        <span className="font-label-lg text-on-surface">{facility.rating ? facility.rating.toFixed(1) : "N/A"}</span>
                        <span className="font-body-md text-on-surface-variant">({facility.reviewCount || 0} đánh giá)</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {facility.isWarning && (
                          <span className="px-3 py-1 bg-error text-white font-label-lg uppercase text-[14px] rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Cảnh báo
                          </span>
                        )}
                        {facility.tags && facility.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-surface-container text-on-surface-variant font-label-lg uppercase text-[14px] rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant">
                      <div className="flex flex-col">
                        <span className="font-label-lg text-on-surface-variant">Giá tham khảo</span>
                        <span className="font-pricing-display text-secondary leading-none mt-1">
                          {facility.priceMin ? facility.priceMin.toFixed(1) : "?"} 
                          {facility.priceMax ? ` - ${facility.priceMax.toFixed(1)}` : ""}
                          <span className="font-body-md ml-1">{facility.priceUnit || "triệu/tháng"}</span>
                        </span>
                      </div>
                      <Link href={`/facility/${facility.id}`} className="min-h-[56px] px-8 bg-primary text-white rounded font-label-lg transition-colors hover:bg-primary-container flex justify-center items-center">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              ))}

              {page + 1 < totalPages && (
                <div className="flex justify-center mt-4 mb-8">
                  <button 
                    onClick={handleLoadMore}
                    className="px-10 min-h-[56px] bg-white border-2 border-outline hover:border-primary hover:text-primary text-on-surface font-label-lg rounded-full transition-colors flex items-center gap-2"
                  >
                    Xem thêm
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 bg-white border border-outline-variant rounded-lg">
              <p className="font-body-lg text-on-surface-variant">Không tìm thấy cơ sở nào phù hợp với bộ lọc.</p>
              <button 
                onClick={() => { setKeyword(""); setDistrict(""); setMaxPrice(""); }}
                className="mt-6 min-h-[56px] px-8 bg-primary text-white rounded font-label-lg hover:bg-primary-container"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </div>
      </main>

      <Navigation />
    </div>
  );
}
