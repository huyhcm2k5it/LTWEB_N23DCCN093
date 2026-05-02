"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/schema";
import { registerUser } from "./actions";

export default function Home() {
  const [serverState, setServerState] = useState({ success: null, message: "" });
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data) => {
    setIsPending(true);
    setServerState({ success: null, message: "" });
    
    try {
      // Gọi Server Action
      const result = await registerUser(data);
      if (result) {
        setServerState({ success: result.success, message: result.message });
      }
    } catch (error) {
      setServerState({ success: false, message: "Đã xảy ra lỗi hệ thống khi kết nối server." });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="container">
      <div className="form-card">
        <div className="header">
          <h1 className="title">Tạo Tài Khoản</h1>
          <p className="subtitle">Tham gia cùng chúng tôi ngay hôm nay</p>
        </div>

        {serverState.message && (
          <div className={`alert ${serverState.success ? "alert-success" : "alert-error"}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {serverState.success ? (
                <>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </>
              ) : (
                <>
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </>
              )}
            </svg>
            <span>{serverState.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Họ và Tên</label>
            <input
              id="name"
              type="text"
              placeholder="Nguyễn Văn A"
              className={`form-input ${errors.name ? "error" : ""}`}
              {...register("name")}
            />
            {errors.name && (
              <span className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="email@example.com"
              className={`form-input ${errors.email ? "error" : ""}`}
              {...register("email")}
            />
            {errors.email && (
              <span className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Tối thiểu 8 ký tự, 1 hoa, 1 số"
              className={`form-input ${errors.password ? "error" : ""}`}
              {...register("password")}
            />
            {errors.password && (
              <span className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              className={`form-input ${errors.confirmPassword ? "error" : ""}`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="error-message">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isPending}
          >
            {isPending ? (
              <div className="spinner"></div>
            ) : (
              "Đăng Ký Thành Viên"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
