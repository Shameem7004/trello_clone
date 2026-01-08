import { useState } from "react";
import API from "../../api/api";
import "./AddCard.css";

function AddCard({ listId, onAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAdd() {
    if (!title.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await API.post("/cards", {
        title: title.trim(),
        listId
      });
      onAdd(res.data);
      setTitle("");
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    } else if (e.key === "Escape") {
      onCancel();
    }
  }

  return (
    <div className="add-card-form">
      <textarea
        className="add-card-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a title for this card..."
        autoFocus
        rows={3}
      />
      <div className="add-card-actions">
        <button 
          className="add-card-submit" 
          onClick={handleAdd}
          disabled={!title.trim() || isSubmitting}
        >
          Add card
        </button>
        <button className="add-card-cancel" onClick={onCancel}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default AddCard;
