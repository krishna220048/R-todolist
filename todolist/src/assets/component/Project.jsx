import React, { useEffect, useState } from "react";
import axios from "axios";

function Project() {
  const [data, setData] = useState("");
  const [data1, setData1] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const API = "https://mern-todolist-2-06kb.onrender.com"

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API);
    setData1(res.data);
  };

  const add = async () => {
    if (!data) return;
    await axios.post(API, { title: data });
    setData("");
    fetchTodos();
  };

  const del = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTodos();
  };

  const complete = async (todo) => {
    await axios.put(`${API}/${todo._id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const startEdit = (todo) => {
    setEditId(todo._id);
    setEditText(todo.title);
  };

  const update = async () => {
    await axios.put(`${API}/${editId}`, {
      title: editText,
    });
    setEditId(null);
    setEditText("");
    fetchTodos();
  };

  return (
    <>
      <h1 style={{ color: "white" }}>TO DO LIST</h1>

      <div className="main">
        <div className="main1">
          <input
            type="text"
            placeholder="Enter the text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button onClick={add}>Add</button>
        </div>

        <div className="content">
          <ol>
            {data1.map((todo) => (
              <li key={todo._id}>
                {editId === todo._id ? (
                  <>
                    <input
                      className="edit"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={update}>Update</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span>{todo.title}</span>

                    <button onClick={() => del(todo._id)}>Delete</button>

                    <button onClick={() => startEdit(todo)}>Edit</button>
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Project;
