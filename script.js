'use strict';

var doc = document,
	valueRed = doc.getElementById('myColorRed'), //значение ползунка красного
    valueGreen = doc.getElementById('myColorGreen'), //значение ползунка зеленого
    valueBlue = doc.getElementById('myColorBlue'), //значение ползунка синего
	palette = doc.getElementById('paletteField'), //поле цвета
	paletteStyle = getComputedStyle(palette),//стили поля цвета
	colorsCollection = doc.getElementById('collection'),//поле набора цветов
	colorsObj = {},//хранилище выбранных цветов
	myColor,//выбранный цвет
	blank = doc.getElementById('emptyBlank'),//расскрашиваемое поле
	cellArr = doc.getElementsByClassName('blank__item'),//ячейки поля
	stepsArr = [],//массив последовательности шагов
	stepIndex,//индекс номера ячейки в массиве последовательности шагов
	numCell,//номер ячейки
	buttonRandomColor = doc.getElementById('randomColor'),//кнопка задания случайного цвета
	buttonResetBlank = doc.getElementById('resetBlank'),//кнопка очистки расскраски
	buttonResetPalette = doc.getElementById('resetPalette'),//кнопка очистки палитры
	buttonPrevStep = doc.getElementById('stepPrev'),//кнопка вернуться на шаг назад
	buttonNextStep = doc.getElementById('stepNext');//кнопка перейти на шаг вперед

/*-------------------------------------------------------*/
function changeColor() {
    var red,
        green,
        blue,
        color;
    red = valueRed.value;
    green = valueGreen.value;
    blue = valueBlue.value;
    color = 'rgb(' + red + ',' + green + ',' + blue + ')';
	palette.style.backgroundColor = color;
}

/*------------------------------------------------------------*/
function randomNum(min, max) {
	var rand = min - 0.5 + Math.random() * (max - min + 1)
	rand = Math.round(rand);
	return rand;
}

/*---------------------------------------------------------------*/
function getRandomColor() {
	var colorRed = randomNum(0, 255),
		colorGreen = randomNum(0, 255),
		colorBlue = randomNum(0, 255);

	var randomColor = 'rgb(' + colorRed + ', ' + colorGreen + ', ' + colorBlue + ')';

	palette.style.backgroundColor = randomColor;

	valueRed.value = colorRed;
	valueGreen.value = colorGreen;
	valueBlue.value = colorBlue;
}

/*---------------------------------------------------------*/
function getColor() {

	myColor = paletteStyle.backgroundColor;

	addColorToCollection();
}

/*---------------------------------------------------------*/
function addColorToCollection() {

	colorsObj[myColor] = 'true';
	colorsCollection.innerHTML = '';

	for (var key in colorsObj) {
		var newColor = doc.createElement('div');
		newColor.className = 'collection__item';
		newColor.style.backgroundColor = key;
		colorsCollection.appendChild(newColor);
	}
}

/*----------------------------------------------------------*/
function setColor(tar) {
	if (getComputedStyle(tar).backgroundColor == myColor) {
		tar.style.backgroundColor = confirm('Перекрасить ячейку в такой же цвет?') ? myColor : 'transparent';
	} else {
		tar.style.backgroundColor = myColor;
	}
}

/*----------------------------------------------------------*/
function resetBlank() {
	var arrCell = blank.getElementsByClassName('blank__item');

	Array.prototype.forEach.call(arrCell, function (item) {
		item.style.backgroundColor = 'transparent';
	});

	/*for (var i = 0; i < arrCell.length; i++) {
		arrCell[i].style.backgroundColor = 'transparent';
	}*/
}

/*-------------------------------------------------------------*/
function resetPalette() {
	valueRed.value = 0;
	valueGreen.value = 0;
	valueBlue.value = 0;
	palette.style.backgroundColor = '';
	colorsCollection.innerHTML = '';
	myColor = '';
	colorsObj = {};
}

/*---------------------------------------------------------*/
function choiceColorOption(event) {
	event = event || window.event;
	var target = event.target; // где был клик?
	/*var target = event.target || event.srcElement;*/

	if (!target.classList.contains('collection__item')) return; // не на варианте цвета? тогда не интересует

	myColor = target.style.backgroundColor;
};

/*---------------------------------------------------------*/
function choiceCell(event) {
	event = event || window.event;
	var target = event.target; // где был клик?
	/*var target = event.target || event.srcElement;*/

	if (!target.classList.contains('blank__item')) return; // не на ячейке? тогда не интересует

	setColor(target); // перекрасить ячейку
};

/*------------------------------------------------------------*/
/*var colorsArrCell_1 = [],
	stepColorCell_1;*/

function getSteps(event) {
	event = event || window.event;
	var target = event.target || event.srcElement;

	if (!target.classList.contains('blank__item')) return;

	stepsArr.push(target.getAttribute('data-cell'));

	stepIndex = stepsArr.length - 1;
	numCell = stepsArr[stepIndex];

	/*if (target.getAttribute('data-cell') == 1) {
		colorsArrCell_1.push(target.style.backgroundColor);
	}
	stepColorCell_1 = colorsArrCell_1.length - 2;*/
}

/*----------------------------------------------------------------*/
function goPrevStep() {

	for (var i = 0; i < cellArr.length; i++) {
		if (cellArr[i].getAttribute('data-cell') == numCell) {
			cellArr[i].style.backgroundColor = '';

			/*if (stepColorCell_1 < 0) {
				cellArr[i].style.backgroundColor = '';
				break;
			} else {
				cellArr[i].style.backgroundColor = colorsArrCell_1[stepColorCell_1];
			}*/
		}
	}

	/*stepColorCell_1--;

	if (stepColorCell_1 == -1) {
		colorsArrCell_1 = [];
	}*/

	stepIndex--;
	numCell = stepsArr[stepIndex];
}

/*-------------------------------------------------------------*/
valueRed.addEventListener('input', changeColor);
valueGreen.addEventListener('input', changeColor);
valueBlue.addEventListener('input', changeColor);
palette.addEventListener('click', getColor);
colorsCollection.addEventListener('click', choiceColorOption);
buttonRandomColor.addEventListener('click', getRandomColor);

blank.addEventListener('click', choiceCell);
blank.addEventListener('click', getSteps);

buttonPrevStep.addEventListener('click', goPrevStep);
buttonResetBlank.addEventListener('click', resetBlank);
buttonResetPalette.addEventListener('click', resetPalette);

//test commit




