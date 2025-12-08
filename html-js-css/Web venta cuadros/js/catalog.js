const rawData = [
    { id: 1, name: "Astronauta", price: 50.00, description: "Cuadro de Astronauta navegando entre espacio tiempo.", category: "oleo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY72BfRusnrFGPgbh15VORPudZbH_w0Z3rng&s" },
    { id: 2, name: "Piramide Azteca", price: 100.00, description: "Cuadro oleo pintura original de piramide Azteca.", category: "oleo", img: "https://http2.mlstatic.com/D_NQ_NP_936097-MLM52878678242_122022-O.webp" },
    { id: 3, name: "Luchadores", price: 30.00, description: "El Santo contra Blue Demon.", category: "acuarela", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQETHCeweIT6OvTxdSMloLRycbfDh-NkCrUeA&s" },
    { id: 4, name: "Paisaje", price: 80.00, description: "Cuadro oleo pintura original basado en paisaje.", category: "mix", img: "https://i.etsystatic.com/21187145/r/il/679224/3119116954/il_570xN.3119116954_rz3c.jpg" },
    { id: 5, name: "Meditación", price: 25.00, description: "Arte basado en hombre meditando.", category: "figura", img: "https://images.joseartgallery.com/23242/conversions/landscape-painting-sunset-meditation-abstract-more-photo-thumb900.jpg" },
    { id: 6, name: "Ibiza", price: 45.00, description: "Retrato de paisaje de la isla de Ibiza, España.", category: "oleo", img: "https://www.rubendeluis.com/wp-content/uploads/2019/02/Cuadro-al-oleo-de-Ibiza-desde-el-puerto.jpg" },
    { id: 7, name: "Full Metal Alchemist", price: 55.00, description: "Cuadro oleo basado en el anime Full Metal Alchemist.", category: "oleo", img: "https://pm1.aminoapps.com/6525/6a23ea5e78d257a8333348f4964f261489c8f033_hq.jpg" },
    { id: 8, name: "The Mistfits", price: 80.00, description: "Basado en el arte de la banda de Punk The Mistfits.", category: "oleo", img: "https://m.media-amazon.com/images/I/71+QtPzfQHL._AC_UF894,1000_QL80_.jpg" },
    { id: 9, name: "Iron Maiden", price: 80.00, description: "Basado en el arte de la banda de Power Metal Iron Maiden.", category: "oleo", img: "https://http2.mlstatic.com/D_NQ_NP_719939-MLM74865170836_032024-O.webp" },
    { id: 10, name: "SteamPunk", price: 150.00, description: "Cuadro oleo pintura original basado en arte SteamPunk.", category: "oleo", img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQ-LTWscYJSBSJjRNQzQrJ7dKXT-B0j7gTV339NTv0jCMxYHs7-D7155Ov1saju5FWZPnXnNqQ8ZQdh0ILylk1IlEeKjLwN1gHYBJXAykoE0oSbOlg-gvAvMJO6YY4mC-Mc4dJYArqRiU/s1600/01-High+Society+News,+oil,40x55cm.jpg" }

];

// buscar products por ID productMap.get(id)
const productMap = new Map(rawData.map(p => [p.id, p]));


// MAP: Para el carrito. Clave: ID Producto, Valor: Cantidad.
const cart = new Map();

// SET: Para favoritos.
const wishlist = new Set();

const createNotifier = () => {
    const toastEl = document.getElementById('toast');
    let timeoutId;

    return (message) => {
        toastEl.textContent = message;
        toastEl.classList.add('toast--visible');

        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            toastEl.classList.remove('toast--visible');
        }, 3000);
    };
};

const notify = createNotifier(); // Instancia del closure


// Simulamos una petición a una API que tarda 1.0 segundos.

const fetchProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulamos éxito
            resolve(rawData);
            // Si quisieramos simular error: reject("Error de servidor");
        }, 1000);
    });
};

/**
 * Función principal de inicialización
 * Usa async/await para esperar a los datos "del servidor".
 */
async function initApp() {
    try {

        const products = await fetchProducts();

        // Ocultar loader
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('catalog_art').classList.remove('hidden');

        // Render inicial
        renderCatalog(products);
        setupFilters(products);

        // botón de finalizar compra
        document.getElementById('btn-checkout').addEventListener('click', checkout);

    } catch (error) {
        console.error("Error cargando productos:", error);
        document.getElementById('loader').textContent = "Error cargando el catálogo.";
    }
}

// Renderiza el catálogo usando .map() para transformar datos en HTML.

const renderCatalog = (productsList) => {
    const container = document.getElementById('catalog_art');

    // Uso de .map() para generar un array de strings HTML

    const cardsHtml = productsList.map(product => {
        const isFav = wishlist.has(product.id);
        return `
                    <article class="product">
                        <button class="product_fav-btn ${isFav ? 'product_fav-btn--active' : ''}" 
                                onclick="toggleWishlist(${product.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                        <img src="${product.img}" alt="${product.name}" class="product_img">
                        <div class="product_content">
                            <h3 class="product_title">${product.name}</h3>
                            <div class="product_price">$${product.price.toFixed(2)}</div>
                            <h4 class="product_description">${product.description}</h4>
                            <!-- Tema 3: Callbacks en eventos onclick -->
                            <button class="product_btn--primario product_btn" onclick="addToCart(${product.id})">
                                Añadir al Carrito
                            </button>
                            <button class="product_btn--secundario product_btn" onclick="openProductModal(${product.id})">
                                Detalles
                            </button>
                        </div>
                    </article>
    
                `;
    }).join(''); // Unimos el array en un solo string

    container.innerHTML = cardsHtml;
};

// Configuración de Filtros

const setupFilters = (allProducts) => {
    const buttons = document.querySelectorAll('.filter_btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Gestión de clases visuales
            buttons.forEach(b => b.classList.remove('filter_btn--active'));
            e.target.classList.add('filter_btn--active');

            const category = e.target.dataset.cat;
            console.log("category selected: " + category);

            // Uso de .filter()

            const filtered = category === 'all'
                ? allProducts
                : allProducts.filter(p => p.category === category);

            renderCatalog(filtered);
        });
    });
};


/**
* Lógica del Carrito (Uso de MAP)
*/
const addToCart = (id) => {
    // Map.get() y Map.set()
    if (cart.has(id)) {
        cart.set(id, cart.get(id) + 1);
    } else {
        cart.set(id, 1);
    }
    updateCartUI();
    notify("Producto añadido al carrito");
};

const removeFromCart = (id) => {
    cart.delete(id); // Map.delete()
    updateCartUI();
};

// Función para finalizar la compra
const checkout = () => {
    if (cart.size === 0) {
        notify("¡Tu carrito está vacío!");
        return;
    }

    // Simulación de proceso de compra
    notify("¡Gracias por tu pedido! La compra ha sido finalizada con éxito.");

    // Vaciar el carrito (Map.clear())
    cart.clear();

    // Actualizar la interfaz (carrito vacío y cerrar modal)
    updateCartUI();
    toggleCart();
};


const updateCartUI = () => {
    const container = document.getElementById('cart-items-container');
    const badge = document.getElementById('badge-cart');
    const totalEl = document.getElementById('cart-total-price');

    // Calcular cantidad total de items (Iteración sobre Map)
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.size === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center; margin-top: 50px;">El carrito está vacío</p>';
        badge.classList.add('hidden');
    } else {
        let html = '';
        // Iteramos sobre las entradas del Map [id, cantidad]
        for (const [id, qty] of cart) {
            //  .find() para buscar el objeto completo en el array original
            const product = rawData.find(p => p.id === id);
            totalItems += qty;
            totalPrice += (product.price * qty);

            html += `
                        <div class="cart-item">
                            <div>
                                <strong>${product.name}</strong><br>
                                <small>${qty} x $${product.price.toFixed(2)}</small>
                            </div>
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span style="font-weight:bold;">$${(product.price * qty).toFixed(2)}</span>
                                <button onclick="removeFromCart(${id})" style="color:red; border:none; background:none; cursor:pointer;">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
        }
        container.innerHTML = html;
        badge.textContent = totalItems;
        badge.classList.remove('hidden');
    }

    totalEl.textContent = '$' + totalPrice.toFixed(2);
};

/**
 * Lógica de Favoritos (Uso de SET)
 */
const toggleWishlist = (id) => {
    // Set.has(), Set.add(), Set.delete()
    if (wishlist.has(id)) {
        wishlist.delete(id);
        notify("Eliminado de favoritos");
    } else {
        wishlist.add(id);
        notify("Añadido a favoritos");
    }

    // Actualizar UI Badge
    const badge = document.getElementById('badge-fav');
    badge.textContent = wishlist.size; // Tema 2: Set.size
    if (wishlist.size > 0) badge.classList.remove('hidden');
    else badge.classList.add('hidden');

    // Re-renderizar para actualizar el icono del corazón
    // NOTA: En una app real, haríamos update selectivo del DOM, no un re-render total.
    // Para simplificar el ejemplo y reusar la función renderCatalog, lo hacemos así.
    // Necesitamos saber qué filtro está activo para no perder la vista actual.
    const activeBtn = document.querySelector('.filter_btn--active');
    const category = activeBtn.dataset.cat;
    const filtered = category === 'all' ? rawData : rawData.filter(p => p.category === category);
    renderCatalog(filtered);
};

// UI Helpers
const toggleCart = () => {
    document.getElementById('cart_modal').classList.toggle('cart_modal--open');
};

document.getElementById('btn-cart').addEventListener('click', toggleCart);

document.getElementById('menu-toggle').addEventListener('click', () => {
    const filters = document.getElementById('filters-menu');
    filters.classList.toggle('show');
});

function openProductModal(productId) {
    const product = productMap.get(productId);
    console.log("id art selected" + product);

    if (!product) return;

    const modal = document.getElementById('product_modal');
    const content = document.getElementById('modal_product_data');

    content.innerHTML = `
    <div style="text-align: center;">
      <img src="${product.img.trim()}" alt="${product.name}" 
           style="width: 100%; max-height: 300px; object-fit: contain; border-radius: 8px; margin-bottom: 16px;">
      <h2 style="margin: 10px 0;">${product.name}</h2>
      <p style="font-size: 1.3rem; color: var(--color-primary); font-weight: bold;">
        $${product.price.toFixed(2)}
      </p>
      <p style="color: #555; margin: 12px 0;">${product.description}</p>
      
      <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 12px;">
        <button class="product_btn--primario product_btn" style="padding: 12px;" 
                onclick="addToCart(${product.id}); closeProductModal();">
          Añadir al carrito
        </button>
        <button class="product_btn--secundario product_btn" style="padding: 12px;" 
                onclick="checkout(); closeProductModal();">
          Comprar ahora
        </button>
      </div>
    </div>
  `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

}

function closeProductModal() {
    document.getElementById('product_modal').classList.add('hidden');
    document.body.style.overflow = '';
}

// Arranque de la aplicación
initApp();