import { useState, useEffect } from "react";
import API from "../../api/api";
import "./CardModal.css";

function CardModal({ card, onClose, onUpdate }) {
  const [title, setTitle] = useState(card.title || "");
  const [description, setDescription] = useState(card.description || "");
  const [dueDate, setDueDate] = useState(card.due_date || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch full card details
    async function fetchCardDetails() {
      try {
        const res = await API.get(`/cards/${card.id}`);
        const cardData = res.data;
        setTitle(cardData.title);
        setDescription(cardData.description || "");
        setDueDate(cardData.due_date || "");
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    }

    fetchCardDetails();
  }, [card.id]);

  async function handleSave() {
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      await API.put(`/cards/${card.id}`, {
        title: title.trim(),
        description: description.trim(),
        due_date: dueDate || null
      });
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this card?")) return;

    setIsLoading(true);
    try {
      await API.delete(`/cards/${card.id}`);
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div className="modal-header-text">
            <input
              type="text"
              className="modal-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Card title"
            />
            <p className="modal-list-name">in list {card.list_title || "List"}</p>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-main">
            {/* Description */}
            <div className="modal-section">
              <div className="modal-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17v2h18v-2H3zM3 5v2h18V5H3zm0 6h18v-2H3v2z"/>
                </svg>
                <h3>Description</h3>
              </div>
              <textarea
                className="modal-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a more detailed description..."
                rows={5}
              />
            </div>

            {/* Due Date */}
            <div className="modal-section">
              <div className="modal-section-header">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                </svg>
                <h3>Due Date</h3>
              </div>
              <input
                type="date"
                className="modal-date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="modal-sidebar">
            <h4>Add to card</h4>
            <button className="modal-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
              </svg>
              Members
            </button>
            <button className="modal-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
              </svg>
              Labels
            </button>
            <button className="modal-action-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 7h-9v2h9V7zm0 8h-9v2h9v-2zM5.54 11L2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 11zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L5.54 19z"/>
              </svg>
              Checklist
            </button>

            <h4 className="modal-actions-title">Actions</h4>
            <button className="modal-action-btn" onClick={handleDelete} disabled={isLoading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
              Delete
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-save-btn" onClick={handleSave} disabled={isLoading || !title.trim()}>
            {isLoading ? "Saving..." : "Save"}
          </button>
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;