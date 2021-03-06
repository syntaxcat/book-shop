'use strict';

var gTrans = {
	title: {
		en: 'Welcome to my bookshop!',
		he: '馃摎!讘专讜讻讬诐 讛讘讗讬诐 诇讞谞讜转 讛住驻专讬诐 砖诇讬'
	},
	create: {
		en: 'Add',
		he: '讛讜住祝'
	},
	prev: {
		en: 'Prev',
		he: '讛拽讜讚诐'
	},
	next: {
		en: 'Next',
		he: '讛讘讗'
	},
	id: {
		en: 'Id',
		he: '诪住驻专 讝讬讛讜讬'
	},
	name: {
		en: 'Name',
		he: '砖诐'
	},
	price: {
		en: 'Price',
		he: '诪讞讬专'
	},
	actions: {
		en: 'Actions',
		he: '驻注讜诇讜转'
	},
	'name-of-book': {
		en: 'Name of the book?',
		he: '?砖诐 讛住驻专'
	},
	'name-book-placeholder': {
		en: 'Name',
		he: '砖诐'
	},
	'price-of-book': {
		en: 'Price of the book?',
		he: '?诪讞讬专 讛住驻专'
	},
	'price-book-placeholder': {
		en: 'Price',
		he: '诪讞讬专'
	},
	'imgurl-of-book': {
		en: 'imgUrl of the book?',
		he: '?诇讬谞拽 转诪讜谞讛 诇住驻专'
	},
	'imgurl-placeholder': {
		en: 'imgUrl',
		he: '诇讬谞拽 转诪讜谞讛'
	},
	'newprice-of-book': {
		en: 'New price',
		he: '诪讞讬专 讞讚砖'
	},
	'newprice-of-book-placeholder': {
		en: 'New price',
		he: '诪讞讬专 讞讚砖'
	},
	'update-btn': {
		en: 'Update',
		he: '注讚讻谉'
	},
	'add-btn': {
		en: 'Add',
		he: '讛讜住祝'
	},
	'read-btn-trans': {
		en: 'Read',
		he: '拽专讗'
	},
	'update-btn-trans': {
		en: 'Update',
		he: '注讚讻谉'
	},
	'delete-btn-trans': {
		en: 'Delete',
		he: '诪讞拽'
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
