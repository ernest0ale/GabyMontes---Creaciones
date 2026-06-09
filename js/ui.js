// js/ui.js - Renderizado de UI (tarjetas, detalles, filtros)

function createProductCard(p) {
  const div = document.createElement('div');
  div.className = "rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group cursor-pointer flex flex-col justify-between product-card";
  div.style.backgroundColor = "var(--card-bg)";
  div.style.borderColor = "var(--border)";
  // Enlace a detalles.html con el ID
  div.setAttribute('onclick', `window.location.href='detalles.html?id=${p.id}'`);
  
  const cats = { pulseras: '📿 Pulsera', atrapasuenos: '🕸️ Atrapasueños', esculturas: '🏺 Escultura', sombreros: '🎓 Sombrero' };
  
  div.innerHTML = `
    <div>
      <div class="relative h-64 overflow-hidden" style="background-color: var(--hero-bg);">
        <img src="${p.img}" alt="${p.nombre}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        <span class="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm" style="background-color: var(--card-bg); color: var(--accent);">${cats[p.categoria] || p.categoria}</span>
      </div>
      <div class="p-5 space-y-1">
        <h3 class="font-serif font-bold text-lg transition-colors" style="color: var(--card-text-primary);">${p.nombre}</h3>
        <p class="text-xs line-clamp-2 mt-1" style="color: var(--card-text-secondary);">${p.descripcion.slice(0, 70)}...</p>
      </div>
    </div>
    <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t" style="border-color: var(--border);">
      <span class="text-xl font-bold" style="color: var(--accent);">${p.precio}</span>
      <span class="text-xs font-semibold px-3 py-1.5 rounded-full transition-all" style="color: var(--secondary); border: 1px solid var(--secondary);">Ver detalles <i class="fa-solid fa-chevron-right ml-1 text-[8px]"></i></span>
    </div>
  `;
  return div;
}

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const destacados = productos.filter(p => p.destacado);
  destacados.forEach(p => grid.appendChild(createProductCard(p)));
}

function renderCatalogo(categoria) {
  const grid = document.getElementById('catalogo-grid');
  const emptyState = document.getElementById('empty-catalog-state');
  if (!grid) return;
  grid.innerHTML = '';
  
  const filtrados = categoria === 'todos' ? productos : productos.filter(p => p.categoria === categoria);
  
  if (filtrados.length === 0) {
    grid.classList.add('hidden');
    if (emptyState) emptyState.classList.remove('hidden');
  } else {
    grid.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');
    filtrados.forEach(p => grid.appendChild(createProductCard(p)));
  }
}

function filterCategory(catId) {
  document.querySelectorAll('#category-filters .category-btn').forEach(btn => {
    btn.classList.remove('active', 'bg-art-accent', 'text-white', 'border-art-accent');
    btn.classList.add('bg-white', 'text-art-text', 'border-art-border');
  });
  
  const activeBtn = document.querySelector(`#category-filters [data-cat="${catId}"]`);
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-art-text', 'border-art-border');
    activeBtn.classList.add('active', 'bg-art-accent', 'text-white', 'border-art-accent');
  }
  
  renderCatalogo(catId);
}

// Función para cargar detalle del producto (usada en detalle.html)
function cargarDetalleProducto(id) {
  const producto = productos.find(p => p.id === id);
  
  if (!producto) {
    document.getElementById('detalle-container').innerHTML = `
      <div class="text-center py-12">
        <i class="fa-solid fa-triangle-exclamation text-5xl mb-4" style="color: var(--accent);"></i>
        <h2 class="text-2xl font-serif font-bold" style="color: var(--text-primary);">Producto no encontrado</h2>
        <p class="mt-2" style="color: var(--text-primary); opacity: 0.7;">La pieza que buscas no existe o fue removida.</p>
        <a href="catalogo.html" class="inline-block mt-6 text-white px-6 py-3 rounded-full" style="background-color: var(--accent);">Ver catálogo</a>
      </div>
    `;
    return;
  }
  
  const cats = { pulseras: '📿 Pulseras', atrapasuenos: '🕸️ Atrapasueños', esculturas: '🏺 Esculturas', sombreros: '🎓 Sombreros' };
  
  // Actualizar título de la página
  document.title = `${producto.nombre} - Gavy Montez`;
  
  const detalleHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- Galería de imágenes -->
      <div class="lg:col-span-7">
        <div class="rounded-2xl overflow-hidden border" style="background-color: var(--hero-bg); border-color: var(--border);">
          <img id="detalle-img-principal" src="${producto.img}" alt="${producto.nombre}" class="w-full h-[350px] md:h-[450px] object-cover">
        </div>
        <div class="flex gap-3 mt-4 overflow-x-auto pb-2" id="detalle-miniaturas">
          ${producto.miniaturas.map(url => `
            <img src="${url}" class="w-20 h-20 rounded-xl object-cover border-2 cursor-pointer transition-all miniatura-producto" style="border-color: var(--border);" onmouseenter="this.style.borderColor='var(--accent)'" onmouseleave="this.style.borderColor='var(--border)'" onclick="document.getElementById('detalle-img-principal').src='${url}'">
          `).join('')}
        </div>
      </div>
      
      <!-- Información del producto -->
      <div class="lg:col-span-5 space-y-5">
        <div>
          <span class="inline-block text-white text-xs font-bold uppercase px-3 py-1 rounded-full" style="background-color: var(--secondary);">${cats[producto.categoria] || producto.categoria}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-serif font-bold" style="color: var(--detail-text-primary);">${producto.nombre}</h1>
        <p class="text-3xl font-bold" style="color: var(--accent);">${producto.precio}</p>
        
        <div class="border-t border-b py-4" style="border-color: var(--border);">
          <p class="text-sm font-bold uppercase tracking-wider mb-2" style="color: var(--detail-title-descrip);">Descripción de la artesana</p>
          <p class="leading-relaxed" style="color: var(--detail-text-desc);">${producto.descripcion}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="p-3.5 rounded-xl border" style="background-color: var(--detail-panel-caract); border-color: var(--border);">
            <span class="block text-xs font-bold uppercase" style="color: var(--detail-title-caract);">Materiales</span>
            <span class="text-sm font-semibold" style="color: var(--detail-text-caract);">${producto.materiales}</span>
          </div>
          <div class="p-3.5 rounded-xl border" style="background-color: var(--detail-panel-caract); border-color: var(--border);">
            <span class="block text-xs font-bold uppercase" style="color: var(--detail-title-caract);">Tamaño / Medidas</span>
            <span class="text-sm font-semibold" style="color: var(--detail-text-caract);">${producto.tamano}</span>
          </div>
        </div>
        
        <div class="pt-4">
          <a href="https://wa.me/5358481876?text=Hola%20Gavy%20Montez!%20Me%20encant%C3%B3%20la%20pieza%20%C3%BAnica%20%22${encodeURIComponent(producto.nombre)}%22%20(${producto.precio}).%20%C2%BFEst%C3%A1%20disponible%20para%20env%C3%ADo%3F%20Muchas%20gracias." target="_blank" class="w-full text-white py-4 px-6 rounded-2xl font-bold text-center block transition-all flex items-center justify-center gap-3" style="background-color: #25D366;">
            <i class="fa-brands fa-whatsapp text-2xl"></i> Consultar disponibilidad por WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('detalle-container').innerHTML = detalleHTML;
  
  // Cargar productos similares
  cargarSimilares(producto.categoria, producto.id);
}

// Función para cargar productos similares (usada en detalle.html)
function cargarSimilares(categoria, idActual) {
  const carousel = document.getElementById('similares-carousel');
  const section = document.getElementById('similares-section');
  
  if (!carousel) return;
  
  let similares = productos.filter(p => p.categoria === categoria && p.id !== idActual);
  
  if (similares.length < 3) {
    const extras = productos.filter(p => p.id !== idActual && !similares.includes(p));
    similares = [...similares, ...extras].slice(0, 4);
  }
  
  if (similares.length === 0) {
    if (section) section.style.display = 'none';
    return;
  }
  
  if (section) section.style.display = 'block';
  
  carousel.innerHTML = '';
  similares.forEach(prod => {
    const card = document.createElement('div');
    card.className = "flex-shrink-0 w-64 snap-start rounded-2xl border overflow-hidden cursor-pointer transition-all hover:shadow-md group";
    card.style.backgroundColor = "var(--card-bg)";
    card.style.borderColor = "var(--border)";
    card.setAttribute('onclick', `window.location.href='detalles.html?id=${prod.id}'`);
    card.innerHTML = `
      <div class="h-40 overflow-hidden" style="background-color: var(--hero-bg);">
        <img src="${prod.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
      </div>
      <div class="p-4">
        <h4 class="font-serif font-bold text-sm truncate transition-colors" style="color: var(--card-text-primary);">${prod.nombre}</h4>
        <div class="flex justify-between items-center pt-2">
          <span class="text-base font-bold" style="color: var(--accent);">${prod.precio}</span>
          <span class="text-[10px] font-medium uppercase" style="color: var(--secondary);">Ver artículo</span>
        </div>
      </div>
    `;
    carousel.appendChild(card);
  });
}

// Exponer funciones globales
window.filterCategory = filterCategory;
window.cargarDetalleProducto = cargarDetalleProducto;