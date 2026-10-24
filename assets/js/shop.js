// Product listing page: category filter, search, on-sale toggle and sorting.
// State lives in the URL (?category=&sort=&q=&sale=1) so links and the back button work.

const SORTERS = {
  featured: (a, b) => (b.featured === true) - (a.featured === true) || b.rating - a.rating,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
  newest: (a, b) => b.added.localeCompare(a.added),
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
};

const els = {
  pills: document.getElementById('category-pills'),
  grid: document.getElementById('product-grid'),
  empty: document.getElementById('empty-state'),
  count: document.getElementById('result-count'),
  search: document.getElementById('search'),
  sort: document.getElementById('sort'),
  sale: document.getElementById('on-sale'),
  title: document.getElementById('page-title'),
  blurb: document.getElementById('page-blurb'),
  crumb: document.getElementById('crumb'),
};

const params = new URLSearchParams(location.search);
const state = {
  category: getCategory(params.get('category')) ? params.get('category') : 'all',
  sort: SORTERS[params.get('sort')] ? params.get('sort') : 'featured',
  q: params.get('q') || '',
  sale: params.get('sale') === '1',
};

function syncUrl() {
  const p = new URLSearchParams();
  if (state.category !== 'all') p.set('category', state.category);
  if (state.sort !== 'featured') p.set('sort', state.sort);
  if (state.q) p.set('q', state.q);
  if (state.sale) p.set('sale', '1');
  const qs = p.toString();
  history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
}

function renderPills() {
  const options = [{ id: 'all', name: 'All products', icon: '✨' }, ...CATEGORIES];
  els.pills.innerHTML = options
    .map((c) => {
      const active = c.id === state.category;
      return `<button type="button" role="tab" aria-selected="${active}" data-category="${c.id}"
        class="flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 font-display font-semibold transition ${
          active ? 'bg-grape-700 text-white shadow-soft' : 'bg-white text-grape-800 ring-1 ring-grape-100 hover:bg-grape-50'
        }"><span aria-hidden="true">${c.icon}</span>${c.name}</button>`;
    })
    .join('');
}

function renderHeading() {
  const cat = getCategory(state.category);
  els.title.textContent = cat ? cat.name : 'All products';
  els.crumb.textContent = cat ? cat.name : 'Shop';
  els.blurb.textContent = cat ? cat.blurb : 'Tools, furniture, kitchenware, tech and bathroom bits, all in one friendly place.';
  document.title = `${cat ? cat.name : 'Shop'} | SC Industries`;
}

function renderGrid() {
  const q = state.q.trim().toLowerCase();
  const results = PRODUCTS.filter((p) => state.category === 'all' || p.category === state.category)
    .filter((p) => !state.sale || p.compareAt)
    .filter((p) => !q || `${p.name} ${p.short} ${p.category}`.toLowerCase().includes(q))
    .sort(SORTERS[state.sort]);

  els.grid.innerHTML = results.map(productCardHTML).join('');
  els.empty.classList.toggle('hidden', results.length > 0);
  els.count.textContent = `${results.length} ${results.length === 1 ? 'item' : 'items'}`;
}

function render() {
  renderPills();
  renderHeading();
  renderGrid();
  syncUrl();
}

els.pills.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-category]');
  if (!btn) return;
  state.category = btn.dataset.category;
  render();
});

els.search.addEventListener('input', () => {
  state.q = els.search.value;
  renderGrid();
  syncUrl();
});

els.sort.addEventListener('change', () => {
  state.sort = els.sort.value;
  renderGrid();
  syncUrl();
});

els.sale.addEventListener('change', () => {
  state.sale = els.sale.checked;
  renderGrid();
  syncUrl();
});

document.getElementById('clear-filters').addEventListener('click', () => {
  Object.assign(state, { category: 'all', q: '', sale: false });
  els.search.value = '';
  els.sale.checked = false;
  render();
});

els.search.value = state.q;
els.sort.value = state.sort;
els.sale.checked = state.sale;
render();
