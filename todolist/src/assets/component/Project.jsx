import React, { useState } from "react";

function Project() {
  const [data, setData] = useState("");
  const [data1, setData1] = useState([]);

  const txt = (e) => {
    setData(e.target.value);
  };

  const add = () => {
    if (data) {
      setData1([...data1, data]);
      setData("");
    }
  };
  const complete = (e) => {
    const textSpan = e.target.parentElement.querySelector("span");
    if (textSpan) {
      textSpan.style.color = "red";
      textSpan.style.textDecoration = "line-through";
    }
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
            onChange={txt}
          />
          <button onClick={add}>Add</button>
        </div>
        <div className="content">
          <ol>
            {data1.map((val, index) => (
              <li key={index}>
                <span>{val}</span>
                <button
                  key={index}
                  onClick={(e) => {
                    e.target.parentElement.remove();
                  }}
                >
                  Delete
                </button>
                <button onClick={complete}>Complete</button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Project;
