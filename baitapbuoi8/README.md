# 🛡️ NextAuth Token Refresh - Hệ thống Quản lý Quyền Truy cập

Dự án này mô phỏng cơ chế tự động làm mới token (Token Refresh) và phân quyền người dùng (RBAC) sử dụng NextAuth.js trên nền tảng Next.js (Pages Router).

## 🚀 Tính năng chính
- **Tự động Refresh Token**: `accessToken` có thời hạn ngắn (60 giây). Hệ thống tự động làm mới token ngầm khi người dùng thực hiện thao tác sau khi token hết hạn.
- **Phân quyền (RBAC)**: Phân định rõ quyền hạn giữa Cố vấn (`ROLE_ADVISOR`) và Sinh viên (`ROLE_STUDENT`).
- **Giao diện Premium**: Thiết kế hiện đại, bám sát yêu cầu kịch bản trình diễn (Presentation).

## 📂 Cấu trúc dự án
- `pages/_app.js`: Quản lý Session Context toàn ứng dụng.
- `pages/login.js`: Giao diện đăng nhập.
- `pages/index.js`: Dashboard chính tích hợp logic kiểm soát truy cập.
- `pages/api/auth/[...nextauth].js`: Trái tim của hệ thống (chứa cấu hình Providers và Callbacks).

## 🛠️ Hướng dẫn Demo (Kịch bản kịch tính)

### 1. Kiểm tra phân quyền
- Đăng nhập tài khoản: `student` / `123456`.
- **Kết quả**: Hệ thống hiển thị màn hình **"Bị Từ Chối Truy Cập"** do không đủ quyền hạn.

### 2. Kiểm tra Token Refresh (Quan trọng)
- Đăng nhập tài khoản: `advisor` / `123456`.
- Quan sát đồng hồ đếm ngược (60 giây) tại Dashboard.
- **Bước A**: Khi token còn hạn, bấm **"Lấy danh sách lớp"** -> Dữ liệu hiện ra ngay.
- **Bước B**: Chờ đồng hồ về **0s**. Bấm lại nút trên.
- **Kết quả**: Dữ liệu vẫn hiện ra thành công. Kiểm tra Console (F12) sẽ thấy log: `Token hết hạn, đang refresh...`.

## 🔑 Tài khoản Demo
| Username | Password | Role |
| :--- | :--- | :--- |
| `student` | `123456` | `ROLE_STUDENT` |
| `advisor` | `123456` | `ROLE_ADVISOR` |

## 🛠️ Cài đặt và Chạy
```bash
# Cài đặt dependencies
npm install

# Chạy server phát triển
npm run dev
```
