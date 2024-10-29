/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
// Initialization
const [todos, setTodos] = useState([]);
const [headingInput, setHeadingInput] = useState('');
const [listInputs, setListInputs] = useState({});

// Set the handleAddTodo to assign arrays and objects to the newly created heading list
const handleAddTodo = () => {
  if (headingInput.trim() !== '') {
    setTodos([...todos, {heading: headingInput, lists: []}]);
    setHeadingInput('');
  }
};

// Function to handle adding the list item to the list
const handleAddList = (index) => {
  if (listInputs[index] && listInputs[index].trim() !== '') {
    const newTodos = [...todos]
    newTodos[index].lists.push(listInputs[index]);
    setTodos(newTodos);
    setListInputs({...listInputs, [index]: ''})
  }
};

// This is a routine task of reflecting input back to the user to ensure detection
const handleListInputChange = (index, value) => {
  setListInputs({...listInputs, [index]: value });
};

// The deletion functions
const handleDeleteTodo = (index) => {
  const newTodos = [...todos];
  newTodos.splice(index, 1);
  setTodos(newTodos);
};

  return (
    <>
      <div className="todo-container">
        <h1 className="title">My To-do List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            // Add onChange event handler to update headingInput state "live"
            onChange={(e) => {setHeadingInput(e.target.value);}}
            
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        
        {todos.map((todo, index) => (
          <div key={index} className='todo-card'>
            <div className='heading_todo'>
               <h3>{todo.heading}</h3> {/* display the heading here */}
               <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
        </div>
        {/* add the sublist functionality */}
        <div className='add_list'>
          <input
          type='text'
          className='list-input'
          placeholder='Add List'
          value={listInputs[index] || ''} // '' for when the value is reset by the setListInput hook
          // This ensures that the input change is captured and is displayed for the user
          onChange={(e) => handleListInputChange(index, e.target.value)} />
          {/* This button handles adding the new list item to the list */}
          <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
        </div>
        
        <ul>
          {todo.lists.map((list, listIndex) => (
            <li key={listIndex} className='todo_inside_list'>
              <p>{list}</p>
            </li>
          ))}
        </ul>

        </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
