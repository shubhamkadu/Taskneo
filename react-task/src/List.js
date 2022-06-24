import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function List({ items, removeItem, editItem }) {
  console.log(items);
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, name, age, source, set, detail } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{name}</p>
            <p className="title">{age}</p>
            <p className="title">{source}</p>
            <p className="title">{set}</p>
            <p className="title">{detail}</p>

            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
