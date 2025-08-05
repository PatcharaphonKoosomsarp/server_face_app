function handleCredentialResponse(response) {
  // ถอดรหัส JWT จาก Google
  const decoded = parseJwt(response.credential);

  // แสดงข้อมูลผู้ใช้
  const name = decoded.name;
  const email = decoded.email;
  const picture = decoded.picture;

  // บันทึกลง localStorage
  localStorage.setItem("user", JSON.stringify({ name, email, picture }));

  // เด้งไปหน้า index.html
  window.location.href = "index.html";
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
}

// ใช้ตอนโหลดหน้า index.html เพื่อแสดงชื่อผู้ใช้
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const loginButton = document.querySelector(".login-button");
    if (loginButton) {
      loginButton.innerHTML = `<img src="${user.picture}" style="width:24px;height:24px;border-radius:50%;vertical-align:middle;margin-right:8px;">${user.name}`;
      loginButton.onclick = () => {
        // เพิ่ม action เช่น dropdown เมนู logout
        alert("คุณเข้าสู่ระบบแล้วในชื่อ: " + user.email);
      };
    }
  }
};

// เปลี่ยนระหว่าง Login/Register
function switchMode(mode) {
  document.getElementById("loginTab").classList.remove("active");
  document.getElementById("registerTab").classList.remove("active");
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.remove("active");

  if (mode === 'login') {
    document.getElementById("loginTab").classList.add("active");
    document.getElementById("loginForm").classList.add("active");
  } else {
    document.getElementById("registerTab").classList.add("active");
    document.getElementById("registerForm").classList.add("active");
  }
}

function goHome() {
  window.location.href = "index.html";
}
