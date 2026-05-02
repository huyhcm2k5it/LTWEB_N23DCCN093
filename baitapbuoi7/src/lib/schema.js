import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(8, "Tối thiểu 8 ký tự")
    .regex(/[A-Z]/, "Cần ít nhất 1 chữ hoa")
    .regex(/[0-9]/, "Cần ít nhất 1 số"),
  confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});
