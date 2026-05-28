"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone, ArrowRight, ChevronLeft, AlertCircle } from "lucide-react";
import { fetchApi } from "@/lib/api";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify({ fullName, phone, email, password }),
      });

      if (response.status === 201) {
        setSuccess(true);
      } else {
        setError(response.data?.message || "Đăng ký không thành công. Email có thể đã tồn tại.");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi kết nối với máy chủ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-4 py-12">
      <div className="max-w-md w-full mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-on-surface-variant font-label-lg mb-8 hover:text-primary transition-colors">
          <ChevronLeft className="w-6 h-6" /> Về trang chủ
        </Link>

        <div className="bg-white border border-outline-variant rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="font-headline-lg text-primary mb-2">Đăng ký</h1>
            <p className="font-body-md text-on-surface-variant">Tạo tài khoản để đặt lịch hẹn dễ dàng</p>
          </div>

          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-on-primary-container" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-headline-lg text-on-surface mb-4">Đăng ký thành công!</h2>
              <p className="font-body-md text-on-surface-variant mb-8">Tài khoản của bạn đã được tạo thành công.</p>
              <Link href="/login" className="w-full bg-primary text-white font-label-lg rounded min-h-[56px] hover:bg-primary-container transition-colors flex items-center justify-center">
                Đến trang Đăng nhập
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-6 bg-error text-white p-4 rounded flex items-start gap-3 font-body-md">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="block font-label-lg text-on-surface mb-2">Họ và tên</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full bg-white border border-outline focus:border-2 focus:border-primary rounded min-h-[56px] pl-12 pr-4 font-body-md text-on-surface outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-lg text-on-surface mb-2">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full bg-white border border-outline focus:border-2 focus:border-primary rounded min-h-[56px] pl-12 pr-4 font-body-md text-on-surface outline-none transition-all"
                      placeholder="0912345678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-lg text-on-surface mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-white border border-outline focus:border-2 focus:border-primary rounded min-h-[56px] pl-12 pr-4 font-body-md text-on-surface outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-label-lg text-on-surface mb-2">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full bg-white border border-outline focus:border-2 focus:border-primary rounded min-h-[56px] pl-12 pr-4 font-body-md text-on-surface outline-none transition-all"
                      placeholder="Tối thiểu 6 ký tự"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-white font-label-lg rounded min-h-[56px] hover:bg-primary-container transition-colors flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
                >
                  {isLoading ? "Đang xử lý..." : "Đăng ký"}
                  {!isLoading && <ArrowRight className="w-6 h-6" />}
                </button>
              </form>

              <div className="mt-8 mb-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-outline-variant"></div>
                <span className="font-body-md text-on-surface-variant">Hoặc</span>
                <div className="flex-1 h-px bg-outline-variant"></div>
              </div>

              <button
                type="button"
                className="w-full bg-white border-2 border-outline hover:border-primary hover:text-primary transition-colors font-label-lg text-on-surface min-h-[56px] rounded flex items-center justify-center gap-3"
                onClick={() => alert("Chức năng Google Login cần cấu hình Backend.")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4"/>
                  <path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.09H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853"/>
                  <path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.06H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.94L5.84 14.09Z" fill="#FBBC05"/>
                  <path d="M12 5.38C13.62 5.38 15.06 5.93 16.2 7.02L19.35 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.06L5.84 9.91C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EA4335"/>
                </svg>
                Đăng ký với Google
              </button>

              <p className="text-center font-body-md text-on-surface-variant mt-8">
                Đã có tài khoản?{" "}
                <Link href="/login" className="font-label-lg text-primary hover:underline">
                  Đăng nhập
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
