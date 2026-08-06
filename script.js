const rupee = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

const variant = document.getElementById('variant');
const salePriceEl = document.getElementById('salePrice');
const mrpPriceEl = document.getElementById('mrpPrice');
const saveTextEl = document.getElementById('saveText');
const perServingEl = document.getElementById('perServing');
const stickyPriceEl = document.getElementById('stickyPrice');

function updatePriceFromVariant() {
  const opt = variant.options[variant.selectedIndex];
  const sale = Number(opt.dataset.sale);
  const mrp = Number(opt.dataset.mrp);
  const serving = Number(opt.dataset.serving);
  const savePercent = Math.round(((mrp - sale) / mrp) * 100);

  salePriceEl.textContent = rupee(sale);
  mrpPriceEl.textContent = rupee(mrp);
  saveTextEl.textContent = `${savePercent}% OFF`;
  perServingEl.textContent = `≈ ${rupee(serving)} / serving`;
  stickyPriceEl.textContent = rupee(sale);
}

variant?.addEventListener('change', updatePriceFromVariant);
updatePriceFromVariant();

const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
thumbs.forEach((btn) => {
  btn.addEventListener('click', () => {
    mainImage.src = btn.dataset.img;
    thumbs.forEach((t) => t.classList.remove('active'));
    btn.classList.add('active');
  });
});

const bundleChecks = document.querySelectorAll('.bundle-item');
const bundleTotal = document.getElementById('bundleTotal');

function updateBundleTotal() {
  let total = 0;
  bundleChecks.forEach((c) => {
    if (c.checked) total += Number(c.dataset.price || 0);
  });
  bundleTotal.textContent = rupee(total);
}

bundleChecks.forEach((c) => c.addEventListener('change', updateBundleTotal));
updateBundleTotal();

const addToCartBtn = document.getElementById('addToCartBtn');
const buyNowBtn = document.getElementById('buyNowBtn');
const stickyAddBtn = document.getElementById('stickyAddBtn');
const bundleBtn = document.getElementById('bundleBtn');

function notify(msg) {
  const n = document.createElement('div');
  n.textContent = msg;
  n.style.position = 'fixed';
  n.style.right = '16px';
  n.style.bottom = '72px';
  n.style.background = '#0f766e';
  n.style.color = '#fff';
  n.style.padding = '10px 12px';
  n.style.borderRadius = '10px';
  n.style.zIndex = '100';
  document.body.appendChild(n);
  setTimeout(() => n.remove(), 1800);
}

addToCartBtn?.addEventListener('click', () => notify('Added to cart ✅'));
buyNowBtn?.addEventListener('click', () => notify('Proceeding to checkout 🚀'));
stickyAddBtn?.addEventListener('click', () => notify('Added to cart ✅'));
bundleBtn?.addEventListener('click', () => notify('Bundle added to cart ✅'));
