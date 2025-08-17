const yearlyPriceUsd = 5;

async function updatePrice(manual = false) {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await res.json();

    const usdToRial = data.rates.IRR;
    const usdToToman = usdToRial / 10;

    const priceToman = yearlyPriceUsd * usdToToman;
    document.getElementById("price-toman").textContent =
      ≈ ${priceToman.toLocaleString("fa-IR")} تومان;

    const now = new Date();
    document.getElementById("last-update").textContent =
      آخرین بروزرسانی: ${now.toLocaleTimeString("fa-IR")} ${manual ? "(دستی)" : ""};
  } catch (e) {
    document.getElementById("price-toman").textContent = "≈ ۴۶۷,۰۰۰ تومان (تخمینی)";
    document.getElementById("last-update").textContent = "آخرین بروزرسانی: خطا در دریافت اطلاعات";
  }
}

function manualUpdate() {
  const icon = document.getElementById("refresh-icon");
  icon.classList.add("spin");
  updatePrice(true).finally(() => {
    setTimeout(() => icon.classList.remove("spin"), 1000);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  updatePrice();
  setInterval(updatePrice, 5 * 60 * 1000);
});
