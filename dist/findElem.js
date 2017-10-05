'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
	var createElement = function createElement(type, addedId, parent, styling, content, attr, attrVal) {
		var elem = document.createElement(type);
		if (addedId) elem.id = addedId;
		elem.style.cssText = styling;
		if (content) elem.innerHTML = content;
		var findBox = document.createElement('div');
		parent.append(elem);
		if (attr) elem.setAttribute(attr, attrVal);
		return elem;
	};
	var body = document.body;
	var findBoxStyle = 'width: 250px;padding:5px; min-height:100px; background: cyan; position: fixed; right:20px; top:30px';
	var findBox = createElement('div', 'findBox', body, findBoxStyle);
	var findIFormStyle = 'width: 200px; margin: 0 auto;';
	var findForm = createElement('form', 'findElem', findBox, findIFormStyle);
	var findInputStyle = 'margin: 5px 0;';
	var findInput = createElement('input', 'findElem', findForm, findInputStyle);
	var findButtonStyle = 'margin: 5px 0;';
	var findButton = createElement('button', 'findButton', findForm, findButtonStyle, 'Find');
	var findoptButtonStyle = 'margin: 5px; float: left';
	var prevSiblingButton = createElement('button', 'prevSiblingButton', findBox, findoptButtonStyle, 'Prev Element', 'disabled', true);
	var noMatch = createElement('p', 'nomatch', findForm, 'text-align: center;');

	var parentButton = createElement('button', 'parentButton', findBox, findoptButtonStyle, 'Parent', 'disabled', true);
	var nextSiblingButton = createElement('button', 'nextSiblingButton', findBox, findoptButtonStyle, 'Next Element', 'disabled', true);
	var childButton = createElement('button', 'childButton', findBox, findoptButtonStyle, 'Child', 'disabled', true);
	var defineIsDisable = function defineIsDisable() {
		currentElem.goalElem = [].concat(_toConsumableArray(currentElem.goalElem));
		var isFirstChild = currentElem.goalElem.some(function (item) {
			return item.firstElementChild;
		});
		childButton.disabled = !isFirstChild ? true : false;

		var isParentElement = currentElem.goalElem.some(function (item) {
			return item.parentElement;
		});
		parentButton.disabled = !isParentElement ? true : false;
		var isPrevSibling = currentElem.goalElem.some(function (item) {
			return item.previousElementSibling;
		});
		prevSiblingButton.disabled = !isPrevSibling ? true : false;
		var isNextSibling = currentElem.goalElem.some(function (item) {
			return item.nextElementSibling;
		});
		nextSiblingButton.disabled = !isNextSibling ? true : false;
	};
	var currentElem = {};
	var outlineStyle = '2px solid red';
	findForm.addEventListener('submit', function (e) {
		e.preventDefault();
		var inputVal = findInput.value.trim().toLowerCase();
		if ((inputVal.length > 1 || inputVal.match(/^[a|b|i|u]/)) && !inputVal.match(/^.[0-9!@$%^&*()\|\'\"\[\]\;\:\,\<\>\\\?\`]/) && !inputVal.match(/[#|\.|\~|\+]$/)) {
			var seekingsSelector = document.querySelectorAll(findInput.value);
			if (seekingsSelector.length) {
				noMatch.innerHTML = '';
				currentElem.goalElem = seekingsSelector;
				elemStyleForEach(currentElem.goalElem, 'outline', outlineStyle);
				defineIsDisable();
			} else {
				noMatch.innerHTML = 'no match';
			}
		}
	});
	parentButton.addEventListener('click', function (e) {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '');
		elemPerformEach(currentElem, 'parentElement');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();
	});

	childButton.addEventListener('click', function (e) {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '');
		elemPerformEach(currentElem, 'firstElementChild');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();
	});

	prevSiblingButton.addEventListener('click', function (e) {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '');
		elemPerformEach(currentElem, 'previousElementSibling');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();
	});

	nextSiblingButton.addEventListener('click', function (e) {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '');
		elemPerformEach(currentElem, 'nextElementSibling');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();
	});

	var elemPerformEach = function elemPerformEach(curElem, navMethod) {
		var goalElem = curElem.goalElem,
		    inretmediateElem = curElem.inretmediateElem;

		goalElem.forEach(function (item) {
			var method = item[navMethod];
			if (method) {
				method.style.outline = outlineStyle;
				inretmediateElem.push(method);
			}
		});
	};
	var elemStyleForEach = function elemStyleForEach(curElem, styleKey, styleVal) {
		curElem.forEach(function (item) {
			item.style[styleKey] = styleVal;
		});
	};
})();