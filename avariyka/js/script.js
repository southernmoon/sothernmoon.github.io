document.addEventListener('DOMContentLoaded', function() {
	setTimeout(initYandexMap, 5000);
});

document.addEventListener('scroll', initYandexMapOnEvent);
document.addEventListener('mousemove', initYandexMapOnEvent);
document.addEventListener('touchstart', initYandexMapOnEvent);

function initYandexMapOnEvent (e) {
	initYandexMap();
	e.currentTarget.removeEventListener(e.type, initYandexMapOnEvent);
}

function initYandexMap () {
	if (window.yandexMapDidInit) {
			return false;
	}
	window.yandexMapDidInit = true;

	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.async = true;

	script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A4921396d7a29142b67b71e718e995ca3f144d8fa0fca9c5dd0e047b0420d87f8&amp;width=100%&amp;height=100%&amp;lang=ru_RU&amp;scroll=true';

	document.getElementById("map_container").appendChild(script);
}

//!POP-UP////////////////


let popup1 = document.querySelector('.popup1'); 
let popup2 = document.querySelector('.popup2'); 
let popup3 = document.querySelector('.popup3'); 
let popup4 = document.querySelector('.popup4'); 
let openPopupButtons1 = document.querySelectorAll('.open-popup1'); 
let openPopupButtons2 = document.querySelectorAll('.open-popup2'); 
let openPopupButtons3 = document.querySelectorAll('.open-popup3'); 
let openPopupButtons4 = document.querySelectorAll('.open-popup4'); 

if (document.documentElement.clientWidth > 1023) {
	openPopupButtons1.forEach(function(button)  { 
		button.addEventListener('mouseenter', (e) => { 
				e.preventDefault(); 
				popup1.classList.add('active'); 
		})
	});
	
	openPopupButtons1.forEach(function(button)  { 
		button.addEventListener('mouseleave', (e) => { 
				e.preventDefault(); 
				popup1.classList.remove('active'); 
		})
	});
	
	openPopupButtons2.forEach(function(button)  { 
		button.addEventListener('mouseenter', (e) => { 
				e.preventDefault(); 
				popup2.classList.add('active'); 
		})
	});
	
	openPopupButtons2.forEach(function(button)  { 
		button.addEventListener('mouseleave', (e) => { 
				e.preventDefault(); 
				popup2.classList.remove('active'); 
		})
	});

	openPopupButtons3.forEach(function(button)  { 
		button.addEventListener('mouseenter', (e) => { 
				e.preventDefault(); 
				popup3.classList.add('active'); 
		})
	});
	
	openPopupButtons3.forEach(function(button)  { 
		button.addEventListener('mouseleave', (e) => { 
				e.preventDefault(); 
				popup3.classList.remove('active'); 
		})
	});

	openPopupButtons4.forEach(function(button)  { 
		button.addEventListener('mouseenter', (e) => { 
				e.preventDefault(); 
				popup4.classList.add('active'); 
		})
	});
	
	openPopupButtons4.forEach(function(button)  { 
		button.addEventListener('mouseleave', (e) => { 
				e.preventDefault(); 
				popup4.classList.remove('active'); 
		})
	});
}







