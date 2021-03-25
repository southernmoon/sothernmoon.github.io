const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

const getGoods = async function(){
	const result = await fetch ('db/db.json');
	if (!result.ok){
		throw 'oya oya ' + result.status
	}
	return await result.json();
};

//cart

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');	
const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');

const openModal = function(){
	modalCart.classList.add('show');
	cart.renderCart();
};

const closeModal = function (){
	modalCart.classList.remove('show');
};

buttonCart.addEventListener('click', openModal);

modalClose.addEventListener('click',closeModal);

//smooth scroll

{
	const scrollLinks = document.querySelectorAll('a.scroll-link');

for (let i = 0; i < scrollLinks.length; i++){
	scrollLinks[i].addEventListener('click', function(event){
		event.preventDefault();
		const id =scrollLinks[i].getAttribute('href');
		document.querySelector(id).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
		
	});
}
}


//goods




getGoods().then(function(data) {} );


const createCard = function(objCart) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6'

	card.innerHTML = `
	<div class="goods-card">
	${objCart.label ? `<span class="label">${objCart.label}</span>` : 
	''}
	
	<img src="db/${objCart.img}" alt="${objCart.name}" class="goods-image">
	<h3 class="goods-title">${objCart.name}</h3>

	<p class="goods-description">${objCart.description}</p>

	<button class="button goods-card-btn add-to-cart" data-id="${objCart.id}">
		<span class="button-price">$${objCart.price}</span>
	</button>
	</div>`;

	return card;
}

const renderCards = function (data){
	longGoodsList.textContent = '';
	const cards = data.map(createCard)
	cards.forEach(function(card){
		longGoodsList.append(card)
	})
	document.body.classList.add('show-goods');
	
};

more.addEventListener('click', function(event){
	event.preventDefault();
	getGoods().then(renderCards);
});

//filter

const filterCards = function(field, value){
	getGoods().then(function(data){
		const filteredGoods = data.filter(function(good){
			return good[field] === value 
		});
		return filteredGoods;
	})

	.then(renderCards);
};

navigationLink.forEach(function (link){
	link.addEventListener('click', function(event){
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	});
});

const cartTableGoods = document.querySelector('.cart-table__goods');
const cartTableTotal = document.querySelector('.card-table__total');

const cart = {
	cartGoods: [],
	renderCart(){
		cartTableGoods.textContent = '';
		this.cartGoods.forEach( ({id, name, price, count}) =>{
			const trGoods = document.createElement('tr');
			trGoods.className = 'cart-item';
			trGoods.dataset.id = id;

			trGoods.innerHTML = `
			<td>${name}</td>
			<td>${price}</td>
			<td><button class="cart-btn-minus">-</button></td>
			<td>${count}</td>
			<td><button class="cart-btn-plus">+</button></td>
			<td>${price * count}</td>
			<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGoods);
		});

		const totalPrice = this.cartGoods.reduce((sum, item) =>{
			return sum + item.price * item.count;
		}, 0);

		cartTableTotal.textContent = totalPrice + '$';

	},
	deleteGood(id){
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.renderCart();
	},
	minusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id){
				if (item.count <= 1){
					this.deleteGood(id)
				} else {
					item.count--;
				}
				break;
			}
		}
		this.renderCart();
	},

	plusGood(id){
		for (const item of this.cartGoods) {
			if (item.id === id){
				item.count++;
				break;
			}
		}
		this.renderCart();
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if (goodItem){
			this.plusGood(id);
		} else {
			getGoods()
			.then(data => data.find(item => item.id === id))
			.then(({id, name, price}) => {
				this.cartGoods.push({
					id, name, price, count: 1
				});
			});
		}
	},
}

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');
	
	if (addToCart){
		cart.addCartGoods(addToCart.dataset.id);
	}
})


cartTableGoods.addEventListener('click', event => {
	const target = event.target;
	if (target.classList.contains('cart-btn-delete')){
		const parent = target.closest('.cart-item');
		cart.deleteGood(parent.dataset.id);
	};
	if (target.classList.contains('cart-btn-minus')){
		const parent = target.closest('.cart-item');
		cart.minusGood(parent.dataset.id);
	};

	if (target.classList.contains('cart-btn-plus')){
		const parent = target.closest('.cart-item');
		cart.plusGood(parent.dataset.id);
	};
});