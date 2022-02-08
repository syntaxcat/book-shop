'use strict';

//CONTROLLER//
let bookIdToUpdate;

function onInit() {
	renderPagination();
	renderBooks();
	doTrans();
}

function renderBooks() {
	const books = getBooksPagination().books;
	var strHTMLs = books.map(
		(book) =>
			`<tr>
				<td>${book.id}</td>
				<td>${book.name}</td>
				<td>${book.price}</td>
                <td><button data-trans="read-btn-trans" class="btn read-btn" onclick="onReadBook('${book.id}')">Read</button></td>
                <td><button data-trans="update-btn-trans" class="btn update-btn" onclick="openFormUpdateBook('${book.id}')">Update</button></td>
                <td><button data-trans="delete-btn-trans" class="btn delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button></td>
			</tr>`
	);

	document.querySelector('.book-table').innerHTML = strHTMLs.join('');
}

function onDeleteBook(bookId) {
	console.log('Removing Book', bookId);
	deleteBook(bookId);
	renderBooks();
}

function openFormAddBook() {
	document.querySelector('.modal.modal-create').style.display = 'block';
}

function onCloseModalCreate() {
	document.querySelector('.modal.modal-create').style.display = 'none';
}

function onCloseModalUpdate() {
	document.querySelector('.modal.modal-update').style.display = 'none';
}

function onAddBook(ev) {
	ev.preventDefault();
	const elName = document.querySelector('input[name=name]');
	const elPrice = document.querySelector('input[name=price]');
	const elImgUrl = document.querySelector('input[name=imgUrl]');
	const name = elName.value;
	const price = elPrice.value;
	const imgUrl = elImgUrl.value;
	addBook(name, price, imgUrl);

	elName.value = '';
	elPrice.value = '';
	elImgUrl.value = '';
	renderBooks();
	onCloseModalCreate();
}

function openFormUpdateBook(bookId) {
	bookIdToUpdate = bookId;
	document.querySelector('.modal.modal-update').style.display = 'block';
	document.querySelector('.update-book').style.display = 'block';
}

function onUpdateBook(ev) {
	ev.preventDefault();
	const elNewPrice = document.querySelector('input[name=newPrice]');
	const newPrice = elNewPrice.value;

	updateBook(bookIdToUpdate, newPrice);
	elNewPrice.value = '';
	bookIdToUpdate = null;
	renderBooks();
	document.querySelector('.update-book').style.display = 'none';
	onCloseModalUpdate();
}

function onReadBook(bookId) {
	const book = getBookById(bookId);
	document.querySelector('.modal-content .content').innerHTML = `
        <h2>${book.name} ${book.price}$</h2>
        <img src="${book.imgUrl}">
        <div class="rate-container">
            <button class="decrement-btn" ${book.rate === 0
				? 'disabled'
				: ''} onclick="onDecrementRate('${book.id}')">-</button>
            <span class="rate">${book.rate}</span>
            <button class="increment-btn" ${book.rate === 10
				? 'disabled'
				: ''} onclick="onIncrementRate('${book.id}')">+</button>
        </div>
    `;
	document.querySelector('.modal').style.display = 'block';
}

function onCloseModal() {
	document.querySelector('.modal').style.display = 'none';
}

function onDecrementRate(bookId) {
	const newRate = decrementRate(bookId);
	document.querySelector('.rate').innerText = newRate;
	updateButtonDisabled(newRate);
}

function onIncrementRate(bookId) {
	const newRate = incrementRate(bookId);
	document.querySelector('.rate').innerText = newRate;
	updateButtonDisabled(newRate);
}

function updateButtonDisabled(rate) {
	document.querySelector('.increment-btn').disabled = rate === 10;
	document.querySelector('.decrement-btn').disabled = rate === 0;
}

function onSort(sortBy) {
	console.log('Filtering By:', sortBy);

	sortBooks(sortBy);
	renderBooks();
}

function renderPagination() {
	const pages = getBooksPagination().pages;
	let strHTML = '';
	for (var i = 1; i <= pages; i++) {
		strHTML += `<button onclick="onPickPage(${i})">${i}</button>`;
	}

	document.querySelector('.pages').innerHTML = strHTML;
}

function onPickPage(pageNum) {
	pickPage(pageNum);
	renderBooks();
}

function onMoveToPage(diff) {
	changePage(diff);
	renderBooks();
}

function onSetLang(lang) {
	setLang(lang);
	if (lang === 'he') document.body.classList.add('rtl');
	else document.body.classList.remove('rtl');
	doTrans();
	// renderBooks();
}
