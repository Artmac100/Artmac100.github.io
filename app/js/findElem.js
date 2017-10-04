
function createElement(type, addedId, parent,styling, content, attr, attrVal) {
	var elem = document.createElement(type);
	if (addedId) elem.id = addedId;
	elem.style.cssText = styling
	if (content) elem.innerHTML = content;
	var findBox = document.createElement('div');
	parent.append(elem);
	if(attr) elem.setAttribute(attr, attrVal)
	return elem;
}


var body = document.body;


var findBoxStyle = 'width: 250px;padding:5px; min-height:100px; background: cyan; position: fixed; right:20px; top:30px';
var findBox = createElement(
	'div', 
	'findBox',
	body,
	findBoxStyle
);

var findIFormStyle = 'width: 200px; margin: 0 auto;'
var findForm = createElement(
	'form',
	'findElem',
	findBox,
	findIFormStyle
);

var findInputStyle = 'margin: 5px 0;';
var findInput = createElement(
	'input',
	'findElem',
	findForm,
	findInputStyle
);

var findButtonStyle = 'margin: 5px 0;';
var findButton = createElement(
	'button',
	'findButton',
	findForm,
	findButtonStyle,
	'Find'
);

var findoptButtonStyle = 'margin: 5px; float: left';
var prevSiblingButton = createElement(
	'button',
	'prevSiblingButton',
	findBox,
	findoptButtonStyle,
	'Prev Element',
	'disabled',
	true
);


var noMatch = createElement(
	'p',
	'nomatch',
	findForm,
	'text-align: center;', 
)

var parentButton = createElement(
	'button',
	'parentButton',
	findBox,
	findoptButtonStyle,
	'Parent',
	'disabled',
	true
);

var nextSiblingButton = createElement(
	'button',
	'nextSiblingButton',
	findBox,
	findoptButtonStyle,
	'Next Element',
	'disabled',
	true
);

var childButton = createElement(
	'button',
	'childButton',
	findBox,
	findoptButtonStyle,
	'Child',
	'disabled',
	true
);

function defineIsDisable() {
	currentElem.goalElem = [].slice.call(currentElem.goalElem);
	var isFirstChild = currentElem.goalElem.some(function(item) {
		return item.firstElementChild;
	});
	childButton.disabled = !isFirstChild ? true : false;
	
	var isParentElement = currentElem.goalElem.some(function(item) {
		return item.parentElement;
	});

	parentButton.disabled = !isParentElement ? true : false;

	var isPrevSibling = currentElem.goalElem.some(function(item) {
		return item.previousElementSibling;
	});
	prevSiblingButton.disabled = !isPrevSibling ? true : false;

	var isNextSibling = currentElem.goalElem.some(function(item) {
		return item.nextElementSibling;
	});
	nextSiblingButton.disabled = !isNextSibling ? true : false;
}

var currentElem = {}
var outlineStyle = '2px solid red';
findForm.addEventListener('submit', function(e) {
	e.preventDefault();
	var inputVal = findInput.value.trim().toLowerCase();
	if((inputVal.length > 1 || inputVal.match(/^[a|b|i|u]/)) && inputVal.match(/^.[a-z]/) ) {
		var seekingsSelector = document.querySelectorAll(findInput.value);
		console.log(seekingsSelector);
		if(seekingsSelector.length) {
			noMatch.innerHTML = '';
			currentElem.goalElem = seekingsSelector;
			elemStyleForEach(currentElem.goalElem, 'outline', outlineStyle);
			defineIsDisable();	
		} else {
			noMatch.innerHTML = 'no match';
		}
	}
})
parentButton.addEventListener('click', function(e) {
	e.preventDefault();
	currentElem.inretmediateElem = [];
	elemStyleForEach(currentElem.goalElem, 'outline', '')
	console.log(currentElem.goalElem);
	currentElem.goalElem.forEach(function(item) {
		if (item.parentElement) {
			item.parentElement.style.outline = outlineStyle;
			currentElem.inretmediateElem.push(item.parentElement);
		}
	});
	currentElem.goalElem = currentElem.inretmediateElem;
	defineIsDisable()	
	// elemStyleForEach(currentElem.goalElem, 'border', outlineStyle);
}) ;

childButton.addEventListener('click', function(e) {
	e.preventDefault();
	currentElem.inretmediateElem = [];
	elemStyleForEach(currentElem.goalElem, 'outline', '')
	currentElem.goalElem.forEach(function(item) {
		if (item.firstElementChild) {
			item.firstElementChild.style.outline = outlineStyle;
			console.log(item.firstElementChild);
			currentElem.inretmediateElem.push(item.firstElementChild);
		}
	})
	currentElem.goalElem = currentElem.inretmediateElem;
	defineIsDisable();
});


prevSiblingButton.addEventListener('click', function(e) {
	e.preventDefault();
	currentElem.inretmediateElem = [];
	console.log(currentElem.goalElem);
	elemStyleForEach(currentElem.goalElem, 'outline', '')
	currentElem.goalElem.forEach(function(item) {
		if (item.previousElementSibling) {
			item.previousElementSibling.style.outline = outlineStyle;
			currentElem.inretmediateElem.push(item.previousElementSibling);
		}
	})
	currentElem.goalElem = currentElem.inretmediateElem;
	defineIsDisable();	
});

nextSiblingButton.addEventListener('click', function(e) {
	e.preventDefault();
	currentElem.inretmediateElem = [];
	elemStyleForEach(currentElem.goalElem, 'outline', '')
	currentElem.goalElem.forEach(function(item) {
		if (item.nextElementSibling) {
			item.nextElementSibling.style.outline = outlineStyle;
			currentElem.inretmediateElem.push(item.nextElementSibling);
			console.log(item.nextElementSibling)
		}
	})
	currentElem.goalElem = currentElem.inretmediateElem;
	defineIsDisable();	
});




function elemStyleForEach(curElem, styleKey,styleVal) {
	curElem.forEach(function(item) {
		item.style[styleKey] = styleVal;	

	});
}