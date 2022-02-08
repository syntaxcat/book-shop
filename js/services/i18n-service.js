'use strict';

var gTrans = {
	title: {
		en: 'Welcome to my bookshop!',
		he: '📚!ברוכים הבאים לחנות הספרים שלי'
	},
	create: {
		en: 'Add',
		he: 'הוסף'
	},
	prev: {
		en: 'Prev',
		he: 'הקודם'
	},
	next: {
		en: 'Next',
		he: 'הבא'
	},
	id: {
		en: 'Id',
		he: 'מספר זיהוי'
	},
	name: {
		en: 'Name',
		he: 'שם'
	},
	price: {
		en: 'Price',
		he: 'מחיר'
	},
	actions: {
		en: 'Actions',
		he: 'פעולות'
	},
	'name-of-book': {
		en: 'Name of the book?',
		he: '?שם הספר'
	},
	'name-book-placeholder': {
		en: 'Name',
		he: 'שם'
	},
	'price-of-book': {
		en: 'Price of the book?',
		he: '?מחיר הספר'
	},
	'price-book-placeholder': {
		en: 'Price',
		he: 'מחיר'
	},
	'imgurl-of-book': {
		en: 'imgUrl of the book?',
		he: '?לינק תמונה לספר'
	},
	'imgurl-placeholder': {
		en: 'imgUrl',
		he: 'לינק תמונה'
	},
	'newprice-of-book': {
		en: 'New price',
		he: 'מחיר חדש'
	},
	'newprice-of-book-placeholder': {
		en: 'New price',
		he: 'מחיר חדש'
	},
	'update-btn': {
		en: 'Update',
		he: 'עדכן'
	},
	'add-btn': {
		en: 'Add',
		he: 'הוסף'
	},
	'read-btn-trans': {
		en: 'Read',
		he: 'קרא'
	},
	'update-btn-trans': {
		en: 'Update',
		he: 'עדכן'
	},
	'delete-btn-trans': {
		en: 'Delete',
		he: 'מחק'
	}
};

var gCurrLang = 'en';

function getTrans(transKey) {
	var keyTrans = gTrans[transKey];
	if (!keyTrans) return 'UNKNOWN';

	var txt = keyTrans[gCurrLang];
	if (!txt) txt = keyTrans.en;

	return txt;
}

function doTrans() {
	var els = document.querySelectorAll('[data-trans]');
	els.forEach((el) => {
		// console.dir(el)
		var transKey = el.dataset.trans;
		var txt = getTrans(transKey);
		if (el.nodeName === 'INPUT') {
			// el.setAttribute('placeholder', txt)
			//THE SAME!
			el.placeholder = txt;
		} else el.innerText = txt;
	});
}

function setLang(lang) {
	gCurrLang = lang;
}

// function formatNumOlder(num) {
// 	return num.toLocaleString('es');
// }

function formatNum(num) {
	return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
	return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {
	var options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	};

	return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
	return km / 1.609;
}
