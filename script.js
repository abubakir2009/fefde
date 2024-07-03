document.addEventListener('DOMContentLoaded', () => {
	const products = [
		{ name: 'Hamburger', price: '$3.50', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Cheeseburger', price: '$4.00', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Veggie Burger', price: '$3.00', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Chicken Burger', price: '$3.75', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Fish Burger', price: '$4.25', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Bacon Burger', price: '$4.50', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Double Burger', price: '$5.00', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Spicy Burger', price: '$3.80', imgSrc: './img/Ellipse 2.png' },
		{ name: 'BBQ Burger', price: '$4.20', imgSrc: './img/Ellipse 2.png' },
		{ name: 'Mushroom Burger', price: '$3.90', imgSrc: './img/Ellipse 2.png' }
	];

	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	const mainFood = document.querySelector('.main__food');
	const cartItems = document.getElementById('cartItems');
	const cartModal = document.getElementById('cartModal');
	const closeModal = document.querySelector('.close');
	const cartIcon = document.querySelector('.main__card');
	const emptyCartMessage = document.getElementById('emptyCartMessage');
	const searchInput = document.getElementById('searchInput');

	function renderProducts(products) {
		mainFood.innerHTML = ''; // Clear previous content

		products.forEach(product => {
			const blog = document.createElement('div');
			blog.className = 'main__food-blog';

			const img = document.createElement('img');
			img.src = product.imgSrc;
			img.alt = product.name;

			const h2 = document.createElement('h2');
			h2.textContent = product.name;

			const p = document.createElement('p');
			p.textContent = product.price;

			const button = document.createElement('button');
			button.className = 'add-to-cart';
			button.innerHTML = cart.find(item => item.name === product.name) ? '<i class="fa-solid fa-minus"></i>' : '<i class="fa-solid fa-plus"></i>';

			button.addEventListener('click', () => {
				toggleCart(product, button);
			});

			blog.appendChild(img);
			blog.appendChild(h2);
			blog.appendChild(p);
			blog.appendChild(button);

			mainFood.appendChild(blog);
		});
	}

	function toggleCart(product, button) {
		const index = cart.findIndex(item => item.name === product.name);

		if (index !== -1) {
			cart.splice(index, 1);
			button.innerHTML = '<i class="fa-solid fa-plus"></i>';
		} else {
			cart.push(product);
			button.innerHTML = '<i class="fa-solid fa-minus"></i>';
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	}

	function updateCart() {
		cartItems.innerHTML = '';
		if (cart.length === 0) {
			emptyCartMessage.style.display = 'block';
		} else {
			emptyCartMessage.style.display = 'none';
			cart.forEach((item, index) => {
				const li = document.createElement('li');

				const img = document.createElement('img');
				img.src = item.imgSrc;
				img.alt = item.name;

				const text = document.createElement('span');
				text.textContent = `${item.name}  ${item.price}`;

				const button = document.createElement('button');
				button.className = 'remove-from-cart';
				button.innerHTML = '<i class="fa-solid fa-minus"></i>';
				button.addEventListener('click', () => {
					removeFromCart(item, button, index);
				});

				li.appendChild(img);
				li.appendChild(text);
				li.appendChild(button);
				cartItems.appendChild(li);
			});
		}
	}

	function removeFromCart(product, button, index) {
		cart.splice(index, 1);
		const mainFoodButtons = document.querySelectorAll('.main__food-blog .add-to-cart');
		mainFoodButtons.forEach(btn => {
			if (btn.parentElement.querySelector('h2').textContent === product.name) {
				btn.innerHTML = '<i class="fa-solid fa-plus"></i>';
			}
		});

		localStorage.setItem('cart', JSON.stringify(cart));
		updateCart();
	}

	cartIcon.addEventListener('click', () => {
		cartModal.style.display = 'block';
	});

	closeModal.addEventListener('click', () => {
		cartModal.style.display = 'none';
	});

	window.onclick = event => {
		if (event.target === cartModal) {
			cartModal.style.display = 'none';
		}
	};

	renderProducts(products);
	updateCart();

	searchInput.addEventListener('input', function () {
		const searchText = this.value.trim().toLowerCase();

		const filteredProducts = products.filter(product =>
			product.name.toLowerCase().includes(searchText)
		);

		renderProducts(filteredProducts);

		if (filteredProducts.length === 0) {
			mainFood.innerHTML = '<p class="empty-cart-message">No products found.</p>';
		}
	});
});

const listItems = document.querySelectorAll('.navsidebar > ul > li');

listItems.forEach(item => {
	item.addEventListener('click', function () {
		listItems.forEach(li => li.classList.remove('active'));
		this.classList.add('active');
	});
});