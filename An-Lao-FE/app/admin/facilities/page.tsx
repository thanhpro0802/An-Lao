"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { fetchApi } from "@/lib/api";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { Edit2, ShieldAlert, ArrowLeft, Building2, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";

export default function AdminFacilitiesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [facilities, setFacilities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    district: "",
    description: "",
    imageUrl: "",
    priceMin: "",
    priceMax: "",
    priceUnit: "triệu/tháng",
    priceIncludes: "",
    priceExcludes: "",
    tags: "",
    isVerified: false,
    isWarning: false
  });

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== "ADMIN") {
        router.push("/");
        return;
      }
      loadFacilities();
    }
  }, [user, isLoading, router]);

  const loadFacilities = async () => {
    try {
      const response = await fetchApi("/facilities?page=0&size=50&sortBy=id&sortDir=asc");
      if (response.status === 200 && response.data?.data?.content) {
        setFacilities(response.data.data.content);
      }
    } catch (error) {
      console.error("Failed to load facilities", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = async (result: any, facilityId: number) => {
    if (result.info && result.info.secure_url) {
      const newImageUrl = result.info.secure_url;
      try {
        // Lấy dữ liệu hiện tại của facility để cập nhật mảng images
        const current = await fetchApi(`/facilities/${facilityId}`);
        const currentImages: string[] = current.data?.data?.images || [];
        const updatedImages = [...currentImages, newImageUrl];

        await fetchApi(`/facilities/${facilityId}`, {
          method: "PUT",
          body: JSON.stringify({
            imageUrl: newImageUrl,   // ảnh đại diện (thumbnail admin)
            images: updatedImages    // mảng ảnh hiển thị ở trang chi tiết
          })
        });
        loadFacilities();
        alert("Tải ảnh lên thành công!");
      } catch (err) {
        console.error("Failed to update facility image", err);
        alert("Có lỗi xảy ra khi cập nhật ảnh!");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cơ sở này không? Dữ liệu không thể khôi phục!")) {
      try {
        await fetchApi(`/facilities/${id}`, { method: "DELETE" });
        loadFacilities();
      } catch (error) {
        alert("Xóa thất bại!");
      }
    }
  };

  const openModal = async (facility: any = null) => {
    if (facility) {
      try {
        const response = await fetchApi(`/facilities/${facility.id}`);
        if (response.status === 200 && response.data?.data) {
          const fullData = response.data.data;
          setEditingFacility(fullData);
          setFormData({
            name: fullData.name || "",
            address: fullData.address || "",
            district: fullData.district || "",
            description: fullData.description || "",
            imageUrl: fullData.imageUrl || "",
            priceMin: fullData.pricing?.min || "",
            priceMax: fullData.pricing?.max || "",
            priceUnit: fullData.pricing?.unit || "triệu/tháng",
            priceIncludes: fullData.pricing?.includes || "",
            priceExcludes: fullData.pricing?.excludes || "",
            tags: fullData.tags ? fullData.tags.join(", ") : "",
            isVerified: fullData.isVerified || false,
            isWarning: fullData.isWarning || false
          });
        }
      } catch (e) {
        alert("Lỗi khi tải dữ liệu chi tiết!");
        return;
      }
    } else {
      setEditingFacility(null);
      setFormData({
        name: "", address: "", district: "", description: "", imageUrl: "",
        priceMin: "", priceMax: "", priceUnit: "triệu/tháng", priceIncludes: "", priceExcludes: "",
        tags: "", isVerified: false, isWarning: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tags string into array
    const tagsArray = formData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const payload = {
      ...formData,
      tags: tagsArray,
      priceMin: formData.priceMin ? parseFloat(formData.priceMin) : null,
      priceMax: formData.priceMax ? parseFloat(formData.priceMax) : null
    };

    try {
      if (editingFacility) {
        await fetchApi(`/facilities/${editingFacility.id}`, {
          method: "PUT",
          body: JSON.stringify(payload)
        });
      } else {
        await fetchApi("/facilities", {
          method: "POST",
          body: JSON.stringify(payload)
        });
      }
      setIsModalOpen(false);
      loadFacilities();
    } catch (error) {
      alert("Lưu thất bại! Vui lòng kiểm tra lại thông tin.");
    }
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-surface flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20">
      <header className="bg-white flex items-center px-4 h-16 w-full sticky top-0 z-50 border-b border-outline-variant">
        <Link href="/" className="p-2 -ml-2 text-outline hover:text-primary">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2 ml-2 text-error">
          <ShieldAlert className="w-6 h-6" />
          <h1 className="text-lg font-bold tracking-tight">Khu vực Quản Trị Viên</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold">Quản lý Viện Dưỡng Lão</h2>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm cơ sở mới
          </button>
        </div>

        <div className="bg-white rounded-lg border border-outline-variant overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="p-4 font-semibold text-on-surface-variant w-16 text-center">ID</th>
                  <th className="p-4 font-semibold text-on-surface-variant w-32">Ảnh đại diện</th>
                  <th className="p-4 font-semibold text-on-surface-variant">Tên cơ sở</th>
                  <th className="p-4 font-semibold text-on-surface-variant hidden md:table-cell">Giá / tháng</th>
                  <th className="p-4 font-semibold text-on-surface-variant w-[280px] text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {facilities.map((facility) => (
                  <tr key={facility.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="p-4 text-center font-medium text-on-surface-variant">{facility.id}</td>
                    <td className="p-4">
                      <div className="relative w-24 h-16 rounded overflow-hidden bg-surface-container border border-outline-variant">
                        {facility.imageUrl ? (
                          <Image src={facility.imageUrl} alt={facility.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-outline text-xs text-center p-1">
                            Chưa có ảnh
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium flex items-center gap-2">
                        {facility.name}
                        {facility.isVerified && <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded uppercase font-bold">Verified</span>}
                      </div>
                      <div className="text-sm text-on-surface-variant truncate max-w-[200px] mt-1">{facility.address}</div>
                    </td>
                    <td className="p-4 text-on-surface-variant hidden md:table-cell">
                      {facility.priceMin ? (
                        <span className="font-bold text-primary">{facility.priceMin} - {facility.priceMax} <span className="text-sm font-normal">tr</span></span>
                      ) : "Chưa cập nhật"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button 
                          onClick={() => openModal(facility)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface rounded-full hover:bg-outline-variant transition-colors text-sm font-medium"
                        >
                          <Edit2 className="w-4 h-4" />
                          Sửa
                        </button>
                        
                        <CldUploadWidget 
                          signatureEndpoint="/api/cloudinary/sign"
                          onSuccess={(result) => handleUploadSuccess(result, facility.id)}
                          options={{ multiple: false, maxFiles: 1, resourceType: "image" }}
                        >
                          {({ open }) => (
                            <button 
                              onClick={() => open()}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors text-sm font-medium"
                            >
                              Ảnh
                            </button>
                          )}
                        </CldUploadWidget>

                        <button 
                          onClick={() => handleDelete(facility.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-error-container text-error rounded-full hover:bg-error hover:text-white transition-colors text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Full CRUD */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[95vh]">
            <div className="flex items-center justify-between p-4 border-b border-outline-variant bg-surface-container-lowest">
              <h3 className="font-bold text-xl">{editingFacility ? "Sửa thông tin cơ sở" : "Thêm cơ sở mới"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-surface-container rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="facilityForm" onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Cột 1: Thông tin cơ bản */}
                <div className="space-y-4">
                  <h4 className="font-bold text-primary border-b border-outline-variant pb-2">1. Thông tin cơ bản</h4>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Tên cơ sở *</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Địa chỉ *</label>
                    <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Quận / Huyện *</label>
                    <input required type="text" value={formData.district} onChange={e => setFormData({...formData, district: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Mô tả chung</label>
                    <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none"></textarea>
                  </div>
                </div>

                {/* Cột 2: Chi phí & Thuộc tính */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary border-b border-outline-variant pb-2">2. Chi phí</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-1">Giá thấp nhất</label>
                        <input type="number" step="0.1" placeholder="Ví dụ: 7.0" value={formData.priceMin} onChange={e => setFormData({...formData, priceMin: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-on-surface-variant mb-1">Giá cao nhất</label>
                        <input type="number" step="0.1" placeholder="Ví dụ: 15.0" value={formData.priceMax} onChange={e => setFormData({...formData, priceMax: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Bao gồm chi phí gì?</label>
                      <input type="text" placeholder="Tiền phòng, ăn uống 4 bữa..." value={formData.priceIncludes} onChange={e => setFormData({...formData, priceIncludes: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Không bao gồm (Phụ phí)</label>
                      <input type="text" placeholder="Bỉm tã, Thuốc ngoài danh mục..." value={formData.priceExcludes} onChange={e => setFormData({...formData, priceExcludes: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary outline-none" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-primary border-b border-outline-variant pb-2">3. Thuộc tính & Thẻ (Tags)</h4>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-1">Các dịch vụ (nhập cách nhau bằng dấu phẩy)</label>
                      <input type="text" placeholder="Nội trú, Bán trú, Nhận tai biến, Camera..." value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-outline-variant focus:border-primary outline-none" />
                      <p className="text-xs text-on-surface-variant mt-1">Gợi ý: Nội trú, Bán trú, Camera, Phục hồi chức năng</p>
                    </div>
                    <div className="flex flex-col gap-3 pt-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isVerified} onChange={e => setFormData({...formData, isVerified: e.target.checked})} className="w-5 h-5 rounded text-primary focus:ring-primary" />
                        <span className="font-medium text-on-surface">Đã xác minh (Tích xanh)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={formData.isWarning} onChange={e => setFormData({...formData, isWarning: e.target.checked})} className="w-5 h-5 rounded text-error focus:ring-error" />
                        <span className="font-medium text-error">Có cảnh báo rủi ro</span>
                      </label>
                    </div>
                  </div>
                </div>

              </form>
            </div>
            
            <div className="p-4 border-t border-outline-variant flex justify-end gap-3 bg-surface-container-lowest">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-lg font-medium text-on-surface hover:bg-surface-container transition-colors">Hủy thao tác</button>
              <button type="submit" form="facilityForm" className="px-8 py-2.5 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm">Lưu dữ liệu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
