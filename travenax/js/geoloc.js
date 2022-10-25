//TODO рабочая геолокация через БигДатаКлауд 
window.onload = findMyState = () =>{
	const status = document.querySelector('.weather_link') 
	const statusMobile = document.querySelector('.status-Mobile')

	const success = (position) => {

		const latitude = position.coords.latitude; //*широта
		const longitude = position.coords.longitude; //*долгота
		// console.log(latitude + ' ' + longitude)
		

	 

		const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`



		fetch(geoApiUrl)
		.then(response => response.json())
		.then(data =>{
			status.textContent = data.city
			statusMobile.textContent = data.city
		})

	}

	const error = () => {
		status.textContent = 'error'
	}



	navigator.geolocation.getCurrentPosition(success, error);
}



// document.querySelector(('.find-state')).addEventListener('click', findMyState);



// let weather = {
// 	'apiKKey': '5eabc76aa37d8a0ebe626baaa0c32255'
// }