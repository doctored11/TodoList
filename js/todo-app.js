{
  // глобальная видимость

  window.createTodoApp = createTodoApp;
  window.UsualTasks = JSON.parse(localStorage.getItem('UsualyTasks')) || [
    { name: 'дело раз', done: false },
    { name: 'дикобраз', done: false },
    { name: '😳🦖', done: false },
    { name: 'rrr1', done: false },
    { name: 'rrr2', done: false },
    { name: 'rrr3', done: false },
  ];
  // localStorage.setItem('UsualyTasks', JSON.stringify(UsualTasks));

  // cписок дел

  //-

  // основная вызываемая функция
  function createTodoApp(container, title, UsualTasks) {
    let appTitle = createAppTitle(title);
    let itemForm = createTodoItemForm();
    let todoList = createTodoList();
    console.log(UsualTasks);

    appendToWhats(container, appTitle, itemForm.form, todoList);
    checkStarterArray(UsualTasks, todoList);
    pushNew(itemForm, todoList, UsualTasks);
    statusCheck(0, UsualTasks);
  }

  // -

  //
  //
  //
  // вспомогательные функции и методы -->
  //
  //
  //
  function appendToWhats(To, what1, what2, what3) {
    To.append(what1);
    To.append(what2);
    To.append(what3);
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
      el.preventDefault();

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

    addBtns(todoItem, UsualTasks);
    todoList.append(todoItem.item);

    return todoItem;
  }

  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
  }
  function pushLocalStorage(UsualTasks) {
    console.log('Local');
    localStorage.setItem('UsualyTasks', JSON.stringify(UsualTasks));

    // statusCheck(0, UsualTasks);
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.textContent = title;
    return appTitle;
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
        console.log('🔎 поиск:' + searchContent);

        searchResult = i;
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

  function addBtns(todoItem, UsualTasks) {
    let searchContent = searchTargetList(todoItem);
    todoItem.deleteBtn.addEventListener('click', function () {
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
      console.log(UsualTasks[searchElementTarget(searchContent)]);

      UsualTasks[searchElementTarget(searchContent)].done =
        !UsualTasks[searchElementTarget(searchContent)].done;
      console.log(UsualTasks[searchElementTarget(searchContent)]);
      pushLocalStorage(UsualTasks);
      statusCheck(todoItem, UsualTasks);
      // statusCheck(todoItem, UsualTasks);
    });
  }

  function statusCheck(todoItem, UsualTasks) {
    console.log(' 👁 Проверка статусов ');
    // UsualTasks = JSON.parse(localStorage.getItem('UsualyTasks'));

    UsualTasks = JSON.parse(localStorage.getItem('UsualyTasks'));
    console.log(UsualTasks.length);
    for (let i = 0; i < UsualTasks.length; ++i) {
      // console.log(UsualTasks[i], UsualTasks[i].done);

      console.log(i);
      let numcl = '.class' + i;

      console.log(numcl);

      console.log('💎');
      console.log(UsualTasks.length);
      let targetSelect = document.querySelector(numcl);

      if (UsualTasks[i].done === true) {
        console.log('💎🤘');
        console.log(targetSelect);
        targetSelect.classList.add('list-group-item-success');
      } else {
        targetSelect.classList.remove('list-group-item-success');
      }
    }
  }

  function updateClassNumber(n) {
    for (let i = n; i <= UsualTasks.length; ++i) {
      console.log(n + 'минус 1');
      let item = document.querySelector(`.class${i}`);

      item.classList.remove(`class${i}`);
      item.classList.add(`class${i - 1}`);
    }
  }

  //
}
