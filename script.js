// メニュー（ドリンク）と豆カード
const menuItems = document.querySelectorAll("#menu li, .bean-card");
const cart = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const milkRadios = document.getElementsByName("milk");

// ミルク追加料金
function getMilkExtra() {
  for (let radio of milkRadios) {
    if (radio.checked && radio.value === "extra") {
      return 50;
    }
  }
  return 0;
}

// カートの合計更新
function updateTotal() {
  let total = 0;
  document.querySelectorAll("#cart li").forEach((item) => {
    total += parseInt(item.dataset.price);
  });
  totalSpan.textContent = total;
}

// カートに追加
menuItems.forEach((item) => {
  const button = item.querySelector(".add-to-cart");
  if (!button) return;

  button.addEventListener("click", () => {
    // 金額取得
    let price = parseInt(item.dataset.price) + getMilkExtra();

    // 名前取得（豆カードはh3、ドリンクはテキストから）
    let name =
      item.querySelector("h3")?.textContent || item.textContent.split(" ¥")[0];

    // カートに追加
    const li = document.createElement("li");
    li.dataset.price = price;
    li.innerHTML = `☕ ${name} ¥${price} <button class="cart-remove">削除</button>`;

    // 削除ボタン
    li.querySelector(".cart-remove").onclick = () => {
      li.remove();
      updateTotal();
    };

    cart.appendChild(li);
    updateTotal();
  });
});
