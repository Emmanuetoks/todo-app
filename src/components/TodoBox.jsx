const TodoBox = () => {
  return (
    <div className="todo flex" style={{ '--gap': '.5rem' }}>
      <div className="todo__item">
        <input type="text" className="add-todo fs-200" placeholder="Create todo item" />
      </div>

      <div className="todo__list fs-200">
        <div className="todo__item">
          <div className="todo__checkbox">
            <span className="sr-only">checkbox</span>
          </div>
          <p>
            dummy todo
          </p>
        </div>
      </div>

      <footer className="todo__footer flex pos-rel">
        <p className="todo__items-left">
          <span className="todo-option">x-mins-left</span>
        </p>

        <div className="todo__options flex" style={{ '--gap': '1rem' }}>
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
            clear completed
          </span>
        </p>
      </footer>
    </div>
  )
}

export default TodoBox