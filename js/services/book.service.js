'use strict';
//MODEL//
const BOOKS_STORAGE_KEY = 'booksDB';
var gBooks;
let gPage = 1;
let gRows = 4;
_createBooks();

function changePage(diff) {
	gPage += diff;
}

function pickPage(pageNum) {
	gPage = pageNum;
}

function getBooksPagination() {
	var trimStart = (gPage - 1) * gRows;
	var trimEnd = trimStart + gRows;
	var trimmedData = gBooks.slice(trimStart, trimEnd);
	var pages = Math.ceil(gBooks.length / gRows);
	return {
		books: trimmedData,
		pages: pages
	};
}

function deleteBook(bookId) {
	const idx = gBooks.findIndex((book) => book.id === bookId);
	gBooks.splice(idx, 1);
	_saveBooksToStorage();
}

function addBook(name, price, imgUrl) {
	const book = _createBook(name, price, imgUrl);
	gBooks.push(book);
	_saveBooksToStorage();
}

function getBookById(bookId) {
	const book = gBooks.find((book) => book.id === bookId);
	return book;
}

function updateBook(bookId, bookPrice) {
	const book = getBookById(bookId);
	book.price = bookPrice;
	_saveBooksToStorage();
}

function _createBooks() {
	gBooks = loadFromStorage(BOOKS_STORAGE_KEY);
	if (!gBooks || !gBooks.length) {
		gBooks = [
			_createBook('HTML', 20, '/images/html.png'),
			_createBook('CSS', 35, '/images/css.png'),
			_createBook('JAVASCRIPT', 50, '/images/javascript.png'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg'),
			_createBook("Li'l Puki", 30, 'https://live.staticflickr.com/2378/2215010036_bdd240c4d6_w.jpg')
		];
	}
	_saveBooksToStorage();
}

function _createBook(name, price, imgUrl) {
	const book = {
		id: makeId(),
		name,
		price,
		imgUrl,
		rate: 0
	};
	return book;
}

function _saveBooksToStorage() {
	saveToStorage(BOOKS_STORAGE_KEY, gBooks);
}

function decrementRate(bookId) {
	const book = getBookById(bookId);
	if (book.rate === 0) return book.rate;
	book.rate--;
	_saveBooksToStorage();
	return book.rate;
}

function incrementRate(bookId) {
	const book = getBookById(bookId);
	if (book.rate === 10) return book.rate;
	book.rate++;
	_saveBooksToStorage();
	return book.rate;
}

function sortBooks(sortBy) {
	switch (sortBy) {
		case 'price':
			gBooks.sort((book1, book2) => book2.price - book1.price);
			break;
		case 'name':
			gBooks.sort((book1, book2) => {
				if (book1.name > book2.name) {
					return -1;
				} else if (book1.name < book2.name) {
					return 1;
				}
				return 0;
			});
			break;
		default:
			break;
	}
}
