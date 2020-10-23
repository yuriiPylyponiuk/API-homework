// 1 Створити сайт використовуючи swapi.dev. вибрати 1 з 6 
// проперті (films, characters etc..)і зробити запит по них,
// вибрати одну з перших проперті що отримаєте і витягнувши з неї 
// "url" - отримати конкретну(планету,фільм, персонажа) з всією інформацією 
// про нього. Додати кнопку при натисканні на яку вивести всю наявну інформацію 
// на екран красиво структуровано. 




let node = null;
let initialUrl = "https://swapi.dev/api/";
let wrapper = document.querySelector(".block-create");
let btnCriateList = document.querySelector('.btn');


window.onload = function () {
	node = fetch(initialUrl)
		.then(response => response.json())
		.then(result => node = result)
		.then(function() {
			node = fetch(node.films)
				.then(response => response.json())
				.then(result => node = result)
			});

	
};  



btnCriateList.addEventListener('click', showList);

function showList(e) {
	e.preventDefault();

	let a = document.querySelector('.block-create');
	let createOl1 = document.createElement('ol');
	btnCriateList.classList.toggle('show');
	if (a.childNodes.length >= 1) {
		return
	}else{
		for (let i = 0; i < node.results.length; i++) {
			let element = node.results[i];
			
			let createLi1 = document.createElement('li');
			let createOl2 = document.createElement('ol');
			let crateImg = document.createElement('img');
	
			for(let key in element) {
				let createLi2 = document.createElement('li');
				let createp = document.createElement('p');
				let createh3 = document.createElement('h3');
	
				if (Array.isArray(element[key])) {
					let createBtnForMore = document.createElement('button');
	
					createBtnForMore.addEventListener('click', showAll);
	
					createBtnForMore.textContent = 'Learn More'
					createp.textContent = `${key}: `;
					createLi2.appendChild(createp);
					createLi2.appendChild(createBtnForMore) ;
				}else{
					createp.textContent = `${key}: `;
					createh3.textContent = element[key];
					createLi2.appendChild(createp);
					createLi2.appendChild(createh3);
				}
	
				
				createOl2.appendChild(createLi2);
			}
	
			switch (element.episode_id) {
				case 4:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/StarWarsMoviePoster1977.jpg/220px-StarWarsMoviePoster1977.jpg'
					break;
				case 5:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/SW_-_Empire_Strikes_Back.jpg/220px-SW_-_Empire_Strikes_Back.jpg'
					break;
				case 6:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/ReturnOfTheJediPoster1983.jpg/220px-ReturnOfTheJediPoster1983.jpg'
					break;
				case 1:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/40/Star_Wars_Phantom_Menace_poster.jpg/220px-Star_Wars_Phantom_Menace_poster.jpg'
					break;
				case 2:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg/220px-Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg'
					break;
				case 3:
					crateImg.src = 'https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg/220px-Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg'
					break;
			}
	
			createLi1.appendChild(crateImg);
			createLi1.appendChild(createOl2);
			createOl1.appendChild(createLi1);
		}
		wrapper.appendChild(createOl1);

	}


}
function showAll(e) {
	let userClick = e.target;
	let curentValue = userClick.previousSibling;

	console.log(userClick);
	console.log(curentValue);
	//node.results[1].characters
}





// 2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута
// робити пошук за конкретним параметром і виводити дані на сторінку. 
// (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести 
// список по філду).

let btnSearch = document.querySelector('.search-bock a');
let inputSearch = document.querySelector('.search-bock input');
let createSearchList = document.querySelector('.create-search-list');
let userStr;
let search = null;

inputSearch.addEventListener('change', createNewQuery);
btnSearch.addEventListener('click', createSerchBlock)
function createNewQuery() {

	userStr = inputSearch.value;

	let newUrl = "https://swapi.dev/api/people/?search=" + userStr;

	search = fetch(newUrl)
		.then(response => response.json())
		.then(result => search = result)
}


//Тут приходиься около 5 секунд чекати
function createSerchBlock() {
	
	if (search === null){
		createNewQuery();
		setTimeout(createSerchBlock, 5000);
	}else{
		
		let a = document.querySelector('.create-search-list');
		let serchOl = document.createElement('ol');
		let arr = search.results;
		
		btnSearch.classList.toggle('showList');
		a.innerHTML = '';
		
		for (let i = 0; i < arr.length; i++) {
			let serchLi = document.createElement('li');
			serchLi.textContent = `${arr[i].name}`;
			serchOl.appendChild(serchLi);
		}
		createSearchList.appendChild(serchOl);
	}

}







