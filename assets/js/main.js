
const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 24);
});

menuToggle?.addEventListener('click', () => {
  nav?.classList.toggle('mobile-open');
  document.body.classList.toggle('menu-open');
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav?.classList.remove('mobile-open');
    document.body.classList.remove('menu-open');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.step').forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const travelForm = document.querySelector('#travel-form');
if (travelForm) {
  travelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(travelForm);
    const values = Object.fromEntries(data.entries());

    const message =
`Hola Velora Travel, quiero diseñar un viaje a la medida.

Nombre: ${values.nombre || ''}
Destino o idea: ${values.destino || ''}
Fecha aproximada: ${values.fecha || ''}
Viajeros: ${values.viajeros || ''}
Presupuesto estimado: ${values.presupuesto || ''}
Tipo de experiencia: ${values.experiencia || ''}

Mensaje:
${values.mensaje || ''}`;

    // REEMPLAZA ESTE NÚMERO POR EL WHATSAPP OFICIAL DE VELORA.
    const phone = '5210000000000';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  });
}
