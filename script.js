let state = {
	pageAddress: null,
	pageNumber: 1,
	pagesSize: 10,
	totalItems: null,
	pages: [],
};

const defaultAPI = 'https://jsonplaceholder.typicode.com/';
const wrapper = document.querySelector('.wrapper');
const menu = document.querySelector('.menu');
const content = document.querySelector('.content');
const paginator = document.querySelector('.paginator');
const paginatorWrapper = document.querySelector('.paginator-wrapper');

class Request {
  getData = async (url) => {
    const response = await fetch(`${defaultAPI}${url}`);
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`);
    }
		return response;
  }

	getChunkData = async (resourceName, pageNumber = state.pageNumber, limit = state.pagesSize) => {
    const response = await this.getData(`${resourceName}?_limit=${limit}&_page=${pageNumber}`);
    const data = await response.json();
		let headers =  new Map(response.headers);
		state.totalItems = +headers.get('x-total-count');
		console.log(state.totalItems)
		
    return {
      data,
    };
  }

	getItem = async (itemName, id) => {
    const data = await this.getData(`/${itemName}/${id}/`);
    return data.json();
  }
}

const request = new Request();

function clearActive() {
	for (let i = 0; i < menu.childNodes.length; i++) {
		menu.childNodes[i]?.classList?.remove('active');
	}
}

function mountItem(itemName, item) {
	const elementHTML = document.createElement('div');
	elementHTML.classList.add('element');
	clearActive();
	switch (itemName) {
    case 'posts':
			menu.childNodes[1].classList.add('active');
      elementHTML.innerHTML = `
				<div class="item-id"><h3>Post: ${item.id}</h3></div>
				<div>
					<div><span>Title:</span> ${item.title}</div>
					<div><span>Info:</span> ${item.body}</div>
				</div>
			`;
      break;
    case 'comments':
			menu.childNodes[3].classList.add('active');
      elementHTML.innerHTML = `
				<div class="item-id"><h3>Comment: ${item.id}</h3></div>
      	<div>
        	<div><span>Name:</span> ${item.name}</div>
        	<div><span>Email:</span> ${item.email}</div>
        	<div><span>Info:</span> ${item.body}</div>
      	</div>
			`;
      break;
		case 'albums':
			menu.childNodes[5].classList.add('active');
			elementHTML.innerHTML = `
				<div class="item-id"><h3>Comment: ${item.id}</h3></div>
      	<div>
					<div><span>Title:</span> ${item.title}</div>
      	</div>
			`;
			break;
    case 'photos':
			menu.childNodes[7].classList.add('active');
      elementHTML.innerHTML = `
				<div class="item-id"><h3>Photo: ${item.id}</h3></div>
				<div>
					<div><span>Title:</span> ${item.title}</div>
					<div><span>URL:</span> <a>${item.url}</a></div>
				</div>
			`;
      break;
    case 'todos':
			menu.childNodes[9].classList.add('active');
      elementHTML.innerHTML = `
				<div class="item-id"><h3>Id: ${item.id}</h3></div>
				<div>
					<div><span>Title:</span> ${item.title}</div>
					<div><span>Completed:</span> ${item.completed}</div>
				</div>
		`;
  }
	content.appendChild(elementHTML);
}

function showLoader() {
	content.innerHTML = '<img src="./preloader.svg" alt="Загрузка...">';
	paginatorWrapper.classList.add('hide');
}

function unmountItems() {
	content.innerHTML = '';
}

function mountPaginator() {
	let pagesCount = Math.ceil(state.totalItems / state.pagesSize);
	for (let i = 1; i <= pagesCount; i++) {
		state.pages.push(i);
		paginatorWrapper.classList.remove('hide');
		const elementPaginator = document.createElement('span');
		elementPaginator.innerText = `${i}`;
		paginator.appendChild(elementPaginator);
	}
	paginator.childNodes[state.pageNumber - 1].classList.add('active');
}

function unmountPaginator() {
	paginator.innerHTML = '';
	state.pages.length = 0;
}

function clickLinkButton(event) {
	unmountPaginator();
	unmountItems();
	showLoader();
	if(event?.target?.textContent) {
		state.pageAddress = event.target.textContent;
		state.pageNumber = 1;
	}
	request.getChunkData(state.pageAddress, state.pageNumber).then((response) => {
		mountPaginator();
		unmountItems();
		response.data.forEach((item) => {
			mountItem(state.pageAddress, item);
		});
	});
}

function clickPaginator(event) {
	if (event.target.innerText === 'Prev' && state.pageNumber >= 2) {
		state.pageNumber -=1;
		clickLinkButton();
	} else if (event.target.innerText === 'Next' && state.pageNumber < state.pages.length) {
		state.pageNumber +=1;
		clickLinkButton();
	} else if (typeof +event.target.innerText === 'number' && +event.target.innerText !== Number.isNaN) {
		state.pageNumber = +event.target.innerText;
		clickLinkButton();
	}
}

menu.addEventListener('click', clickLinkButton);

paginatorWrapper.addEventListener('click', clickPaginator);


