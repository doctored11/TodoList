{
  // document.addEventListener('DOMContentLoaded', function () {
  //   createTodoApp(document.getElementById('todo-app1'), 'мои дела');
  //   createTodoApp(document.getElementById('todo-app2'), 'мои дела2');
  //   createTodoApp(document.getElementById('todo-app3'), 'мои дела3');
  // });

  //

  //

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
      console.log('1');
      if (!input.value) {
        console.log('2');
        button.setAttribute('disabled', 'true');
      } else {
        console.log('3');
        button.removeAttribute('disabled');
      }
    });

    form.classList.add('input-group', 'mb-3', 'container__form');
    input.classList.add('form-control', 'container__input');
    input.placeholder = 'Запланированное Дело*';
    buttonContainer.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
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

  function createTodoItem(name) {
    let item = document.createElement('li');

    let buttonGroup = document.createElement('div');
    let doneBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-item-center'
    );
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneBtn.classList.add('btn', 'btn-success');
    doneBtn.textContent = 'готово!';
    deleteBtn.classList.add('btn', 'btn-danger');
    deleteBtn.textContent = 'удалить';

    buttonGroup.append(doneBtn);
    buttonGroup.append(deleteBtn);
    item.append(buttonGroup);

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

    itemForm.form.addEventListener('submit', function (el) {
      el.preventDefault();

      if (!itemForm.input.value) {
        return;
      }
      document.querySelector('.btn').setAttribute('disabled', 'true');

      let todoItem = createTodoItem(itemForm.input.value);
      todoItem.deleteBtn.addEventListener('click', function () {
        if (confirm('уверены?')) {
          todoItem.item.remove();
        }
      });
      todoItem.doneBtn.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
      });

      todoList.append(todoItem.item);

      itemForm.input.value = '';
    });
  }
  window.createTodoApp = createTodoApp;
}
