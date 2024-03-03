import React, { useState } from "react";
import { List, Page, Icon, useNavigate, Input, Box, Button } from "zmp-ui";
import { useRecoilState, useRecoilValue } from "recoil";
import { userInfo } from "zmp-sdk";
import { charCountStore, inputStore, todoList, userState,type todo } from "../state";
import { v4 as uuidv4 } from 'uuid';
import UserCard from "../components/user-card";
const HomePage: React.FunctionComponent = () => {
  const user = useRecoilValue<userInfo>(userState);
  const listTodo= useRecoilValue<todo[]>(todoList)
  const count = useRecoilValue(charCountStore);
  const inputValue = useRecoilValue(inputStore);
  const [text, setText] = useRecoilState(inputStore);
  const [todos, setTodos] = useRecoilState(todoList);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedIsComplete, setEditedIsComplete] = useState<boolean>(false);

  const handleChange = (event) => {
    setText(event.target.value);
  };
const addToTodoList=()=>{
  const newTodo = {
    id: uuidv4(), // Generate unique id
    title: text,
    isComplete: false
  };
// Update the todoList state with the new todo
setTodos([...todos, newTodo]);

// Clear the input field after adding todo
setText('');
}
const deleteFromTodos = (id:string)=>{
  // Filter out the todo with the specified ID
  const updatedTodos = todos.filter(todo => todo.id !== id);
  // Update the todoList state with the filtered todos
  setTodos(updatedTodos);
}

const editTodo = (id: string) => {
  // Find the todo with the specified ID
  const todoToEdit = todos.find(todo => todo.id === id);
  if (todoToEdit) {
    // Set the initial values for editing
    setEditedTitle(todoToEdit.title);
    setEditedIsComplete(todoToEdit.isComplete);
    // Set the editing state to the todo's ID
    setEditingTodoId(id);
  }
};
const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEditedTitle(event.target.value);
};

const handleIsCompleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEditedIsComplete(event.target.checked);
};

const saveTodo = () => {
  if (editingTodoId) {
    // Update the todo with the edited values
    const updatedTodos = todos.map(todo => {
      if (todo.id === editingTodoId) {
        return {
          ...todo,
          title: editedTitle,
          isComplete: editedIsComplete
        };
      }
      return todo;
    });
    // Update the todoList state with the edited todo
    setTodos(updatedTodos);
    // Reset editing state
    setEditingTodoId(null);
    // Alert success
    console.log('Todo edited successfully');
  }
};
  const navigate = useNavigate();
  return (
    <Page className="page">
      <div className="flex" >
        <Box >
          <Input  value={inputValue} onChange={handleChange}></Input>
         
        </Box>
        <Box ml={4}>
          <Box className="p-2">
            <Button onClick={addToTodoList} fullWidth type="highlight">
              Add
            </Button>
          </Box>
        </Box>
      </div>

      <h2>Todo List</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <input type="text" value={editedTitle} onChange={handleTitleChange} />
                <input type="checkbox" checked={editedIsComplete} onChange={handleIsCompleteChange} />
                <Button onClick={saveTodo}>Save</Button>
                <Button onClick={()=>deleteFromTodos(todo.id)} >Delete</Button>
              </div>
            ) : (
              <div>
                <span>{todo.title}</span>
                <p>{todo.isComplete ? 'Completed' : 'Incomplete'}</p>
                <Button onClick={() => editTodo(todo.id)}>Edit</Button>
                <Button onClick={()=>deleteFromTodos(todo.id)} >Delete</Button>
              </div>
            )}
          </li>
        ))}
      </ul>

    </Page>
  );
};

export default HomePage;
