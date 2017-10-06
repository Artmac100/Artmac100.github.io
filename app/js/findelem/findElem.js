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
		currentElem.goalElem = [ ...currentElem.goalElem];
		const isFirstChild = currentElem.goalElem.some(item => {
			return item.firstElementChild;
		});
		childButton.disabled = !isFirstChild ? true : false;
		
		const isParentElement = currentElem.goalElem.some(item => {
			return item.parentElement;
		});
		parentButton.disabled = !isParentElement ? true : false;
		const isPrevSibling = currentElem.goalElem.some(item => {
			return item.previousElementSibling;
		});
		prevSiblingButton.disabled = !isPrevSibling ? true : false;
		const isNextSibling = currentElem.goalElem.some(item => {
			return item.nextElementSibling;
		});
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
			const seekingsSelector = document.querySelectorAll(findInput.value);
			if(seekingsSelector.length) {
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
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem , 'parentElement');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable()	
	}) ;

	childButton.addEventListener('click', e => {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem , 'firstElementChild');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();
	});


	prevSiblingButton.addEventListener('click', e => {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem , 'previousElementSibling');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();	
	});

	nextSiblingButton.addEventListener('click', function(e) {
		e.preventDefault();
		currentElem.inretmediateElem = [];
		elemStyleForEach(currentElem.goalElem, 'outline', '')
		elemPerformEach(currentElem , 'nextElementSibling');
		currentElem.goalElem = currentElem.inretmediateElem;
		defineIsDisable();	
	});

	const elemPerformEach = (curElem, navMethod) => {
		const { goalElem, inretmediateElem } = curElem;
		goalElem.forEach(item => {
			const method = item[navMethod]; 
			if (method) {
				method.style.outline = outlineStyle;
				inretmediateElem.push(method);
			}
		})
	};
	const elemStyleForEach = (curElem, styleKey,styleVal) => {
		curElem.forEach(function(item) {
			item.style[styleKey] = styleVal;	
		});
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
	 // Set the dropEffect to move
	 return false;
	} 

	findBox.addEventListener('dragstart',dragStart,false); 
	document.body.addEventListener('dragover',dragOver,false); 
	document.body.addEventListener('drop',drop,false); 

})()