// ฟังก์ชันทั่วไปที่ใช้ร่วมในทุกหน้า
function goHome() {
  window.location.href = "index.html";
}

function switchMode(mode) {
  const loginTab = document.getElementById("loginTab");
  const registerTab = document.getElementById("registerTab");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (!loginTab || !registerTab || !loginForm || !registerForm) return;

  loginTab.classList.toggle("active", mode === "login");
  registerTab.classList.toggle("active", mode === "register");
  loginForm.classList.toggle("active", mode === "login");
  registerForm.classList.toggle("active", mode === "register");
}

// ตั้ง active link จาก URL
document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname.split("/").pop();
  document.querySelectorAll(".sidebar ul li a").forEach(a => {
    if (a.getAttribute("href") === path) {
      a.classList.add("active");
    }
  });
});

// Google credential helper
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
      `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.warn("JWT parse failed", e);
    return {};
  }
}

function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  const name = data.name || `${data.given_name || ""} ${data.family_name || ""}`.trim();
  const email = data.email || "";

  const container = document.getElementById("googleUserInfo");
  if (container) {
    container.innerHTML = `
      <p><strong>ชื่อผู้ใช้:</strong> ${name || "-"} </p>
      <p><strong>อีเมล:</strong> ${email || "-"}</p>
    `;
  }
}
