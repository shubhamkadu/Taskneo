import React, { useState, useEffect } from "react";
import List from "./List";
import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [person, setPerson] = useState({
    name: "",
    age: "",
    source: "",
    set: "",
    detail: "",
  });
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !(
        person.name ||
        person.age ||
        person.source ||
        person.set ||
        person.detail
      )
    ) {
    } else if (
      person.name &&
      person.age &&
      person.source &&
      person.set &&
      person.detail &&
      isEditing
    ) {
      const newlist = list.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name: person.name,
            age: person.age,
            source: person.source,
            set: person.set,
            detail: person.detail,
          };
        }
        console.log(item);
        return item;
      });
      setList(newlist);
      setPerson({
        name: "",
        age: "",
        source: "",
        set: "",
        detail: "",
      });
      setIsEditing(false);
      setEditId(null);
      setOpen(false);
    } else {
      const newItem = {
        ...person,
        id: new Date().getTime().toString(),
        name: person.name,
        age: person.age,
        source: person.source,
        set: person.set,
        detail: person.detail,
      };
      setList([...list, newItem]);
      setPerson({
        name: "",
        age: "",
        source: "",
        set: "",
        detail: "",
      });
    }
  };
  console.log(list);

  const clearList = () => {
    setList([]);
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setPerson(specificItem);
    setOpen(true);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <div>
      <div className="button">
        <button className="submit-btn1">prospect set</button>
        <button className="submit-btn1">email template</button>
        <button className="submit-btn1">Trigger Event</button>
        <button className="submit-btn1">campaign</button>
      </div>
      <section className="section-center">
        <h3> Add Prospect Set</h3>
        {open && (
          <form className="grocery-form" onSubmit={handleSubmit}>
            <div className="form-control">
              <button className="clear-btn" onClick={() => setOpen(!open)}>
                close
              </button>
              <input
                type="text"
                className="grocery"
                placeholder="Name"
                id="name"
                name="name"
                value={person.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="grocery"
                placeholder="Age"
                id="age"
                name="age"
                value={person.age}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="grocery"
                placeholder="set"
                id="set"
                name="set"
                value={person.set}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="grocery"
                placeholder="source"
                id="source"
                name="source"
                value={person.source}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="grocery"
                placeholder="detail"
                id="detail"
                name="detail"
                value={person.detail}
                onChange={handleChange}
                required
              />
              <button type="submit" className="submit-btn">
                {isEditing ? "edit" : "Add Prospect Set"}
              </button>
            </div>
          </form>
        )}
        {list.length > 0 && (
          <div className="grocery-container">
            <div className="grocery-item" v>
              <p>name</p>
              <p>age</p>
              <p>set</p>
              <p>source</p>
              <p>detail</p>
              <p></p>
            </div>
            <List items={list} removeItem={removeItem} editItem={editItem} />

            <button className="clear-btn" onClick={clearList}>
              clear item
            </button>
          </div>
        )}
        <button className="clear-btn" onClick={() => setOpen(!open)}>
          Add Prospect Set
        </button>
      </section>
    </div>
  );
}

export default App;
