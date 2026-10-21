const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
let closeProductMenu = () => {};

const productLink = links?.querySelector('a[href="products.html"]');
if (productLink) {
  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';
  const heading = document.createElement('div');
  heading.className = 'nav-dropdown-heading';
  const button = document.createElement('button');
  button.className = 'nav-submenu-toggle';
  button.type = 'button';
  button.setAttribute('aria-label', 'Open Products menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'products-submenu');
  button.innerHTML = '<span aria-hidden="true">⌄</span>';
  const submenu = document.createElement('div');
  submenu.className = 'nav-submenu';
  submenu.id = 'products-submenu';
  submenu.innerHTML = '<a href="products.html#silk-rainbow">Silk Rainbow PLA+</a><a href="products.html#silk-rgb">Silk Tri-Color PLA+</a><a href="printing-tips.html">Printing &amp; Care Tips</a>';
  if (location.pathname.endsWith('/printing-tips.html')) {
    submenu.querySelector('a[href="printing-tips.html"]')?.setAttribute('aria-current', 'page');
  }
  productLink.before(dropdown);
  heading.append(productLink, button);
  dropdown.append(heading, submenu);
  closeProductMenu = () => {
    dropdown.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  };
  button.addEventListener('click', () => {
    const open = dropdown.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) closeProductMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeProductMenu();
  });
}

const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

toggle?.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  if (!open) closeProductMenu();
});

links?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  links.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  closeProductMenu();
}));

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
