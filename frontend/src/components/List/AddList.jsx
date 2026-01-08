import { useState } from "react";
import API from "../../api/api";
import "./AddList.css";

function AddList({ boardId, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd() {
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await API.post("/lists", {
        title: title.trim(),
        boardId
      });
      onAdd(res.data);
      setTitle("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding list:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    } else if (e.key === "Escape") {
      setIsAdding(false);
      setTitle("");
    }
  }

  if (!isAdding) {
    return (
      <button className="add-list-btn" onClick={() => setIsAdding(true)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
        Add another list
      </button>
    );
  }

  return (
    <div className="add-list-form">
      <input
        type="text"
        className="add-list-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter list title..."
        autoFocus
      />
      <div className="add-list-actions">
        <button 
          className="add-list-submit" 
          onClick={handleAdd}
          disabled={!title.trim() || isSubmitting}
        >
          Add list
        </button>
        <button 
          className="add-list-cancel" 
          onClick={() => {
            setIsAdding(false);
            setTitle("");
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AddList;
