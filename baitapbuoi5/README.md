# Bài tập thực hành buổi 6: Xây dựng server + form đăng ký người dùng

Dự án này là một ứng dụng Web nhỏ sử dụng Node.js, Express cho Backend và HTML/CSS/Vanilla JS (Fetch API) cho Frontend, được xây dựng theo yêu cầu của bài tập thực hành.

## Cấu trúc thư mục

```text
baitapbuoi5/
├── .env                # Cấu hình biến môi trường (PORT)
├── .gitignore          # Các file/thư mục không đưa lên Git
├── index.js            # Express server (Router & Middleware)
├── package.json        # Thông tin project và dependencies
└── public/             # Thư mục chứa các file static cho Frontend
    ├── index.html      # Giao diện người dùng
    └── style.css       # Style cho giao diện
```

## Các chức năng chính

### 1. Backend (Express Server)
- Phục vụ các file tĩnh (HTML, CSS) từ thư mục `public`.
- **Middleware `logger`**: Ghi log ra console thời gian, phương thức (METHOD) và đường dẫn (PATH) cho mọi request gửi lên server.
- **Middleware `checkAge`**: Kiểm tra tuổi của người dùng. Nếu dưới 18 tuổi hoặc không nhập tuổi, trả về lỗi HTTP 400.
- **GET `/api/info`**:
  - Nhận `name` và `age` qua query parameters.
  - Đi qua middleware `checkAge`.
  - Trả về JSON chứa tên, tuổi và lời chào mừng.
- **POST `/api/register`**:
  - Nhận `name`, `age`, `email` qua body (JSON).
  - Validate dữ liệu đầu vào không được bỏ trống.
  - Trả về thông tin người dùng kèm theo `id` tự động tăng.

### 2. Frontend (HTML + Fetch API)
- Giao diện gồm 2 form riêng biệt.
- Sử dụng `fetch()` để gọi API không làm tải lại trang (no reload).
- Tự động hiển thị kết quả JSON trả về từ server ngay bên dưới mỗi form.
- Đổi màu text hiển thị kết quả (đỏ nếu lỗi, xám đen nếu thành công).

## Hướng dẫn cài đặt và chạy thử

1. **Cài đặt các gói phụ thuộc (Dependencies)**
   Mở terminal tại thư mục dự án và chạy:
   ```bash
   npm install
   ```

2. **Khởi động server**
   ```bash
   node index.js
   ```
   *Terminal sẽ hiện thông báo: `Server is running on http://localhost:3000`*

3. **Kiểm tra giao diện**
   Mở trình duyệt web và truy cập vào địa chỉ:
   [http://localhost:3000](http://localhost:3000)

4. **Test các Form:**
   - **Form 1 (Kiểm tra thông tin):**
     - Thử nhập tuổi dưới 18 -> Sẽ nhận được thông báo lỗi.
     - Thử nhập tuổi lớn hơn hoặc bằng 18 -> Nhận được JSON chào mừng.
   - **Form 2 (Đăng ký người dùng):**
     - Điền đầy đủ thông tin rồi bấm Gửi -> Nhận được thông tin JSON kèm `id: 1` (id sẽ tăng dần cho các lần tiếp theo).
     - Thử bỏ trống một trường (bằng cách xóa required trong DevTools rồi gửi) -> Nhận được lỗi yêu cầu điền đầy đủ.
