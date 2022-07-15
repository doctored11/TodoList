{
  // начальная сцена
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

    form.classList.add('input-group', 'container__form');
    input.classList.add('form-control');
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

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }
  // end

  function createTodoItem(arrayOfTasks, state) {
    console.log('😡');
    console.log(arrayOfTasks);

    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    item.classList.add('list-group-item');

    let name = arrayOfTasks[0];
    console.log(name);

    item.textContent = name;

    buttonGroup.classList.add('btn-group');
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

  function createTodoApp(container, title) {
    let appTitle = createAppTitle(title);
    let itemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(appTitle);
    container.append(itemForm.form);
    container.append(todoList);
    if (UsualTasks.length > 0) {
      console.log('отрисовка списка');
      let state = 'first';
      for (let i = 0; i <= UsualTasks.length - 1; ++i) {
        console.log(Object.values(UsualTasks[i]));
        let todoItem = createTodoItem(Object.values(UsualTasks[i]));
        console.log('🤡');
        console.log(todoItem);

        paintList(todoItem);
      }
      console.log('/////');
    }

    itemForm.form.addEventListener('submit', function (el) {
      el.preventDefault();

      if (!itemForm.input.value) {
        return;
      }
      UsualTasks.push({ name: itemForm.input.value, done: false });
      console.log(UsualTasks);

      document.querySelector('.btn').setAttribute('disabled', 'true');

      let todoItem = createTodoItem(Object.values(UsualTasks[UsualTasks.length - 1]));
      addBtns(todoItem);

      todoList.append(todoItem.item);

      itemForm.input.value = '';
    });

    function paintList(todoItem) {
      addBtns(todoItem);
      todoList.append(todoItem.item);
    }
    function addBtns(todoItem) {
      todoItem.deleteBtn.addEventListener('click', function () {
        let taskContent = [];
        for (let i = 0; i <= todoItem.item.textContent.length - 15; i++) {
          taskContent.push(Object.values(todoItem.item.textContent[i]).join(''));
        }
        taskContent = Object.values(taskContent);

        let searchContent = taskContent.join('');

        if (confirm('уверены?')) {
          for (let i = 0; i <= UsualTasks.length - 1; ++i) {
            if (Object.values(UsualTasks[i])[0].includes(searchContent)) {
              UsualTasks.splice(i, 1);
            }
          }
          console.log(UsualTasks);
          todoItem.item.remove();
        }
      });
      todoItem.doneBtn.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
      });
    }
  }

  window.createTodoApp = createTodoApp;
  // cписок дел
  let UsualTasks = [
    { name: 'Проснуться', done: false },
    { name: 'Помыть попу', done: false },
    { name: 'Почистить зубы', done: false },
    { name: 'Поесть', done: false },
    { name: 'Поучиться 🤡', done: false },
    { name: 'и спать....', done: false },
  ];
}
