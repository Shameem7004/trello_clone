import { useState } from "react";
import "./Card.css";

function Card({ card, isDragging, onEdit, onDelete }) {
  const [isHovering, setIsHovering] = useState(false);

  // Format due date
  const formatDueDate = (dueDate) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (date.getTime() < today.getTime()) {
      return { text: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), status: "overdue" };
    } else if (date.getTime() === today.getTime()) {
      return { text: "Today", status: "today" };
    } else {
      return { text: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }), status: "upcoming" };
    }
  };

  const dueDate = formatDueDate(card.due_date);
  const checklistProgress = card.checklist_items ? `${card.completed_items || 0}/${card.checklist_items}` : null;

  return (
    <div
      className={`card ${isDragging ? "card-dragging" : ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => onEdit && onEdit(card)}
    >
      {/* Card Cover Image */}
      {card.cover_image && <div className="card-cover" style={{ backgroundImage: `url(${card.cover_image})` }} />}

      {/* Card Content */}
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        {card.description && <p className="card-description">{card.description}</p>}
      </div>

      {/* Labels and Due Date */}
      {(card.labels?.length > 0 || dueDate || card.members?.length > 0) && (
        <div className="card-badges">
          {card.labels &&
            card.labels.map((label) => (
              <span
                key={label.id}
                className="card-label"
                style={{ backgroundColor: label.color + "40", color: label.color }}
                title={label.name}
              >
                {label.name}
              </span>
            ))}

          {dueDate && (
            <span className={`card-due-date ${dueDate.status}`} title={`Due: ${dueDate.text}`}>
              📅 {dueDate.text}
            </span>
          )}

          {card.members && card.members.length > 0 && (
            <div className="card-member-avatars">
              {card.members.slice(0, 3).map((member) => (
                <div
                  key={member.id}
                  className="card-member-avatar"
                  title={member.name}
                  style={{ backgroundColor: member.avatar_color || "#091e4224" }}
                >
                  {member.name.charAt(0).toUpperCase()}
                </div>
              ))}
              {card.members.length > 3 && (
                <div className="card-member-avatar" title={`+${card.members.length - 3} more`}>
                  +{card.members.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Card Icons/Stats */}
      {(checklistProgress || card.attachment_count > 0 || card.comment_count > 0) && (
        <div className="card-icons">
          {checklistProgress && <span className="card-icon">☑️ {checklistProgress}</span>}
          {card.attachment_count > 0 && <span className="card-icon">📎 {card.attachment_count}</span>}
          {card.comment_count > 0 && <span className="card-icon">💬 {card.comment_count}</span>}
        </div>
      )}

      {/* Delete Button on Hover */}
      {isHovering && (
        <div className="card-footer">
          <span></span>
          <button
            className="card-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete && onDelete(card.id);
            }}
            title="Delete card"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Card;
