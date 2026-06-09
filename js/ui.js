// js/ui.js - Renderizado de UI (tarjetas, detalles, filtros)

function createProductCard(p) {
  const div = document.createElement('div');
  div.className = "bg-white rounded-2xl border border-art-border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group cursor-pointer flex flex-col justify-between product-card";
  // Enlace a detalles.html con el ID
  div.setAttribute('onclick', `window.location.href='detalles.html?id=${p.id}'`);
  
  const cats = { pulseras: '📿 Pulsera', atrapasuenos: '🕸️ Atrapasueños', esculturas: '🏺 Escultura', sombreros: '🎓 Sombrero' };
  
  div.innerHTML = `
    <div>
      <div class="relative h-64 bg-art-bg overflow-hidden">
        <img src="${p.img}" alt="${p.nombre}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
        <span class="absolute top-3 left-3 bg-white/90 text-art-text text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-sm">${cats[p.categoria] || p.categoria}</span>
      </div>
      <div class="p-5 space-y-1">
        <h3 class="font-serif font-bold text-art-text text-lg group-hover:text-art-accent transition-colors">${p.nombre}</h3>
        <p class="text-xs text-art-text/50 line-clamp-2 mt-1">${p.descripcion.slice(0, 70)}...</p>
      </div>
    </div>
    <div class="px-5 pb-5 pt-2 flex items-center justify-between border-t border-art-bg">
      <span class="text-xl font-bold text-art-accent">${p.precio}</span>
      <span class="text-xs text-art-secondary font-semibold border border-art-secondary/30 group-hover:bg-art-secondary group-hover:text-white px-3 py-1.5 rounded-full transition-all">Ver detalles <i class="fa-solid fa-chevron-right ml-1 text-[8px]"></i></span>
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
        <i class="fa-solid fa-triangle-exclamation text-5xl text-art-accent mb-4"></i>
        <h2 class="text-2xl font-serif font-bold text-art-text">Producto no encontrado</h2>
        <p class="text-art-text/70 mt-2">La pieza que buscas no existe o fue removida.</p>
        <a href="catalogo.html" class="inline-block mt-6 bg-art-accent text-white px-6 py-3 rounded-full">Ver catálogo</a>
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
        <div class="bg-art-bg rounded-2xl overflow-hidden border border-art-border">
          <img id="detalle-img-principal" src="${producto.img}" alt="${producto.nombre}" class="w-full h-[350px] md:h-[450px] object-cover">
        </div>
        <div class="flex gap-3 mt-4 overflow-x-auto pb-2" id="detalle-miniaturas">
          ${producto.miniaturas.map(url => `
            <img src="${url}" class="w-20 h-20 rounded-xl object-cover border-2 border-art-border cursor-pointer hover:border-art-accent transition-all miniatura-producto" onclick="document.getElementById('detalle-img-principal').src='${url}'">
          `).join('')}
        </div>
      </div>
      
      <!-- Información del producto -->
      <div class="lg:col-span-5 space-y-5">
        <div>
          <span class="inline-block bg-art-secondary text-white text-xs font-bold uppercase px-3 py-1 rounded-full">${cats[producto.categoria] || producto.categoria}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-art-text">${producto.nombre}</h1>
        <p class="text-3xl font-bold text-art-accent">${producto.precio}</p>
        
        <div class="border-t border-b border-art-border/60 py-4">
          <p class="text-sm font-bold text-art-text/60 uppercase tracking-wider mb-2">Descripción de la artesana</p>
          <p class="text-art-text/80 leading-relaxed">${producto.descripcion}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-art-bg p-3.5 rounded-xl border border-art-border/40">
            <span class="block text-xs font-bold text-art-text/50 uppercase">Materiales</span>
            <span class="text-sm font-semibold text-art-text">${producto.materiales}</span>
          </div>
          <div class="bg-art-bg p-3.5 rounded-xl border border-art-border/40">
            <span class="block text-xs font-bold text-art-text/50 uppercase">Tamaño / Medidas</span>
            <span class="text-sm font-semibold text-art-text">${producto.tamano}</span>
          </div>
        </div>
        
        <div class="space-y-2 pt-2">
          <div class="flex items-center gap-2 text-xs text-art-text/70">
            <i class="fa-solid fa-gift text-art-accent"></i>
            <span><strong>Empaque de regalo eco-amigable:</strong> Bolsa de lona y etiqueta manuscrita.</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-art-text/70">
            <i class="fa-solid fa-truck text-art-accent"></i>
            <span><strong>Envíos:</strong> Envíos desde La Habana a toda Cuba. Tiempos de entrega coordinados.</span>
          </div>
        </div>
        
        <div class="pt-4">
          <a href="https://wa.me/5358481876?text=Hola%20Gavy%20Montez!%20Me%20encant%C3%B3%20la%20pieza%20%C3%BAnica%20%22${encodeURIComponent(producto.nombre)}%22%20(${producto.precio}).%20%C2%BFEst%C3%A1%20disponible%20para%20env%C3%ADo%3F%20Muchas%20gracias." target="_blank" class="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-2xl font-bold text-center block transition-all flex items-center justify-center gap-3">
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
    card.className = "flex-shrink-0 w-64 snap-start bg-white rounded-2xl border border-art-border overflow-hidden cursor-pointer transition-all hover:shadow-md group";
    card.setAttribute('onclick', `window.location.href='detalle.html?id=${prod.id}'`);
    card.innerHTML = `
      <div class="h-40 bg-art-bg overflow-hidden">
        <img src="${prod.img}" class="w-full h-full object-cover group-hover:scale-105 transition duration-300">
      </div>
      <div class="p-4">
        <h4 class="font-serif font-bold text-art-text text-sm truncate group-hover:text-art-accent transition-colors">${prod.nombre}</h4>
        <div class="flex justify-between items-center pt-2">
          <span class="text-base font-bold text-art-accent">${prod.precio}</span>
          <span class="text-[10px] font-medium text-art-secondary uppercase">Ver artículo</span>
        </div>
      </div>
    `;
    carousel.appendChild(card);
  });
}

// Exponer funciones globales
window.filterCategory = filterCategory;
window.cargarDetalleProducto = cargarDetalleProducto;