# Bài tập buổi 7: Server Actions & Form Validation

Dự án này thực hiện yêu cầu "Bài tập buổi 7", xây dựng một form đăng ký thành viên với Next.js, kết hợp Server Actions, React Hook Form và Zod.

## Tính năng chính
- **Client-Side Validation (React Hook Form + Zod)**: Kiểm tra tính hợp lệ của dữ liệu trực tiếp khi người dùng nhập (real-time validation).
- **Server-Side Validation (Next.js Server Actions + Zod)**: Xác thực dữ liệu lần hai (Double Validation) tại phía Server bằng `safeParse` đảm bảo an toàn tối đa.
- **Uncontrolled Components**: Sử dụng `register` của React Hook Form thay vì State để tối ưu hiệu năng render.
- **UI/UX Premium**: Giao diện đăng ký với thiết kế Dark Theme, Glassmorphism và các vi hiệu ứng (micro-animations).

## Ràng buộc dữ liệu (Validation Rules)
- **Tên**: Không được để trống.
- **Email**: Đúng định dạng email hợp lệ.
- **Mật khẩu**: Tối thiểu 8 ký tự, bao gồm ít nhất 1 chữ hoa và 1 chữ số.
- **Xác nhận mật khẩu**: Phải khớp chính xác với Mật khẩu.

## Cài đặt và chạy dự án

```bash
npm install
npm run dev
```

Sau đó mở trình duyệt và truy cập vào [http://localhost:3000](http://localhost:3000).
