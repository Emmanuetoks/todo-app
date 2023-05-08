const CheckBox = () => {
  const makeCheckBackground = (e) => {
    e.target.classList.toggle('checkbox--checked');
    const todoItem = e.target.nextSibling;

    if (todoItem.id != 'inputBox') {
      if (todoItem.classList.contains('completed')) {
        todoItem.classList.remove('completed')
      } else {
        todoItem.classList.add('completed')
      }
    }
  }
  return (
    <div onClick={makeCheckBackground} className="todo__checkbox pos-rel">
      <span className="sr-only">checkbox</span>
    </div>
  )
}

const TodoItem = ({ todoName }) => {
  return (
    <div className={`todo__item fs-200 flex`} style={{ '--gap': '1rem' }}>
      <CheckBox />
      <p>{todoName}</p>

      <button className="todo__delete-button">
        <span className="sr-only">Delete Button</span>
      </button>
    </div>
  )
}

const TodoBox = () => {
  return (
    <div className="todo flex" style={{ '--gap': '.5rem' }}>
      <div className="todo__item flex">
        <CheckBox />
        <input id="inputBox" type="text" className="add-todo fs-200" placeholder="Create todo item" />
      </div>

      <div className="todo__list flex-col border-radius-5px" style={{ '--gap': '1px' }}>
        <TodoItem todoName={'type hello world'} />

        <footer className="todo__footer flex pos-rel">
          <p className="todo__items-left">
            <span className="todo-option">x-mins-left</span>
          </p>

          <div className="todo__options fw-400 border-radius-5px flex" style={{ '--gap': '1rem' }}>
            <span role="button" className="todo__option">
              All
            </span>

            <span role="button" className="todo__option">
              Active
            </span>

            <span role="button" className="todo__option">
              Completed
            </span>
          </div>


          <p>
            <span className="todo__option">
              Clear Completed
            </span>
          </p>
        </footer>
      </div>


    </div>
  )
}

export default TodoBox