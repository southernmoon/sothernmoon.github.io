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