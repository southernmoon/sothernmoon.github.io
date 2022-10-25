const swiper = new Swiper('.swiper', {
  // Optional parameters
	
  direction: 'vertical',  
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
		draggable: true,
		dragSize: 76
  },
	mousewheel: {
		sensitivity: 1,
		eventsTarget: ".swiper"
	},
	slidesPerView: 3,
	spaceBetween: 40,	
});

