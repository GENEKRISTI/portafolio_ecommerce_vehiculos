const CATALOGO_EMBEDDED = {
  "vehiculos": [
    {
      "codigo": 101, "marca": "Porsche", "logo": "assets/logo_pagina.png", "tipo": "Clásico Deportivo",
      "modelo": "911 Carrera RS", "caracteristicas": "450 HP, Boxer 6 Cilindros, 0-100 km/h en 3.4s",
      "imagen": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600",
      "numeroPuertas": 2, "motor": "3.0L Twin-Turbo Boxer 6", "combustible": "Gasolina Premium",
      "categoria": "vehiculos", "precio_compra": 210000, "precio_venta": 265000,
      "precio_alquiler_hora": 180, "precio_alquiler_dia": 1450,
      "oferta_alquiler": "15% OFF en renta mayor a 3 días", "existencia": 4
    },
    {
      "codigo": 102, "marca": "Ford Mustang", "logo": "assets/logo_pagina.png", "tipo": "Muscle Car 60s",
      "modelo": "Shelby GT500 Fastback", "caracteristicas": "760 HP, V8 Supercharged, Diseño Icónico",
      "imagen": "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=600",
      "numeroPuertas": 2, "motor": "5.2L V8 Supercargado", "combustible": "Gasolina Premium",
      "categoria": "vehiculos", "precio_compra": 150000, "precio_venta": 195000,
      "precio_alquiler_hora": 150, "precio_alquiler_dia": 1200,
      "oferta_alquiler": "Fianza bonificada un 20%", "existencia": 3
    }
  ],
  "motos": [
    {
      "codigo": 201, "marca": "Triumph", "logo": "assets/logo_pagina.png", "tipo": "Café Racer 60s",
      "modelo": "Bonneville Thruxton RS", "caracteristicas": "105 HP, Bicilíndrico 1200cc, Estilo Vintage",
      "imagen": "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600",
      "numeroPuertas": 0, "motor": "1200 cc Bicilíndrico en paralelo", "combustible": "Gasolina Premium",
      "categoria": "motos", "precio_compra": 18000, "precio_venta": 24500,
      "precio_alquiler_hora": 55, "precio_alquiler_dia": 390,
      "oferta_alquiler": "Casco retro incluido gratis", "existencia": 5
    },
    {
      "codigo": 202, "marca": "Harley-Davidson", "logo": "assets/logo_pagina.png", "tipo": "Cruiser Clásica",
      "modelo": "Fat Boy 114", "caracteristicas": "94 HP, Milwaukee-Eight 1868cc, Cromo Puro",
      "imagen": "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600",
      "numeroPuertas": 0, "motor": "1868 cc V-Twin", "combustible": "Gasolina Premium",
      "categoria": "motos", "precio_compra": 22000, "precio_venta": 29000,
      "precio_alquiler_hora": 65, "precio_alquiler_dia": 450,
      "oferta_alquiler": "Seguro Platinum sin costo extra", "existencia": 3
    }
  ]
};

let catalogData = [];
let cart = [];
let currentCategory = 'todos';
let selectedRentalItem = null;

document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();
  fillDefaultVIPData();
});

async function loadCatalog() {
  try {
    const response = await fetch('vehiculo.json');
    if (!response.ok) throw new Error('Error de red');
    const data = await response.json();
    catalogData = [...(data.vehiculos || []), ...(data.motos || [])];
  } catch (error) {
    catalogData = [...CATALOGO_EMBEDDED.vehiculos, ...CATALOGO_EMBEDDED.motos];
  }
  renderCatalog(catalogData);
}

function renderCatalog(items) {
  const container = document.getElementById('catalogContainer');
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<div class="col-12 text-center py-5"><p class="fs-4 text-charcoal">No se encontraron unidades.</p></div>`;
    return;
  }

  items.forEach(item => {
    const isMoto = item.categoria === 'motos';
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    card.innerHTML = `
      <div class="card card-vintage h-100 position-relative">
        <span class="badge position-absolute top-0 end-0 m-3 z-2 shadow-sm" style="background-color: #ffaaa5; color: #2b2d42; font-weight: 700;">${item.oferta_alquiler}</span>
        <div class="card-img-wrapper">
          <img src="${item.imagen}" alt="${item.modelo}" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600'">
        </div>
        <div class="card-body d-flex flex-column justify-content-between p-4">
          <div>
            <div class="d-flex align-items-center justify-content-between mb-2">
              <span class="text-coral fw-bold small text-uppercase"><i class="fa-solid fa-tag me-1"></i>${item.marca}</span>
              <span class="badge" style="background-color: #a0c4ff; color: #2b2d42;">Cód: ${item.codigo}</span>
            </div>
            <h4 class="card-title text-charcoal fw-bold mb-2 vintage-title">${item.modelo}</h4>
            <p class="text-charcoal-soft small mb-3">${item.caracteristicas}</p>
            <ul class="list-unstyled small text-charcoal mb-3">
              <li><i class="fa-solid fa-microchip text-coral me-2"></i><strong>Motor:</strong> ${item.motor}</li>
              <li><i class="fa-solid fa-gas-pump text-coral me-2"></i><strong>Combustible:</strong> ${item.combustible}</li>
              ${!isMoto ? `<li><i class="fa-solid fa-door-open text-coral me-2"></i><strong>Puertas:</strong> ${item.numeroPuertas}</li>` : ''}
              <li><i class="fa-solid fa-boxes-stacked text-coral me-2"></i><strong>Stock:</strong> ${item.existencia} unidades</li>
            </ul>
          </div>
          <div>
            <div class="p-2 rounded border-pastel mb-3" style="background-color: #fcf6bd;">
              <div class="d-flex justify-content-between"><span class="small text-charcoal">Precio Venta:</span><span class="text-charcoal fw-bold">$${item.precio_venta.toLocaleString()} USD</span></div>
              <div class="d-flex justify-content-between"><span class="small text-charcoal">Renta / Día:</span><span class="text-coral fw-bold">$${item.precio_alquiler_dia} USD</span></div>
              <div class="d-flex justify-content-between"><span class="small text-charcoal">Renta / Hora:</span><span class="text-charcoal fw-semibold">$${item.precio_alquiler_hora} USD</span></div>
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-pastel-mint flex-fill fw-bold" onclick="openRentalModal(${item.codigo})">🔑 Alquilar</button>
              <button class="btn btn-pastel-coral flex-fill fw-bold" onclick="addToCartBuy(${item.codigo})">🛒 Comprar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.custom-navbar .btn-group .btn').forEach(b => b.classList.remove('active'));
  if (cat === 'todos') document.getElementById('tabAll').classList.add('active');
  if (cat === 'vehiculos') document.getElementById('tabVehiculos').classList.add('active');
  if (cat === 'motos') document.getElementById('tabMotos').classList.add('active');
  searchCatalog();
}

function searchCatalog() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const filtered = catalogData.filter(item => {
    const matchCategory = (currentCategory === 'todos' || item.categoria === currentCategory);
    const matchQuery = item.marca.toLowerCase().includes(query) || item.modelo.toLowerCase().includes(query) || item.tipo.toLowerCase().includes(query);
    return matchCategory && matchQuery;
  });
  renderCatalog(filtered);
}

function openRentalModal(code) {
  selectedRentalItem = catalogData.find(i => i.codigo === code);
  if (!selectedRentalItem) return;
  document.getElementById('rentalItemCode').value = selectedRentalItem.codigo;
  document.getElementById('rentalModalImg').src = selectedRentalItem.imagen;
  document.getElementById('rentalModalModel').innerText = selectedRentalItem.modelo;
  document.getElementById('rentalModalBrand').innerText = selectedRentalItem.marca + " | " + selectedRentalItem.tipo;
  updateRentalCalc();
  new bootstrap.Modal(document.getElementById('rentalModal')).show();
}

function updateRentalCalc() {
  if (!selectedRentalItem) return;
  const isDays = document.getElementById('typeDays').checked;
  const duration = parseInt(document.getElementById('rentalDurationInput').value) || 1;
  const rate = isDays ? selectedRentalItem.precio_alquiler_dia : selectedRentalItem.precio_alquiler_hora;
  document.getElementById('rentalModalRate').innerText = `$${rate} USD / ${isDays ? 'Día' : 'Hora'}`;
  document.getElementById('rentalModalSubtotal').innerText = `$${(rate * duration).toLocaleString()} USD`;
}

function confirmAddToCartRental() {
  const isDays = document.getElementById('typeDays').checked;
  const duration = parseInt(document.getElementById('rentalDurationInput').value) || 1;
  const startDate = document.getElementById('rentalStartDate').value;
  const unitPrice = isDays ? selectedRentalItem.precio_alquiler_dia : selectedRentalItem.precio_alquiler_hora;

  cart.push({
    tipoOperacion: 'alquiler', codigo: selectedRentalItem.codigo, marca: selectedRentalItem.marca,
    modelo: selectedRentalItem.modelo, imagen: selectedRentalItem.imagen, tipo: selectedRentalItem.tipo,
    modalidad: isDays ? 'Día(s)' : 'Hora(s)', duracion: duration, fechaInicio: startDate,
    precioUnitario: unitPrice, fianza: 500, subtotal: unitPrice * duration
  });

  updateCartBadge();
  const modalInstance = bootstrap.Modal.getInstance(document.getElementById('rentalModal'));
  if (modalInstance) modalInstance.hide();
  Swal.fire({ icon: 'success', title: 'Alquiler Configurado', text: `${selectedRentalItem.modelo} agregado al carrito.`, background: '#fdfbf7', color: '#2b2d42', confirmButtonColor: '#ffaaa5' });
}

function addToCartBuy(code) {
  const item = catalogData.find(i => i.codigo === code);
  if (!item) return;
  const existing = cart.find(c => c.tipoOperacion === 'venta' && c.codigo === code);
  if (existing) {
    existing.duracion += 1;
    existing.subtotal = existing.duracion * existing.precioUnitario;
  } else {
    cart.push({
      tipoOperacion: 'venta', codigo: item.codigo, marca: item.marca, modelo: item.modelo,
      imagen: item.imagen, tipo: item.tipo, modalidad: 'Unidad', duracion: 1,
      fechaInicio: 'N/A', precioUnitario: item.precio_venta, fianza: 0, subtotal: item.precio_venta
    });
  }
  updateCartBadge();
  Swal.fire({ icon: 'success', title: 'Vehículo Agregado', text: `${item.modelo} añadido para compra.`, background: '#fdfbf7', color: '#2b2d42', confirmButtonColor: '#a8e6cf' });
}

function updateCartBadge() { document.getElementById('cartBadge').innerText = cart.length; }

function openCartModal() {
  renderCartItems();
  new bootstrap.Modal(document.getElementById('cartModal')).show();
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  container.innerHTML = '';
  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-charcoal py-4">El carrito está vacío.</p>`;
    updateCartTotals(0, 0, 0);
    return;
  }
  let subtotalGross = 0, totalDeposit = 0;
  cart.forEach((item, index) => {
    subtotalGross += item.subtotal;
    totalDeposit += item.fianza;
    container.innerHTML += `
      <div class="p-3 bg-white rounded border-pastel mb-2 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center gap-3">
          <span class="badge" style="background-color: ${item.tipoOperacion === 'venta' ? '#a8e6cf' : '#a0c4ff'}; color: #2b2d42;">${item.tipoOperacion.toUpperCase()}</span>
          <div>
            <h6 class="text-charcoal mb-0 fw-bold">${item.marca} ${item.modelo}</h6>
            <small class="text-charcoal-soft">${item.tipoOperacion === 'alquiler' ? `Renta: ${item.duracion} ${item.modalidad} (Desde ${item.fechaInicio})` : `Adquisición Definitiva`}</small>
          </div>
        </div>
        <div class="d-flex align-items-center gap-3">
          <span class="text-charcoal fw-bold">$${item.subtotal.toLocaleString()} USD</span>
          <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>`;
  });
  updateCartTotals(subtotalGross, subtotalGross * 0.18, totalDeposit);
}

function updateCartTotals(subtotal, taxes, deposit) {
  document.getElementById('cartSubtotal').innerText = `$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})} USD`;
  document.getElementById('cartTaxes').innerText = `$${taxes.toLocaleString('en-US', {minimumFractionDigits: 2})} USD`;
  document.getElementById('cartDeposit').innerText = `$${deposit.toLocaleString('en-US', {minimumFractionDigits: 2})} USD`;
  document.getElementById('cartTotal').innerText = `$${(subtotal + taxes + deposit).toLocaleString('en-US', {minimumFractionDigits: 2})} USD`;
}

function removeFromCart(index) { cart.splice(index, 1); updateCartBadge(); renderCartItems(); }
function clearCart() { cart = []; updateCartBadge(); renderCartItems(); }

function fillDefaultVIPData() {
  document.getElementById('custName').value = "Ing. Genesis Caba ";
  document.getElementById('custDoc').value = "001-1234567-8";
  document.getElementById('custLic').value = "DO-8874125-VIP (Vigente)";
  document.getElementById('custPhone').value = "+1 (809) 555-0199";
  document.getElementById('custEmail').value = "morengeng@luxurymotors.com";
  document.getElementById('custAddress').value = "Av.27 DE FEBRERO rgb(123, 246, 255), LOS JARDINES , Santo Domingo, D.N.";
  document.getElementById('cardNum').value = "4532 8901 2345 8899";
  document.getElementById('cardExp').value = "12/28";
  document.getElementById('cardCvv').value = "789";
}

function openCheckoutModal() {
  if (cart.length === 0) {
    Swal.fire({ icon: 'warning', title: 'Carrito Vacío', text: 'Agrega al menos un producto.', background: '#fdfbf7', color: '#2b2d42' });
    return;
  }
  const cartModalInst = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  if (cartModalInst) cartModalInst.hide();

  const list = document.getElementById('checkoutItemsList');
  list.innerHTML = '';
  let subtotal = 0, deposit = 0;
  cart.forEach(item => {
    subtotal += item.subtotal; deposit += item.fianza;
    list.innerHTML += `<div class="d-flex justify-content-between mb-1"><span class="text-charcoal">${item.modelo} (${item.tipoOperacion})</span><span class="text-charcoal fw-bold">$${item.subtotal.toLocaleString()}</span></div>`;
  });
  const taxes = subtotal * 0.18;
  document.getElementById('chkSubtotal').innerText = `$${subtotal.toLocaleString()} USD`;
  document.getElementById('chkTaxes').innerText = `$${taxes.toLocaleString()} USD`;
  document.getElementById('chkDeposit').innerText = `$${deposit.toLocaleString()} USD`;
  document.getElementById('chkTotal').innerText = `$${(subtotal + taxes + deposit).toLocaleString()} USD`;
  new bootstrap.Modal(document.getElementById('checkoutModal')).show();
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function processPaymentAndGeneratePDF() {
  const modalInst = bootstrap.Modal.getInstance(document.getElementById('checkoutModal'));
  if (modalInst) modalInst.hide();
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
  document.body.classList.remove('modal-open');
  document.body.style.removeProperty('padding-right');
  document.body.style.removeProperty('overflow');

  Swal.fire({ title: 'Procesando Transacción VIP', text: 'Generando documento oficial en PDF...', allowOutsideClick: false, didOpen: () => Swal.showLoading(), background: '#fdfbf7', color: '#2b2d42' });

  const hasVenta = cart.some(i => i.tipoOperacion === 'venta');
  const hasAlquiler = cart.some(i => i.tipoOperacion === 'alquiler');
  let docTitle = "FACTURA DE VENTA Y CONTRATO DE ALQUILER";
  let filename = `factura_de_venta_y_contrato_de_alquiler_LME-${Math.floor(100000 + Math.random() * 900000)}.pdf`;

  if (hasVenta && !hasAlquiler) {
    docTitle = "FACTURA DE VENTA";
    filename = `factura_de_venta_LME-${Math.floor(100000 + Math.random() * 900000)}.pdf`;
  } else if (hasAlquiler && !hasVenta) {
    docTitle = "CONTRATO DE ALQUILER Y ACUERDO DE RESPONSABILIDAD";
    filename = `contrato_de_alquiler_y_acuerdo_de_responsabilidad_LME-${Math.floor(100000 + Math.random() * 900000)}.pdf`;
  }

  const clientName = document.getElementById('custName').value;
  const clientId = document.getElementById('custDoc').value;
  let subtotal = 0, totalDeposit = 0, rowsHtml = '';

  cart.forEach((item, index) => {
    subtotal += item.subtotal; totalDeposit += item.fianza;
    const thumbImg = (window.PDF_THUMBNAILS && window.PDF_THUMBNAILS[item.imagen]) ? window.PDF_THUMBNAILS[item.imagen] : item.imagen;
    const detailText = item.tipoOperacion === 'venta' ? 'Adquisición Vehicular Definitiva' : `Alquiler: ${item.duracion} ${item.modalidad} (Desde ${item.fechaInicio})`;

    rowsHtml += `
      <tr style="border-bottom: 1px solid #e5e5e5;">
        <td style="padding: 6px; text-align: center; font-size: 9px; color: #333333 !important;">${index + 1}</td>
        <td style="padding: 6px; text-align: center;"><img src="${thumbImg}" style="width: 55px; height: 38px; object-fit: cover; border-radius: 4px;"></td>
        <td style="padding: 6px; font-size: 9.5px; font-weight: bold; color: #111111 !important;">${escapeHtml(item.marca)} ${escapeHtml(item.modelo)}</td>
        <td style="padding: 6px; text-align: center;"><span style="font-size: 8px; font-weight: bold; padding: 2px 6px; border-radius: 3px; color: #ffffff !important; background: ${item.tipoOperacion === 'venta' ? '#2e7d32' : '#0284c7'};">${item.tipoOperacion.toUpperCase()}</span></td>
        <td style="padding: 6px; font-size: 8.5px; color: #333333 !important;">${detailText}</td>
        <td style="padding: 6px; text-align: right; font-size: 9px; color: #333333 !important;">$${item.precioUnitario.toLocaleString()}</td>
        <td style="padding: 6px; text-align: center; font-size: 9px; color: #333333 !important;">${item.duracion}</td>
        <td style="padding: 6px; text-align: right; font-size: 9px; font-weight: bold; color: #111111 !important;">$${item.subtotal.toLocaleString()}</td>
      </tr>`;
  });

  const taxes = subtotal * 0.18;
  const grandTotal = subtotal + taxes + totalDeposit;

  let clausesHtml = '';
  if (hasAlquiler) {
    clausesHtml = `
      <div style="margin-top: 15px; padding: 10px 14px; background: #fafafa !important; border: 1px solid #e5e5e5; border-radius: 6px; font-size: 9.5px; color: #333333 !important; line-height: 1.45;">
        <h5 style="margin: 0 0 6px 0; font-size: 10.5px; font-weight: bold; color: #111111 !important; text-transform: uppercase;">Acuerdo de Responsabilidad y Términos de Alquiler:</h5>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">1. Custodia del Bien:</strong> El arrendatario se compromete a operar la unidad bajo las leyes de tránsito vigentes, no exceder los límites de velocidad y mantener el vehículo en óptimas condiciones mecánicas y estéticas.</p>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">2. Cobertura & Deducible:</strong> La unidad cuenta con póliza de seguro completa con deducible del 10% en caso de colisión comprobada. Daños por negligencia, ingesta de alcohol o sustancias ilícitas son de responsabilidad exclusiva del arrendatario.</p>
        <p style="margin: 0 0 4px 0; color: #333333 !important;"><strong style="color: #111111 !important;">3. Política de Combustible:</strong> La unidad se entrega con tanque lleno y debe ser devuelta en las mismas condiciones. De lo contrario, se aplicará el cargo estándar de reposición.</p>
      </div>
      <table style="width: 100%; margin-top: 30px; font-size: 10px; text-align: center;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width: 45%; vertical-align: top;"><div style="border-top: 1px solid #333; padding-top: 6px; margin: 0 20px;"><strong style="color: #111111 !important;">LUXURY MOTORS ELITE CORP.</strong><br><span style="font-size: 9px; color: #555555 !important;">Firma Autorizada / Departamento Comercial</span></div></td>
          <td style="width: 10%;"></td>
          <td style="width: 45%; vertical-align: top;"><div style="border-top: 1px solid #333; padding-top: 6px; margin: 0 20px;"><strong style="color: #111111 !important;">${escapeHtml(clientName)}</strong><br><span style="font-size: 9px; color: #555555 !important;">Doc ID: ${escapeHtml(clientId)} (Cliente / Arrendatario)</span></div></td>
        </tr>
      </table>`;
  } else {
    clausesHtml = `
      <div style="margin-top: 20px; padding: 10px; background: #fdfdfd; border-left: 3px solid #2e7d32; font-size: 9.5px; color: #444;">
        <strong>Garantía de Satisfacción:</strong> Unidad vendida con garantía certificada de 3 años o 60,000 km, traspaso legal garantizado y asistencia vial 24/7 de cortesía durante el primer año.
      </div>`;
  }

  const logoImg = (window.PDF_THUMBNAILS && window.PDF_THUMBNAILS['assets/logo_pagina.png']) ? window.PDF_THUMBNAILS['assets/logo_pagina.png'] : 'assets/logo_pagina.png';

  const htmlStringDefinitivo = `
    <div class="pdf-doc-root" style="width: 750px; background-color: #ffffff !important; color: #333333 !important; font-family: Arial, sans-serif;">
      <div style="text-align: center; margin-bottom: 12px;">
        <img src="${logoImg}" style="height: 50px; object-fit: contain; margin-bottom: 4px;">
        <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #111111 !important; letter-spacing: 1.5px;">LUXURY MOTORS ELITE CORP.</h2>
        <p style="margin: 2px 0 8px 0; font-size: 8.5px; color: #555555 !important;">Av. Anacaona #105, Torre Empresarial Elite, Piso 14 | Tel: +1 (809) 555-ELITE | info@luxurymotors.com</p>
        <div style="display: inline-block; background: #111111 !important; color: #ffffff !important; font-size: 13px; font-weight: bold; padding: 4px 18px; border-radius: 4px; text-transform: uppercase;">${docTitle}</div>
      </div>
      <table style="width: 100%; background: #f8f9fa !important; border: 1px solid #e9ecef; border-radius: 6px; padding: 8px; margin-bottom: 12px; font-size: 9px;">
        <tr>
          <td style="width: 50%; vertical-align: top; line-height: 1.4;">
            <strong style="color: #111111 !important;">DATOS DEL CLIENTE:</strong><br>
            <strong>Nombre:</strong> ${escapeHtml(clientName)}<br>
            <strong>Cédula / Doc:</strong> ${escapeHtml(clientId)}<br>
            <strong>Teléfono:</strong> ${escapeHtml(document.getElementById('custPhone').value)}<br>
            <strong>Email:</strong> ${escapeHtml(document.getElementById('custEmail').value)}
          </td>
          <td style="width: 50%; vertical-align: top; line-height: 1.4;">
            <strong style="color: #111111 !important;">DETALLES DE LA TRANSACCIÓN:</strong><br>
            <strong>No. Documento:</strong> LME-${Math.floor(100000 + Math.random() * 900000)}<br>
            <strong>Fecha & Hora:</strong> ${new Date().toLocaleString()}<br>
            <strong>Método Pago:</strong> Tarjeta Cifrada (**** ${document.getElementById('cardNum').value.slice(-4)})<br>
            <strong>Estado:</strong> <span style="color: #2e7d32 !important; font-weight: bold;">Procesado & Confirmado</span>
          </td>
        </tr>
      </table>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
        <thead>
          <tr style="background: #111111 !important; color: #ffffff !important; font-size: 9px;">
            <th style="padding: 6px; color: #ffffff !important;">#</th><th style="padding: 6px; color: #ffffff !important;">Foto</th>
            <th style="padding: 6px; text-align: left; color: #ffffff !important;">Vehículo / Modelo</th><th style="padding: 6px; color: #ffffff !important;">Tipo</th>
            <th style="padding: 6px; text-align: left; color: #ffffff !important;">Detalle</th><th style="padding: 6px; text-align: right; color: #ffffff !important;">Precio</th>
            <th style="padding: 6px; color: #ffffff !important;">Cant.</th><th style="padding: 6px; text-align: right; color: #ffffff !important;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <table style="width: 100%; font-size: 9.5px; border-collapse: collapse;">
        <tr>
          <td style="width: 60%; vertical-align: top; font-size: 8.5px; color: #777777 !important; padding-right: 15px;">* Este documento constituye una certificación legal y comercial de los servicios y compras pactadas con Luxury Motors Elite Corp. Todo vehículo cuenta con inspección técnica certificada de 150 puntos.</td>
          <td style="width: 40%; vertical-align: top;">
            <table style="width: 100%; line-height: 1.5;">
              <tr><td style="color: #333333 !important;">Subtotal Bruto:</td><td style="text-align: right; color: #111111 !important;">$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</td></tr>
              <tr><td style="color: #333333 !important;">Impuestos (ITBIS 18%):</td><td style="text-align: right; color: #111111 !important;">$${taxes.toLocaleString('en-US', {minimumFractionDigits: 2})}</td></tr>
              ${totalDeposit > 0 ? `<tr><td style="color: #0284c7 !important; font-weight: bold;">Fianza Reembolsable:</td><td style="text-align: right; color: #0284c7 !important; font-weight: bold;">$${totalDeposit.toLocaleString('en-US', {minimumFractionDigits: 2})}</td></tr>` : ''}
              <tr style="border-top: 2px solid #111111;">
                <td style="font-size: 11px; font-weight: bold; color: #111111 !important; padding-top: 4px;">TOTAL GENERAL:</td>
                <td style="font-size: 11px; font-weight: bold; text-align: right; color: #111111 !important; padding-top: 4px;">$${grandTotal.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      ${clausesHtml}
      <div style="margin-top: 20px; border-top: 1px dashed #ccc; padding-top: 8px; text-align: center; font-size: 8.5px; color: #888888 !important;">Documento generado automáticamente por el Sistema E-Commerce & Alquiler de Vehículos Premium | Diseñado por Genesis Caba</div>
    </div>`;

  const opt = { margin: [8, 8, 8, 8], filename: filename, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, scrollY: 0, scrollX: 0, useCORS: true, logging: false }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };

  setTimeout(() => {
    html2pdf().set(opt).from(htmlStringDefinitivo).save().then(() => {
      Swal.close();
      Swal.fire({ icon: 'success', title: 'Transacción Exitosa', text: `Se ha descargado el documento: ${filename}`, background: '#fdfbf7', color: '#2b2d42', confirmButtonColor: '#a8e6cf' });
      clearCart();
    }).catch(() => {
      Swal.fire({ icon: 'error', title: 'Error de PDF', text: 'Fallo al renderizar el archivo.', background: '#fdfbf7', color: '#2b2d42' });
    });
  }, 350);
}