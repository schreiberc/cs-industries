// Single product page, driven by ?id=<product id>.

const root = document.getElementById('product-root');
const product = getProduct(new URLSearchParams(location.search).get('id'));

function renderNotFound() {
  root.innerHTML = `
    <div class="mx-auto max-w-xl rounded-blob bg-white p-12 text-center shadow-soft ring-1 ring-grape-100">
      <p class="text-6xl">🧐</p>
      <h1 class="mt-4 font-display text-3xl font-semibold text-grape-900">We couldn’t find that product</h1>
      <p class="mt-2 text-ink/70">It may have moved or sold out. Have a look around the shop instead.</p>
      <a href="products.html" class="mt-6 inline-block rounded-full bg-grape-700 px-6 py-3 font-bold text-white hover:bg-grape-800">Back to the shop</a>
    </div>`;
}

function renderProduct(p) {
  const cat = getCategory(p.category);
  const saving = p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0;
  document.title = `${p.name} | SC Industries`;
  document.querySelector('meta[name="description"]').setAttribute('content', p.short);

  const specs = Object.entries(p.specs)
    .map(
      ([k, v]) => `<div class="flex justify-between gap-4 border-b border-grape-100 py-3 last:border-0">
        <dt class="font-semibold text-ink/70">${k}</dt><dd class="text-right font-bold text-ink">${v}</dd></div>`
    )
    .join('');

  const features = p.features
    .map(
      (f) => `<li class="flex items-start gap-3"><span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sun-200 text-sm font-bold text-grape-900">✓</span><span>${f}</span></li>`
    )
    .join('');

  root.innerHTML = `
    <nav class="text-sm text-ink/60" aria-label="Breadcrumb">
      <a href="index.html" class="hover:text-grape-700">Home</a> <span class="mx-1">/</span>
      <a href="products.html" class="hover:text-grape-700">Shop</a> <span class="mx-1">/</span>
      <a href="products.html?category=${cat.id}" class="hover:text-grape-700">${cat.name}</a> <span class="mx-1">/</span>
      <span class="font-semibold text-ink">${p.name}</span>
    </nav>

    <div class="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div class="relative">
        <div class="absolute -left-3 -top-3 h-full w-full rounded-blob bg-sky2-200" aria-hidden="true"></div>
        <div class="relative overflow-hidden rounded-blob bg-white shadow-soft">
          <img src="${p.image}" alt="${p.name}" class="aspect-square w-full object-cover">
          ${badgeHTML(p.badge)}
        </div>
      </div>

      <div>
        <a href="products.html?category=${cat.id}" class="inline-flex items-center gap-2 rounded-full ${cat.accent} px-3 py-1 text-sm font-bold">${cat.icon} ${cat.name}</a>
        <h1 class="mt-4 font-display text-4xl font-semibold leading-tight text-grape-900 sm:text-5xl">${p.name}</h1>
        <div class="mt-3 flex items-center gap-2 text-ink/70">${starsHTML(p.rating, 'h-5 w-5')} <span class="font-semibold">${p.rating}</span> <span>· ${p.reviews} reviews</span></div>

        <div class="mt-6 flex flex-wrap items-baseline gap-3">
          <span class="font-display text-4xl font-semibold text-grape-800">${formatPrice(p.price)}</span>
          ${p.compareAt ? `<span class="text-xl text-ink/50 line-through">${formatPrice(p.compareAt)}</span>
          <span class="rounded-full bg-sun-300 px-3 py-1 text-sm font-bold text-grape-900">Save ${saving}%</span>` : ''}
        </div>

        <p class="mt-5 text-lg leading-relaxed text-ink/80">${p.description}</p>

        <div class="mt-6 flex items-center gap-2 font-semibold text-sky2-700">
          <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span> In stock, ready to ship
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <div class="flex items-center rounded-full border-2 border-grape-200 bg-white">
            <button type="button" id="qty-dec" class="h-12 w-12 rounded-full text-2xl font-bold text-grape-700 hover:bg-grape-50" aria-label="Decrease quantity">−</button>
            <input id="qty" type="number" min="1" max="99" value="1" class="w-12 border-0 bg-transparent text-center text-lg font-bold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" aria-label="Quantity">
            <button type="button" id="qty-inc" class="h-12 w-12 rounded-full text-2xl font-bold text-grape-700 hover:bg-grape-50" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" data-buy="${p.id}" class="flex-1 rounded-full bg-grape-700 px-8 py-3.5 font-display text-lg font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-grape-800 sm:flex-none">Buy now</button>
          <button type="button" data-buy="${p.id}" class="flex-1 rounded-full bg-sun-300 px-8 py-3.5 font-display text-lg font-semibold text-grape-900 shadow-soft transition hover:-translate-y-0.5 hover:bg-sun-400 sm:flex-none">Add to cart</button>
        </div>

        <ul class="mt-8 grid gap-3 rounded-blob bg-grape-50 p-5 text-sm font-semibold text-grape-900 sm:grid-cols-3">
          <li>🚚 Free delivery over $99</li>
          <li>↩️ 30-day easy returns</li>
          <li>🛡️ ${p.specs.Warranty && p.specs.Warranty !== '—' ? p.specs.Warranty + ' warranty' : 'Quality guaranteed'}</li>
        </ul>
      </div>
    </div>

    <div class="mt-16 grid gap-8 lg:grid-cols-2">
      <section class="rounded-blob bg-white p-8 shadow-soft ring-1 ring-grape-100">
        <h2 class="font-display text-2xl font-semibold text-grape-900">Why you’ll love it</h2>
        <ul class="mt-5 space-y-3 text-ink/80">${features}</ul>
      </section>
      <section class="rounded-blob bg-white p-8 shadow-soft ring-1 ring-grape-100">
        <h2 class="font-display text-2xl font-semibold text-grape-900">Specifications</h2>
        <dl class="mt-3">${specs}</dl>
      </section>
    </div>`;

  const qty = document.getElementById('qty');
  const clamp = (n) => Math.min(99, Math.max(1, n || 1));
  document.getElementById('qty-dec').addEventListener('click', () => (qty.value = clamp(+qty.value - 1)));
  document.getElementById('qty-inc').addEventListener('click', () => (qty.value = clamp(+qty.value + 1)));
  qty.addEventListener('change', () => (qty.value = clamp(+qty.value)));

  const related = PRODUCTS.filter((r) => r.category === p.category && r.id !== p.id).slice(0, 4);
  document.getElementById('related-grid').innerHTML = related.map(productCardHTML).join('');
  document.getElementById('related').classList.remove('hidden');
}

if (product) {
  renderProduct(product);
} else {
  renderNotFound();
}
