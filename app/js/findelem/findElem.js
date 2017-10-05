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
		'width: 250px;padding: 0;position: absolute; z-index: 9999; min-height:100px; background: cyan; right:20px; top:30px';
	const findBox = createElement(
		'div', 
		'findBox',
		body,
		findBoxStyle
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
		if((inputVal.length > 1 || inputVal.match(/^[a|b|i|u]/)) && 
				!inputVal.match(/^.[0-9!@$%^&*()\|\'\"\[\]\;\:\,\<\>\\\?\`]/) &&
				!inputVal.match(/[#|\.|\~|\+]$/)) {
			const seekingsSelector = document.querySelectorAll(findInput.value);
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

	class DragElement {
		constructor(dragElement = findBox, panelDrag =dragPanel) {
			this.dragElement = dragElement;
			this.panelDrag = panelDrag;
			this.pos1 = 0;
			this.pos2 = 0;
			this.pos3 = 0;
			this.pos4 = 0;
			this.tracking = false;
			this.dragMouseDown = this.dragMouseDown.bind(this);
			this.elementDrag = this.elementDrag.bind(this);
			this.stopDraging = this.stopDraging.bind(this);
		}

		dragMouseDown(e = window.event)  {
			this.pos3 = e.clientX;
			this.pos4 = e.clientY;
			this.tracking = true;
			document.addEventListener('mouseup', this.stopDraging)
			document.addEventListener('mouseleave', this.stopDraging)
			document.addEventListener('mousemove', this.elementDrag)
		}
		elementDrag(e=window.event) {
			if (this.tracking) {
				this.pos1 = this.pos3 - e.clientX;
				this.pos2 = this.pos4 - e.clientY;
				this.pos3 = e.clientX;
				this.pos4 = e.clientY;
				this.dragElement.style.top = (this.dragElement.offsetTop - this.pos2) + "px";
				this.dragElement.style.left = (this.dragElement.offsetLeft - this.pos1) + "px";
			}
		}
		
		
		stopDraging() {
			this.tracking = false;
			document.removeEventListener('mousemove', this.elementDrag);
		}
		
		exec() {
			this.dragElement.ondragstart = function() {
				return false;
			};
			this.panelDrag.addEventListener('mousedown', this.dragMouseDown);
		}
	}
 	const draging = new DragElement()
	draging.exec(); 

})()