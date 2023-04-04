const gallary = new Swiper('.gallary', {

	direction: 'horizontal',
	loop: true, 
	freeMode: true,
	slidesPerView: 6,

	navigation: {
			nextEl: '.btn-next',
			prevEl: '.btn-prev',
	},

});