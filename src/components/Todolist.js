import React, { useState, useEffect } from 'react';
import "./Todolist.css";
import axios from 'axios';

function TodoList() {
  const [items, setItems] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/tasks/${userId}`);
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [userId]);

  const handleAddItem = async () => {
    if (!task) return;

    try {
      await axios.post('http://localhost:3001/api/add-task', {
        description: task,
        priority: priority,
        userId: userId,
      });
      setItems([...items, { description: task, priority: priority, id: Date.now() }]);
      setTask('');
      setPriority('medium');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setEditTask(items[index].description);
    setEditPriority(items[index].priority);
  };

  const handleUpdateItem = async () => {
    const updatedItem = {
      description: editTask,
      priority: editPriority,
    };

    try {
      await axios.put(`http://localhost:3001/api/tasks/${items[editingIndex].id}`, updatedItem);
      const updatedItems = items.map((item, index) =>
        index === editingIndex
          ? { ...item, description: editTask, priority: editPriority }
          : item
      );
      setItems(updatedItems);
      setEditingIndex(null);
      setEditTask('');
      setEditPriority('medium');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="add-item">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task Description"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className="todo-list">
        {filteredItems.map((item, index) => (
          <li key={item.id} className={`todo-item ${item.priority}`}>
            <span>{item.description}</span>
            <span className={`priority ${item.priority}`}>{item.priority}</span>
            <button onClick={() => handleEditItem(index)}>Edit</button>
            <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingIndex !== null && (
        <div className="edit-item">
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button onClick={handleUpdateItem}>Update Item</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;
