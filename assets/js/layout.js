// Shared header, footer and UI helpers. Every page includes this after products.js.
// Pages set <body data-page="home|products|about|contact"> so the right nav link is highlighted.

const NAV_LINKS = [
  { href: 'index.html', label: 'Home', page: 'home' },
  { href: 'products.html', label: 'Shop', page: 'products' },
  { href: 'about.html', label: 'About', page: 'about' },
  { href: 'contact.html', label: 'Contact', page: 'contact' },
];

const LOGO_SVG = `
  <svg viewBox="0 0 48 48" class="h-10 w-10" aria-hidden="true">
    <path d="M24 3 42 13.5v21L24 45 6 34.5v-21Z" fill="#6720d4"/>
    <path d="M24 9 37 16.5v15L24 39 11 31.5v-15Z" fill="#ffc51c"/>
    <text x="24" y="29.5" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="#3f1782">SC</text>
  </svg>`;

function renderHeader() {
  const current = document.body.dataset.page;
  const links = NAV_LINKS.map((l) => {
    const active = l.page === current;
    return `<a href="${l.href}" class="rounded-full px-4 py-2 font-semibold transition ${
      active ? 'bg-grape-100 text-grape-800' : 'text-ink/80 hover:bg-grape-50 hover:text-grape-700'
    }" ${active ? 'aria-current="page"' : ''}>${l.label}</a>`;
  }).join('');

  const mobileLinks = NAV_LINKS.map(
    (l) =>
      `<a href="${l.href}" class="block rounded-xl px-4 py-3 text-lg font-semibold ${
        l.page === current ? 'bg-grape-100 text-grape-800' : 'text-ink hover:bg-grape-50'
      }">${l.label}</a>`
  ).join('');

  const categoryLinks = CATEGORIES.map(
    (c) => `<a href="products.html?category=${c.id}" class="whitespace-nowrap hover:text-sun-300 transition">${c.name}</a>`
  ).join('<span class="text-grape-400">•</span>');

  document.getElementById('site-header').innerHTML = `
    <div class="bg-grape-800 text-grape-100 text-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-center gap-3 overflow-x-auto px-4 py-2 sm:justify-between">
        <p class="hidden sm:block">👋 Friendly advice in store &amp; free delivery on orders over $99</p>
        <nav class="flex items-center gap-3 font-semibold" aria-label="Categories">${categoryLinks}</nav>
      </div>
    </div>
    <header class="sticky top-0 z-40 border-b border-grape-100 bg-cream/90 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="index.html" class="flex items-center gap-2" aria-label="SC Industries home">
          ${LOGO_SVG}
          <span class="font-display text-2xl font-semibold leading-none text-grape-800">SC <span class="text-sky2-600">Industries</span></span>
        </a>
        <nav class="hidden items-center gap-1 md:flex" aria-label="Main">${links}</nav>
        <div class="flex items-center gap-2">
          <a href="products.html" class="hidden rounded-full bg-sun-300 px-5 py-2 font-display font-semibold text-grape-900 shadow-soft transition hover:-translate-y-0.5 hover:bg-sun-400 sm:inline-block">Shop now</a>
          <button id="menu-toggle" class="rounded-full p-2 text-grape-800 hover:bg-grape-100 md:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
            <svg class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" class="hidden border-t border-grape-100 px-4 pb-4 pt-2 md:hidden">${mobileLinks}</div>
    </header>`;

  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function renderFooter() {
  const year = new Date().getFullYear();
  const categoryLinks = CATEGORIES.map(
    (c) => `<li><a href="products.html?category=${c.id}" class="hover:text-sun-300">${c.name}</a></li>`
  ).join('');

  document.getElementById('site-footer').innerHTML = `
    <footer class="mt-24 bg-grape-900 text-grape-100">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="index.html" class="flex items-center gap-2">
            ${LOGO_SVG}
            <span class="font-display text-2xl font-semibold text-white">SC Industries</span>
          </a>
          <p class="mt-4 text-grape-200">Your friendly neighbourhood store for tools, furniture, kitchen, tech and bathroom goodies.</p>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold text-sun-300">Shop</h3>
          <ul class="mt-4 space-y-2">${categoryLinks}</ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold text-sun-300">Company</h3>
          <ul class="mt-4 space-y-2">
            <li><a href="about.html" class="hover:text-sun-300">About us</a></li>
            <li><a href="contact.html" class="hover:text-sun-300">Contact</a></li>
            <li><a href="products.html" class="hover:text-sun-300">All products</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-display text-lg font-semibold text-sun-300">Say hello</h3>
          <ul class="mt-4 space-y-2 text-grape-200">
            <li>📍 123 Workshop Lane, Springfield</li>
            <li>📞 (555) 012-3456</li>
            <li>✉️ hello@scindustries.example</li>
            <li>🕘 Mon–Sat 8am – 6pm</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-grape-800">
        <div class="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-grape-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© ${year} SC Industries. Made with care. Photos from StockSnap (CC0).</p>
          <p class="sm:text-right">Development by <span class="font-bold text-sun-300">Cody Schreiber</span>, hire him, he’s the best</p>
        </div>
      </div>
    </footer>
    <div id="toast" role="status" aria-live="polite" class="hidden-toast fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-6 py-3 font-semibold text-white shadow-soft"></div>`;
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden-toast');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden-toast'), 2600);
}

function starsHTML(rating, size = 'h-4 w-4') {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const fill = rating >= i ? '#ffc51c' : rating >= i - 0.5 ? 'url(#half)' : '#e5def5';
    html += `<svg class="${size}" viewBox="0 0 20 20" aria-hidden="true"><defs><linearGradient id="half"><stop offset="50%" stop-color="#ffc51c"/><stop offset="50%" stop-color="#e5def5"/></linearGradient></defs><path fill="${fill}" d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.8z"/></svg>`;
  }
  return `<span class="flex items-center gap-0.5" role="img" aria-label="Rated ${rating} out of 5">${html}</span>`;
}

function badgeHTML(badge) {
  if (!badge) return '';
  const styles = {
    'Best seller': 'bg-sun-300 text-grape-900',
    'Top rated': 'bg-sky2-500 text-white',
    Sale: 'bg-grape-600 text-white',
    New: 'bg-white text-grape-700',
  };
  return `<span class="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold shadow ${styles[badge] || 'bg-white text-ink'}">${badge}</span>`;
}

function productCardHTML(p) {
  const cat = getCategory(p.category);
  const url = `product.html?id=${p.id}`;
  return `
    <article class="product-card group flex flex-col overflow-hidden rounded-blob bg-white shadow-soft ring-1 ring-grape-100 transition hover:-translate-y-1">
      <a href="${url}" class="relative block aspect-[4/3] overflow-hidden bg-grape-50">
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="h-full w-full object-cover">
        ${badgeHTML(p.badge)}
      </a>
      <div class="flex flex-1 flex-col p-5">
        <a href="products.html?category=${cat.id}" class="text-xs font-bold uppercase tracking-wider text-sky2-600 hover:underline">${cat.name}</a>
        <h3 class="mt-1 font-display text-lg font-semibold leading-snug text-ink"><a href="${url}" class="hover:text-grape-700">${p.name}</a></h3>
        <p class="mt-1 line-clamp-2 text-sm text-ink/70">${p.short}</p>
        <div class="mt-3 flex items-center gap-2 text-sm text-ink/60">${starsHTML(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
        <div class="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            <span class="font-display text-xl font-semibold text-grape-800">${formatPrice(p.price)}</span>
            ${p.compareAt ? `<span class="ml-1 text-sm text-ink/50 line-through">${formatPrice(p.compareAt)}</span>` : ''}
          </div>
          <button type="button" data-buy="${p.id}" class="rounded-full bg-grape-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-grape-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-sun-300">Buy</button>
        </div>
      </div>
    </article>`;
}

// One delegated listener handles every placeholder buy button on the page.
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-buy]');
  if (!btn) return;
  const product = getProduct(btn.dataset.buy);
  showToast(`🛒 Checkout coming soon: ${product ? product.name : 'this item'}`);
});

renderHeader();
renderFooter();
