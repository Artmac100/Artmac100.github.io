(function() {
	const createElement = (type, addedId, parent,styling, content, attr, attrVal) => {
		const elem = document.createElement(type);
		if (addedId) elem.id = addedId;
		elem.style.cssText = styling
		if (content) elem.innerHTML = content;
		const findBox = document.createElement('div');
		parent.append(elem);
		if(attr) elem.setAttribute(attr, attrVal)
		return elem;
	}
	const body = document.body;
	let findBoxStyle = 
		'width: 250px;padding: 0; cursor: move; position: fixed; z-index: 9999; min-height:100px; background: cyan; right:20px; top:30px';
	const findBox = createElement(
		'div', 
		'findBox',
		body,
		findBoxStyle,
		null,
		'draggable',
		true
	);

	let dragPanelStyle = 'width: 100%; height:15px; background: brown;'; 
	const dragPanel = createElement(
		'div',
		'header-pan',
		findBox,
		dragPanelStyle
	);
	let findIFormStyle = 'width: 200px; margin: 0 auto;'
	const findForm = createElement(
		'form',
		'findElem',
		findBox,
		findIFormStyle
	);
	let findInputStyle = 'margin: 5px 0;';
	const findInput = createElement(
		'input',
		'findElem',
		findForm,
		findInputStyle
	);
	let findButtonStyle = 'margin: 5px 0;';
	const findButton = createElement(
		'button',
		'findButton',
		findForm,
		findButtonStyle,
		'Find'
	);
	let findoptButtonStyle = 'margin: 5px; float: left';
	const prevSiblingButton = createElement(
		'button',
		'prevSiblingButton',
		findBox,
		findoptButtonStyle,
		'Prev Element',
		'disabled',
		true
	);
	const noMatch = createElement(
		'p',
		'nomatch',
		findForm,
		'text-align: center;', 
	)

	const parentButton = createElement(
		'button',
		'parentButton',
		findBox,
		findoptButtonStyle,
		'Parent',
		'disabled',
		true
	);
	const nextSiblingButton = createElement(
		'button',
		'nextSiblingButton',
		findBox,
		findoptButtonStyle,
		'Next Element',
		'disabled',
		true
	);
	const childButton = createElement(
		'button',
		'childButton',
		findBox,
		findoptButtonStyle,
		'Child',
		'disabled',
		true
	);


	const defineIsDisable = () => {
		const isFirstChild = currentElem.goalElem.firstElementChild;
		childButton.disabled = !isFirstChild ? true : false;
		const isParentElement = currentElem.goalElem.parentElement;
		parentButton.disabled = !isParentElement ? true : false;
		const isPrevSibling = currentElem.goalElem.previousElementSibling;
		prevSiblingButton.disabled = !isPrevSibling ? true : false;
		const isNextSibling = currentElem.goalElem.nextElementSibling;
		nextSiblingButton.disabled = !isNextSibling ? true : false;
	}
	const currentElem = {}
	const outlineStyle = '2px solid red';
	findForm.addEventListener('submit', e => {
		e.preventDefault();
		const inputVal = findInput.value.trim().toLowerCase();
		if(((inputVal.length > 1 || inputVal.match(/^[a|b|i|u]/)) && 
				!inputVal.match(/^.[0-9!@$%^&*()\|\'\"\[\]\;\:\,\<\>\\\?\`]/) &&
				!inputVal.match(/[#|\.|\~|\+]$/)) ||
				inputVal.match(/h[1-6]/)
			) {
			const seekingsSelector = document.querySelector(findInput.value);
			if(seekingsSelector) {
				noMatch.innerHTML = '';
				if (currentElem.goalElem) 	elemStyleForEach(currentElem.goalElem, 'outline', ''); 
				currentElem.goalElem = seekingsSelector;
				elemStyleForEach(currentElem.goalElem, 'outline', outlineStyle);
				defineIsDisable();	
			} else {
				noMatch.innerHTML = 'no match';
			}
		}
	})
	parentButton.addEventListener('click', e => {
		e.preventDefault();
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem.goalElem , 'parentElement');
		defineIsDisable()	
	}) ;

	childButton.addEventListener('click', e => {
		e.preventDefault();
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem.goalElem , 'firstElementChild');
		defineIsDisable();
	});


	prevSiblingButton.addEventListener('click', e => {
		e.preventDefault();
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem.goalElem , 'previousElementSibling');
		defineIsDisable();	
	});

	nextSiblingButton.addEventListener('click', function(e) {
		e.preventDefault();
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem.goalElem , 'nextElementSibling');
		defineIsDisable();	
	});

	const elemPerformEach = (goalElem, navMethod) => {
		const method = goalElem[navMethod]; 
		method.style.outline = outlineStyle;
		currentElem.goalElem = method;
		console.dir(currentElem.goalElem)
		const { id, className, tagName } = currentElem.goalElem;
	};

	const elemStyleForEach = (curElem, styleKey,styleVal) => {
		curElem.style[styleKey] = styleVal;
	};

	const dragStart = (e) => {
		const style = window.getComputedStyle(event.target, null);
    e.dataTransfer.setData("text/plain",
    (parseInt(style.getPropertyValue("left"),10) - e.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - e.clientY));
	};

	const drop = (e) => { 
		var offset = e.dataTransfer.getData("text/plain").split(',');
    findBox.style.left = (e.clientX + parseInt(offset[0],10)) + 'px';
    findBox.style.top = (e.clientY + parseInt(offset[1],10)) + 'px';
    e.preventDefault();
    return false;
	} 

	const dragOver = (e) => { 
	 e.preventDefault();
	 return false;
	} 

	findBox.addEventListener('dragstart',dragStart,false); 
	document.body.addEventListener('dragover',dragOver,false); 
	document.body.addEventListener('drop',drop,false); 

})()