// ====== CONFIG ======
const TG_LINK = "https://t.me/your_bot_or_chat"; // <-- поменяйте на ваш Telegram
// ====================

function withUtm(link) {
  // Если на сайте есть UTM, прокидываем их в tg-link как query (для последующей обработки на вашей стороне).
  // Примечание: Telegram боты обычно читают только start-параметр, но оставим универсально.
  const url = new URL(window.location.href);
  const utmKeys = ["utm_source","utm_medium","utm_campaign","utm_content","utm_term"];
  const hasUtm = utmKeys.some(k => url.searchParams.has(k));
  if (!hasUtm) return link;

  try {
    const out = new URL(link);
    utmKeys.forEach(k => {
      if (url.searchParams.has(k)) out.searchParams.set(k, url.searchParams.get(k));
    });
    return out.toString();
  } catch {
    return link;
  }
}

function wireTelegramLinks() {
  const a = document.querySelectorAll("[data-tg]");
  const finalLink = withUtm(TG_LINK);
  a.forEach(el => {
    el.setAttribute("href", finalLink);
    el.setAttribute("rel", "noopener");
    el.setAttribute("target", "_blank");
  });
}

function setCurrentNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current","page");
  });
}

function stickyClose() {
  const close = document.querySelector("[data-sticky-close]");
  const bar = document.querySelector(".stickyCta");
  if (!close || !bar) return;
  const key = "stickyCtaClosed";
  if (localStorage.getItem(key) === "1") bar.style.display = "none";
  close.addEventListener("click", () => {
    bar.style.display = "none";
    localStorage.setItem(key, "1");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireTelegramLinks();
  setCurrentNav();
  stickyClose();
});
