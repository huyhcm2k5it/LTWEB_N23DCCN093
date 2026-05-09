import { useSession, signOut, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [classList, setClassList] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    if (session?.accessTokenExpires) {
      const interval = setInterval(() => {
        const now = Math.floor(Date.now() / 1000);
        const remaining = session.accessTokenExpires - now;
        setTimeLeft(remaining > 0 ? remaining : 0);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchClasses = async () => {
    // Giả lập gọi API backend yêu cầu accessToken
    const classes = [
      { id: 1, name: "Lớp A1", students: 30 },
      { id: 2, name: "Lớp A2", students: 28 },
      { id: 3, name: "Lớp A3", students: 32 }
    ];
    
    setClassList({
      classes,
      accessToken: session.accessToken,
      expiresAt: new Date(session.accessTokenExpires * 1000).toLocaleTimeString('vi-VN'),
      timestamp: new Date().toLocaleTimeString('vi-VN')
    });
  };

  if (status === "loading") return <div className="container" style={{color: 'white', textAlign: 'center'}}>Đang tải...</div>;
  if (!session) return null;

  // PHẦN 5: TRƯỜNG HỢP STUDENT (BỊ TỪ CHỐI)
  if (session.user.role === "ROLE_STUDENT") {
    return (
      <div className="container">
        <div className="section-header">
          <h1>Demo: Phân Quyền Truy Cập</h1>
          <div className="underline"></div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', justifyContent: 'center' }}>
          <div style={{ width: '400px' }}>
            <h3 style={{ marginBottom: '20px', color: 'white', textAlign: 'center' }}>STUDENT</h3>
            <div className="access-denied">
              <div className="x-icon">❌</div>
              <h3>Bị Từ Chối Truy Cập</h3>
              <p>Bạn không có quyền truy cập trang này. Chỉ Cố Vấn (ROLE_ADVISOR) mới được phép.</p>
              <div className="role-badge">Role của bạn: {session.user.role}</div>
              <button 
                onClick={() => signOut()}
                style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PHẦN 6: TRƯỜNG HỢP ADVISOR (DASHBOARD)
  return (
    <div className="container">
      <div className="advisor-section" style={{ marginTop: '50px' }}>
        <h2 style={{ marginBottom: '40px', color: '#333' }}>Demo: Token Refresh Tự Động</h2>
        
        <div className="advisor-content">
          <div className="login-left">
            <h3>🔐 Trạng Thái</h3>
            <div style={{textAlign: 'center', padding: '20px'}}>
               <p style={{fontSize: '50px'}}>✅</p>
               <p style={{marginTop: '10px', fontWeight: '600'}}>Đã Đăng Nhập</p>
            </div>
            <div className="demo-creds">
              <p><strong>Thông tin:</strong></p>
              <p>User: <code>{session.user.name}</code></p>
              <p>Role: <code>{session.user.role}</code></p>
            </div>
          </div>

          <div className="arrow-center">↓</div>

          <div className="dashboard-panel">
            <div className="dashboard-header">
              <h4>📊 Dashboard Cố Vấn</h4>
              <div className="dashboard-info">
                <span className="icon">👤</span>
                <span className="label">Người dùng:</span>
                <span className="value">{session.user.name}</span>
              </div>
              <div className="dashboard-info">
                <span className="icon">🔑</span>
                <span className="label">Role:</span>
                <span className="value">{session.user.role}</span>
              </div>
              <div className="dashboard-info">
                <span className="icon">⏱️</span>
                <span className="label">Access Token hết hạn sau:</span>
                <span className="value token-time">{timeLeft}s</span>
              </div>
              <div className="dashboard-info">
                <span className="icon">🎫</span>
                <span className="label">Token hiện tại:</span>
                <span className="value">{session.accessToken.substring(0, 20)}...</span>
              </div>
            </div>

            <div className="dashboard-section-title">Kiểm Tra Token Refresh</div>

            <div className="demo-guide">
              <strong>Hướng dẫn demo:</strong>
              <ol>
                <li><span className="checkmark">✅</span> Bấm "Lấy danh sách lớp" (Token còn hạn)</li>
                <li>Đợi 60+ giây hoặc chờ "Access Token hết hạn sau: 0s"</li>
                <li><span className="checkmark">🔄</span> Bấm lại "Lấy danh sách lớp" (NextAuth sẽ tự động refresh token)</li>
                <li>Kiểm tra console để xem log "Token hết hạn, đang refresh..."</li>
              </ol>
            </div>

            <div className="buttons-group">
              <button className="btn btn-primary" onClick={fetchClasses}>📋 Lấy danh sách lớp</button>
              <button className="btn btn-danger" onClick={() => signOut()}>Đăng Xuất</button>
            </div>

            <div className={`result-box ${classList ? 'active' : ''}`}>
              <h5>📚 Kết Quả:</h5>
              <pre>{JSON.stringify(classList, null, 2)}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
