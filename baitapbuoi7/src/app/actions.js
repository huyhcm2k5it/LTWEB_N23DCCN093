"use server";

import { formSchema } from "@/lib/schema";

export async function registerUser(data) {
  // Validate data on the server (Double Validation)
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Giả lập thời gian xử lý của server (ví dụ: lưu vào database)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Trả về object kết quả
  return {
    success: true,
    message: "Đăng ký thành viên thành công!",
  };
}
