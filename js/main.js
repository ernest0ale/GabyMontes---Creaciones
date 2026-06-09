// js/main.js - Punto de entrada y eventos globales

document.addEventListener('DOMContentLoaded', function() {
  // Renderizar productos destacados en index.html
  if (document.getElementById('featured-grid')) {
    renderFeatured();
  }
  
  // Renderizar catálogo en catalogo.html
  if (document.getElementById('catalogo-grid')) {
    renderCatalogo('todos');
  }
  
  // Marcar navegación activa según la página actual
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('text-art-accent', 'border-art-accent');
      link.classList.remove('text-art-text', 'border-transparent');
    }
  });
});