
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('mobile-open') ?? false;
  document.body.classList.toggle('menu-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});



document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav?.classList.contains('mobile-open')) {
    nav.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.focus();
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const travelForm = document.querySelector('#travel-form');
if (travelForm) {
  travelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(travelForm);
    const values = Object.fromEntries(data.entries());

    const message =
`Hola Velora Travel, quiero información para mi próximo viaje.

Nombre: ${values.nombre || ''}
Destino o idea: ${values.destino || ''}
Fecha aproximada: ${values.fecha || ''}
Viajeros: ${values.viajeros || ''}
Presupuesto estimado: ${values.presupuesto || ''}
Tipo de experiencia: ${values.experiencia || ''}

Mensaje:
${values.mensaje || ''}`;

    const phone = '5215519000905';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  });
}
