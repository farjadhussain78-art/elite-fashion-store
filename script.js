const productsCatalog = [
	{
		id: 1,
		name: 'Designer Gold Chain Handbag',
		category: 'Handbags',
		image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
		oldPrice: 8000,
		newPrice: 5000
	},
	{
		id: 2,
		name: 'Aviator Premium Sunglasses',
		category: 'Sunglasses',
		image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
		oldPrice: 8000,
		newPrice: 5000
	},
	{
		id: 3,
		name: 'Minimalist Leather Strap Watch',
		category: 'Watches',
		image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
		oldPrice: 8000,
		newPrice: 5000
	},
	{
		id: 4,
		name: 'Oud Royale Signature Perfume',
		category: 'Perfumes',
		image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
		oldPrice: 8000,
		newPrice: 5000
	},
	{
		id: 5,
		name: 'Quilted Velvet Evening Clutch',
		category: 'Handbags',
		image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85',
		oldPrice: 12000,
		newPrice: 7500
	},
	{
		id: 6,
		name: 'Retro Square Tortoise Sunglasses',
		category: 'Sunglasses',
		image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
		oldPrice: 6500,
		newPrice: 3900
	},
	{
		id: 7,
		name: 'Chronograph Rose Gold Watch',
		category: 'Watches',
		image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
		oldPrice: 18000,
		newPrice: 11500
	},
	{
		id: 8,
		name: 'Midnight Suede Luxury Cologne',
		category: 'Perfumes',
		image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
		oldPrice: 9500,
		newPrice: 5800
	},
	{
		id: 9,
		name: 'Luxury Diamond Pendant Set',
		category: 'Handbags',
		image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85',
		oldPrice: '15,000',
		newPrice: '9,500'
	}
];

const productsGrid = document.querySelector('#productsGrid');

function displayProducts(itemsToRender) {
	if (!productsGrid) return;

	productsGrid.innerHTML = itemsToRender.map((product) => `
		<article class="product-card">
			<div class="prod-img-box">
				<img src="${product.image}" alt="${product.name}">
				<span class="badge-sale">SALE</span>
				<button class="btn-add-cart" type="button"><i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> Add to cart</button>
			</div>
			<div class="prod-info">
				<a class="prod-title" href="#product-${product.id}">${product.name}</a>
				<span class="prod-cat">${product.category}</span>
				<div class="prod-price"><span class="old-price">${formatCurrency(product.oldPrice)}</span><span class="new-price">${formatCurrency(product.newPrice)}</span></div>
			</div>
		</article>`).join('');

	bindAddToCartListeners();
}

document.addEventListener('DOMContentLoaded', () => displayProducts(productsCatalog));

const sliderTrack = document.querySelector('.slider-track');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
const slides = document.querySelectorAll('.slide');
const productsSection = document.querySelector('#products');
const categoryLinks = document.querySelectorAll('.nav-menu a, .category-card');

function filterProducts(category) {
	const selectedCategory = category.trim().toLowerCase();
	const productsToRender = selectedCategory === 'all'
		? productsCatalog
		: productsCatalog.filter((product) => product.category.toLowerCase() === selectedCategory);

	displayProducts(productsToRender);

	productsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

categoryLinks.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.preventDefault();
		filterProducts(link.dataset.category || 'All');
	});
});

let currentSlide = 0;
const maxSlide = slides.length - 1;

function updateSlider() {
	if (!sliderTrack) return;
	sliderTrack.style.transform = `translateX(-${50 * currentSlide}%)`;
}

if (prevArrow && nextArrow && slides.length) {
	nextArrow.addEventListener('click', () => {
		currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
		updateSlider();
	});

	prevArrow.addEventListener('click', () => {
		currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
		updateSlider();
	});

	setInterval(() => {
		currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
		updateSlider();
	}, 5000);
}

const cartButton = document.querySelector('.cart-btn');
const closeCartButton = document.querySelector('.btn-close-cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartBadge = document.querySelector('.cart-badge');
const cartBody = document.querySelector('.cart-body');
const cartTotalValue = document.querySelector('.cart-total-value');

let cartItems = [];

function toggleCart(isOpen) {
	cartOverlay?.classList.toggle('active', isOpen);
	cartSidebar?.classList.toggle('active', isOpen);
	cartOverlay?.setAttribute('aria-hidden', String(!isOpen));
}

cartButton?.addEventListener('click', (event) => {
	event.preventDefault();
	toggleCart(true);
});

closeCartButton?.addEventListener('click', () => toggleCart(false));
cartOverlay?.addEventListener('click', () => toggleCart(false));

function pushToCart(name, price, img) {
	const existingItem = cartItems.find((item) => item.name === name);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cartItems.push({ name, price, img, quantity: 1 });
	}
}

function formatCurrency(value) {
	return `₨ ${value.toLocaleString('en-PK')}`;
}

function renderCartUI() {
	if (!cartBody || !cartBadge || !cartTotalValue) return;

	const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
	const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

	cartBody.innerHTML = '';
	cartBadge.textContent = itemCount;
	cartTotalValue.textContent = formatCurrency(cartTotal);

	if (!cartItems.length) {
		cartBody.innerHTML = '<div class="cart-empty-msg"><p>Your cart is currently empty.</p><span>Rs. 0</span></div>';
		return;
	}

	cartItems.forEach((item) => {
		const row = document.createElement('div');
		row.className = 'cart-item';
		row.innerHTML = `
			<img src="${item.img}" alt="${item.name}">
			<div class="cart-item-details">
				<strong class="cart-item-title">${item.name}</strong>
				<span class="cart-item-price">${formatCurrency(item.price * item.quantity)}</span>
				<div class="cart-qty-controls">
					<button class="btn-qty-minus" data-name="${item.name}" type="button" aria-label="Decrease ${item.name} quantity">-</button>
					<span class="cart-qty-val">${item.quantity}</span>
					<button class="btn-qty-plus" data-name="${item.name}" type="button" aria-label="Increase ${item.name} quantity">+</button>
				</div>
			</div>
			<button class="btn-delete-item" data-name="${item.name}" type="button" aria-label="Remove ${item.name} from cart"><i class="fas fa-trash" aria-hidden="true"></i></button>`;
		cartBody.appendChild(row);
	});

	toggleCart(true);
}

document.addEventListener('click', (event) => {
	const button = event.target.closest('.btn-qty-plus, .btn-qty-minus, .btn-delete-item');
	if (!button) return;

	const itemIndex = cartItems.findIndex((item) => item.name === button.dataset.name);
	if (itemIndex === -1) return;

	if (button.classList.contains('btn-qty-plus')) {
		cartItems[itemIndex].quantity += 1;
	} else if (button.classList.contains('btn-qty-minus')) {
		if (cartItems[itemIndex].quantity > 1) {
			cartItems[itemIndex].quantity -= 1;
		} else {
			cartItems.splice(itemIndex, 1);
		}
	} else {
		cartItems.splice(itemIndex, 1);
	}

	renderCartUI();
});

function bindAddToCartListeners() {
	document.querySelectorAll('.btn-add-cart').forEach((button) => {
		button.addEventListener('click', () => {
			const productCard = button.closest('.product-card');
			const name = productCard?.querySelector('.prod-title')?.textContent.trim();
			const priceText = productCard?.querySelector('.new-price')?.textContent || '';
			const img = productCard?.querySelector('.prod-img-box img')?.src;
			const price = Number(priceText.replace(/[^0-9.]/g, ''));

			if (!name || !img || !Number.isFinite(price)) return;
			pushToCart(name, price, img);
			renderCartUI();
		});
	});
}

const checkoutButton = document.querySelector('.btn-checkout');
const checkoutModal = document.querySelector('.checkout-modal');
const closeCheckoutButton = document.querySelector('.btn-close-checkout');
const codForm = document.querySelector('#codForm');

function toggleCheckout(isOpen) {
	checkoutModal?.classList.toggle('active', isOpen);
	checkoutModal?.setAttribute('aria-hidden', String(!isOpen));
}

checkoutButton?.addEventListener('click', (event) => {
	event.preventDefault();
	toggleCart(false);
	toggleCheckout(true);
});

closeCheckoutButton?.addEventListener('click', () => toggleCheckout(false));

codForm?.addEventListener('submit', (event) => {
	event.preventDefault();

	const name = codForm.querySelector('[name="fullName"]')?.value.trim() || '';
	const city = codForm.querySelector('[name="city"]')?.value || '';

	alert(`Thank you, ${name}! Your order has been placed successfully under Cash on Delivery. It will be shipped to ${city} soon!`);
	cartItems = [];
	renderCartUI();
	codForm.reset();
	toggleCheckout(false);
});
