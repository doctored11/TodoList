{
	// глобальная видимость

	window.createTodoApp = createTodoApp;
	window.UsualTasks = JSON.parse(localStorage.getItem('id1')) || [];
	window.NumberLists = JSON.parse(localStorage.getItem('lists')) || [0, 1, 2];
	//  let  numLists = [0, 1, 2];
	//   localStorage.setItem('lists', JSON.stringify(numLists));

	//-

	// основная вызываемая функция
	function createTodoApp(container, title, UsualTasks, localId) {
		numLists = JSON.parse(localStorage.getItem('lists')) || [0, 1, 2];
		listRename();
		listStatusCheck(numLists);
		localStorage.setItem('lists', JSON.stringify(numLists));
		//
		title = JSON.parse(localStorage.getItem(`title-${localId}`)) || 'Список делишек';

		nav = document.querySelector('.nav');
		console.log('start');
		window.localId = localId;
		UsualTasks = getUsualTasks();
		pushLocalStorage(UsualTasks);
		UsualTasks = getUsualTasks();
		console.log(UsualTasks);
		if (UsualTasks == null || UsualTasks == undefined) {
			console.log('null defend');
			defendLocal(localId);
		}
		UsualTasks = getUsualTasks();
		let containerTitle = createNewContainer();
		let appTitle = createAppTitle(title);
		let renameBtn = createRenameBtn();
		let plusBtn = createPlusBtn();
		let itemForm = createTodoItemForm();
		let todoList = createTodoList();
		deleteList();

		appendToWhats(containerTitle, appTitle, renameBtn);
		appendToWhats(nav, plusBtn);
		addList(plusBtn, numLists);

		appendToWhats(container, containerTitle, itemForm.form, todoList);

		checkStarterArray(UsualTasks, todoList);
		UsualTasks = getUsualTasks();
		pushNew(itemForm, todoList, UsualTasks);
		statusCheck(0, UsualTasks);
		renameTitle();
	}

	// -

	//
	//
	//
	// вспомогательные функции и методы -->
	//
	//
	//
	function defendLocal(UsualTasks) {
		UsualTasks = [];
		if (localId == 'id1') {
			UsualTasks = [
				{ name: 'дело раз', done: false },
				{ name: 'дикобраз', done: false },
				{ name: '😳🦖', done: false },
				{ name: 'rrr1', done: false },
				{ name: 'rrr2', done: false },
				{ name: 'rrr3', done: false },
			];
		}
		pushLocalStorage(UsualTasks);
		console.log(UsualTasks);
	}

	function appendToWhats(To, what1, what2, what3, what4) {
		To.append(what1);
		if (what2 != undefined) {
			To.append(what2);
		}
		if (what3 != undefined) {
			To.append(what3);
		}
		if (what4 != undefined) {
			To.append(what4);
		}
	}
	function checkStarterArray(UsualTasks, todoList) {
		if (UsualTasks.length > 0) {
			console.log('отрисовка списка');

			for (let i = 0; i <= UsualTasks.length - 1; ++i) {
				let todoItem = createTodoItem(Object.values(UsualTasks[i]), i);

				console.log('🤡');

				paintList(todoItem, todoList, UsualTasks);
			}
		}
	}

	function pushNew(itemForm, todoList, UsualTasks) {
		itemForm.form.addEventListener('submit', function (el) {
			UsualTasks = getUsualTasks();
			el.preventDefault();

			for (let i = 0; i <= UsualTasks.length - 1; ++i) {
				if (Object.values(UsualTasks[i])[0] == itemForm.input.value) {
					console.log('🛑 Такой таск уже есть!');
					itemForm.input.value = '';
					alert('Вы уже заплонировали такое занятие 😅');
					return;
				}
			}

			if (!itemForm.input.value) {
				return;
			}
			console.log('push');
			UsualTasks.push({ name: itemForm.input.value, done: false });

			pushLocalStorage(UsualTasks);

			console.log(UsualTasks);

			document.querySelector('.btn').setAttribute('disabled', 'true');

			todoItem = createTodoItem(
				Object.values(UsualTasks[UsualTasks.length - 1]),
				`${UsualTasks.length - 1}`
			);

			paintList(todoItem, todoList, UsualTasks);

			itemForm.input.value = '';
		});
	}

	function paintList(todoItem, todoList, UsualTasks) {
		console.log('paint');

		addBtns(todoItem, UsualTasks, todoList);
		todoList.append(todoItem.item);

		return todoItem;
	}

	function pushLocalStorage(UsualTasks) {
		console.log('Local');

		localStorage.setItem(localId, JSON.stringify(UsualTasks));
	}

	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		return list;
	}
	function createNewContainer() {
		let titleContainer = document.createElement('div');
		titleContainer.classList.add('title-container');

		return titleContainer;
	}

	function createAppTitle(title) {
		let appTitle = document.createElement('h2');
		appTitle.classList.add('title-h2');
		appTitle.textContent = title;
		return appTitle;
	}
	function createRenameBtn() {
		title = '✏️';
		let appBtn = document.createElement('button');
		appBtn.classList.add('ico-btn', 'rename-btn');
		appBtn.textContent = title;
		return appBtn;
	}
	function createPlusBtn() {
		title = '➕';
		let appBtn = document.createElement('button');
		appBtn.classList.add('ico-btn', 'plus-btn');
		appBtn.textContent = title;
		return appBtn;
	}

	//

	function createTodoItemForm() {
		let form = document.createElement('form');

		let input = document.createElement('input');

		let buttonContainer = document.createElement('div');
		let button = document.createElement('button');

		button.setAttribute('disabled', 'true');

		form.addEventListener('input', function () {
			if (!input.value) {
				button.setAttribute('disabled', 'true');
			} else {
				button.removeAttribute('disabled');
			}
		});

		form.classList.add('input-group', 'mb-3', 'container__form');
		input.classList.add('form-control', 'container__input');

		input.placeholder = 'Запланированное Дело*';

		buttonContainer.classList.add('input-group-btn');
		button.classList.add('btn', 'btn-main');

		button.setAttribute('disabled', 'true');

		button.textContent = 'Добавить';

		buttonContainer.append(button);
		form.append(input);
		form.append(buttonContainer);

		return {
			form,
			input,
			button,
		};
	}

	//
	function searchTargetList(todoItem) {
		let taskContent = [];

		for (let i = 0; i <= todoItem.item.textContent.length - 15; i++) {
			taskContent.push(Object.values(todoItem.item.textContent[i]).join(''));
		}

		taskContent = Object.values(taskContent);

		let targetList = taskContent.join('');

		return targetList;
	}

	function searchElementTarget(searchContent) {
		let searchResult;

		for (let i = 0; i <= UsualTasks.length - 1; ++i) {
			if (Object.values(UsualTasks[i])[0] == searchContent) {
				console.log('🔎 поиск:' + i);

				searchResult = i;
				return searchResult;
			}
		}

		return searchResult;
	}

	function createTodoItem(arrayOfTasks, i) {
		console.log(arrayOfTasks);

		let item = document.createElement('li');

		let buttonGroup = document.createElement('div');
		let doneBtn = document.createElement('button');
		let deleteBtn = document.createElement('button');

		item.classList.add(
			'list-group-item',
			'd-flex',
			'justify-content-between',
			'align-item-center',
			'class' + `${i}`
		);

		let name = arrayOfTasks[0];
		console.log(name);

		item.textContent = name;

		buttonGroup.classList.add('btn-group', 'btn-group-sm');
		doneBtn.classList.add('btn', 'btn-success');
		doneBtn.textContent = 'готово!';
		deleteBtn.classList.add('btn', 'btn-danger');
		deleteBtn.textContent = 'удалить';

		buttonGroup.append(doneBtn);
		buttonGroup.append(deleteBtn);
		item.append(buttonGroup);
		console.log('⭐️');

		return {
			item,
			doneBtn,
			deleteBtn,
		};
	}

	function addBtns(todoItem, UsualTasks, todoList) {
		let searchContent = searchTargetList(todoItem);
		todoItem.deleteBtn.addEventListener('click', function () {
			UsualTasks = getUsualTasks();
			if (confirm('уверены?')) {
				console.log(UsualTasks);
				let n = searchElementTarget(searchContent);
				UsualTasks.splice(searchElementTarget(searchContent), 1);
				updateClassNumber(n);
				pushLocalStorage(UsualTasks);

				todoItem.item.remove();
			}
		});
		todoItem.doneBtn.addEventListener('click', function () {
			console.log('Подтвердил!✅');
			UsualTasks = getUsualTasks();

			UsualTasks[searchElementTarget(searchContent)].done =
				!UsualTasks[searchElementTarget(searchContent)].done;

			pushLocalStorage(UsualTasks);
			statusCheck(todoItem, UsualTasks);
		});
	}

	function statusCheck(todoItem, UsualTasks) {
		console.log(' 👁 Проверка статусов ');

		UsualTasks = JSON.parse(localStorage.getItem(localId));

		for (let i = 0; i < UsualTasks.length; ++i) {
			console.log(i);
			let numcl = '.class' + i;

			console.log(numcl);

			let targetSelect = document.querySelector(numcl);

			if (UsualTasks[i].done === true) {
				console.log('🎯');
				console.log(targetSelect);
				targetSelect.classList.add('list-group-item-success');
			} else {
				targetSelect.classList.remove('list-group-item-success');
			}
		}
	}
	function getUsualTasks() {
		console.log('get!!!!');
		UsualTasks = JSON.parse(localStorage.getItem(localId));
		console.log(UsualTasks);
		return UsualTasks;
	}

	function updateClassNumber(n) {
		UsualTasks = getUsualTasks();
		for (let i = n; i < UsualTasks.length; ++i) {
			console.log(n + 'минус 1');
			let item = document.querySelector(`.class${i}`);
			console.log(item);

			item.classList.remove(`class${i}`);
			item.classList.add(`class${i - 1}`);
		}
	}
	function renameTitle() {
		renameBtn = document.querySelector('.rename-btn');
		appTitle = document.querySelector('.title-h2');
		containerTitle = document.querySelector('.title-container');
		console.log(renameBtn);
		renameBtn.addEventListener('click', function () {
			console.log('Клик RENAME');

			let newForm = document.createElement('form');
			let newTitleInput = document.createElement('input');
			let newBtn = document.createElement('button');

			newTitleInput.classList.add('new-input');
			newBtn.classList.add('new-btn');

			appTitle.remove();
			appendToWhats(newForm, newTitleInput, newBtn);
			appendToWhats(containerTitle, newForm);
			renameBtn.setAttribute('disabled', 'true');
			containerTitle.classList.add('title-container--active');
			newBtn.textContent = '✅ Готово';

			newForm.addEventListener('submit', function () {
				console.log(newTitleInput.value);
				let nameKey = 'title-' + localId;
				localStorage.setItem(nameKey, JSON.stringify(newTitleInput.value));
			});
		});
	}
	function listStatusCheck(numLists) {
		let indexs = document.querySelectorAll('.index-li');
		for (let i = 0; i < indexs.length; ++i) {
			for (let n = 0; n < numLists.length; ++n)
				if (indexs[i].classList.contains(`index-li--${numLists[n]}`)) {
					indexs[i].classList.remove('hide-none');
				}
		}
		listRename();
	}
	function listRename() {
		let indexs = document.querySelectorAll('.index-li');
		let buf = 0;
		console.log('ренайм');
		for (let i = 0; i < indexs.length; i++) {
			if (indexs[i].classList.contains('hide-none')) {
				buf++;
			}

			indexs[i].childNodes[1].textContent = `!Список дел №${i - buf + 1}`;
		}
	}
	function deleteList() {
		let delListBtn = document.querySelectorAll('.delete-btn');
		for (let i = 1; i < delListBtn.length; ++i) {
			delListBtn[i].addEventListener('click', function () {
				delListBtn[i].parentNode.classList.add('hide-none');

				if (i > numLists.length - 1) {
					numLists.splice(numLists.length - 1, 1);
				}

				numLists.splice(i, 1);
				localStorage.setItem('lists', JSON.stringify(numLists));

				localStorage.setItem(`id${i + 1}`, JSON.stringify([]));
				listRename();
				window.location.replace('index.html');
			});
		}
	}
	function addList(plusBtn, numLists) {
		let indexs = document.querySelectorAll('.index-li');
		console.log('+');
		plusBtn.addEventListener('click', function () {
			for (let i = 0; i < indexs.length; ++i) {
				if (indexs[i].classList.contains('hide-none')) {
					numLists.push(i);
					numLists.sort(function (a, b) {
						return a - b;
					});
					localStorage.setItem('lists', JSON.stringify(numLists));
					listStatusCheck(numLists);
					return;
				}
			}
		});
	}

	// }

	//
}
