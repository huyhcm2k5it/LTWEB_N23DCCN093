import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res.error) {
      setError("Sai tài khoản hoặc mật khẩu!");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container">
      <div className="section-header">
        <h1>Ứng dụng hỗ trợ 2 Role người dùng với quyền truy cập khác nhau</h1>
        <div className="underline"></div>
      </div>

      <div className="access-control" style={{ maxWidth: '420px', margin: '0 auto' }}>
        <div className="login-panel">
          <div className="lock-icon">🔐</div>
          <h3>Đăng Nhập</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Đăng Nhập</button>
            </div>
          </form>
          {error && <p style={{ color: '#d32f2f', marginTop: '10px', fontSize: '14px' }}>{error}</p>}
          <div className="demo-credentials">
            <p><strong>Demo Credentials:</strong></p>
            <p>Student: <code>student</code> / <code>123456</code> (ROLE_STUDENT)</p>
            <p>Advisor: <code>advisor</code> / <code>123456</code> (ROLE_ADVISOR)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
