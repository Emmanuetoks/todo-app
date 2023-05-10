import { useEffect, useState } from "react";

const CheckBox = ({ userInput, setUserInput, setUserTodoList, userTodoList, setItemCont }) => {
  let [todoIndex, setTodoIndex] = useState(0)
  // Handle Checkbox functionality depending on wehter its parent is the input section or a todoItem
  const makeCheckBackground = (e) => {
    e.target.classList.toggle('checkbox--checked');
    const todoItem = e.target.nextSibling;
    if (todoItem.id != 'inputBox') {
      if (todoItem.classList.contains('completed')) {
        todoItem.classList.remove('completed')
        todoItem.parentElement.classList.remove('ready-to-be-cleared')

      } else {
        todoItem.parentElement.classList.add('ready-to-be-cleared')
        todoItem.classList.add('completed')
      }
    } else if (todoItem.id == 'inputBox') {
      if (userInput != '') {
        setUserTodoList((prevValue) => {
          // console.log('came here');
          return [...prevValue, { id: todoIndex, content: userInput }]
        })

        setUserInput('')
        setTodoIndex((prevValue) => {
          return prevValue + 1
        })
        setItemCont(userTodoList.length + 1)
      }
    }

  }
  return (
    <div onClick={makeCheckBackground} className="todo__checkbox pos-rel">
      <span className="sr-only">checkbox</span>
    </div>
  )
}

const TodoItem = ({ todoName, todoId, userTodoList, setUserTodoList, setItemCont }) => {
  const removeTodoItem = (e) => {
    e.target.classList.add('hide-todo-item')
  }


  // Delete A particular todo Item
  const deleteTodoItem = (e) => {
    const itemToDelete = e.target.parentElement
    let newTodoList = []
    let trackCount = userTodoList.length;
    itemToDelete.style.animationPlayState = 'running'
    // loop throughState managed array and check each elements id to return all elements that isnt the selected todoItem
    userTodoList.forEach((todoItem) => {
      if (Number(itemToDelete.id) != todoItem.id) {
        newTodoList.push(todoItem)
      } else {
        trackCount--
        setItemCont(trackCount)
      }
    });

    setTimeout(() => {
      setUserTodoList(newTodoList)
    }, 300)


  }
  return (
    <div onAnimationEnd={removeTodoItem} id={todoId} className={`todo__item fs-200 flex`} style={{ '--gap': '1rem' }}>
      <CheckBox />
      <p>{todoName}</p>
      <button onClick={deleteTodoItem} className="todo__delete-button">
        <span className="sr-only">Delete Button</span>
      </button>
    </div>
  )
}

const TodoBox = () => {
  let [userInput, setUserInput] = useState('');
  let [userTodoList, setUserTodoList] = useState([])
  let [itemCount, setItemCont] = useState(0)
  // change item count to the number of todo items bt default
  useEffect(() => {
    setItemCont(userTodoList.length)
  }, [])


  // Form Control Callbak Function
  const handleInputChange = (e) => {
    const inputCheckBox = e.target.previousSibling;
    if (inputCheckBox.classList.contains('checkbox--checked')) {
      inputCheckBox.classList.remove('checkbox--checked')
    }
    setUserInput(e.target.value)
  }

  // Utiltiy Function to get all the Todo List Items
  const getTodoList = () => {
    return document.querySelectorAll('.todo__list .todo__item')
  }


  // Make a selected option have a clor of blue
  const highlightOption = (element) => {
    let todoOptions = document.querySelectorAll('.todo__options .todo__option');
    todoOptions.forEach((item) => {
      if (item.classList.contains('option-clicked')) {
        item.classList.remove('option-clicked')
      }
    });

    element.target.classList.add('option-clicked');
  }

  // Clear all completed Todo Function
  const clearCompletedTodos = () => {
    const newTodoList = [];
    let trackCount = userTodoList.length;
    let todoList = getTodoList();
    userTodoList.forEach((todoItem, key) => {
      if (todoList[key].classList.contains('ready-to-be-cleared') === false) {
        newTodoList.push(todoItem)
      } else {
        trackCount--
      }
    })
    setUserTodoList(newTodoList)
    setItemCont(trackCount)
  }


  // Display Only Completed Todos function
  const showCompleted = (e) => {
    highlightOption(e)

    let todoList = getTodoList();
    let trackCount = 0;

    todoList.forEach((todoItem) => {
      if (todoItem.classList.contains('ready-to-be-cleared') === false) {
        todoItem.classList.add('hide-todo-item')
      } else {
        if (todoItem.classList.contains('hide-todo-item')) {
          todoItem.classList.remove('hide-todo-item')
        }
        trackCount++
      }
    })
    if (trackCount === 0) {
      alert('No active tasks')
      todoList.forEach((item) => {
        if (item.classList.contains('hide-todo-item')) {
          item.classList.remove('hide-todo-item')
          trackCount++
        }
      })
    }
    setItemCont(trackCount)
  }

  // Display only items that arent complete
  const showActive = (e) => {
    highlightOption(e)

    let todoList = getTodoList();
    let trackCount = 0;

    todoList.forEach((todoItem) => {
      if (todoItem.classList.contains('ready-to-be-cleared')) {
        todoItem.classList.add('hide-todo-item')
      } else {
        if (todoItem.classList.contains('hide-todo-item')) {
          todoItem.classList.remove('hide-todo-item')
        }
        trackCount++
      }
    })

    if (trackCount === 0) {
      alert('No active tasks')
      todoList.forEach((item) => {
        if (item.classList.contains('hide-todo-item')) {
          item.classList.remove('hide-todo-item')
          trackCount++
        }
      })
    }
    setItemCont(trackCount)
  }

  // Display All the todo list items
  const showAll = (e) => {
    highlightOption(e)
    let todoList = getTodoList();
    let trackCount = 0;

    todoList.forEach((item) => {
      trackCount++
      if (item.classList.contains('hide-todo-item')) {
        item.classList.remove('hide-todo-item')
      }
    })

    setItemCont(trackCount)
  }

  return (
    <div className="todo flex" style={{ '--gap': '.5rem' }}>
      <div className="todo__item flex" style={{ 'borderRadius': '5px' }}>
        <CheckBox setItemCont={setItemCont} userTodoList={userTodoList} setUserTodoList={setUserTodoList} userInput={userInput} setUserInput={setUserInput} />
        <input id="inputBox" type="text" value={userInput} onChange={handleInputChange} className="add-todo fs-200" placeholder="Create todo item" />
      </div>

      <div className="todo__list flex-col border-radius-5px" style={{ '--gap': '1px' }}>
        {/* Loop Through userTodo List to display the users Todo Items */}
        <div className="todo__list-box flex-col" style={{'gap':'1px', 'backgroundColor':'transparent'}}>
          {userTodoList.map((todoItem) => {
            return <TodoItem setItemCont={setItemCont} setUserTodoList={setUserTodoList} userTodoList={userTodoList} key={todoItem.id} todoId={todoItem.id} todoName={todoItem.content} />
          })}
        </div>

        {/* -------------------------------------------------------- */}

        <footer className="todo__footer flex pos-rel">
          <p className="todo__items-left">
            <span className="todo-option">{itemCount + ' '}items left</span>
          </p>
          <div className="todo__options fw-400 border-radius-5px flex" style={{ '--gap': '1rem' }}>
            <span onClick={showAll} role="button" className="todo__option option-clicked">
              All
            </span>

            <span onClick={showActive} role="button" className="todo__option">
              Active
            </span>

            <span onClick={showCompleted} role="button" className="todo__option">
              Completed
            </span>
          </div>
          <p onClick={clearCompletedTodos}>
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