import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import Card from "../Card/Card";
import AddCard from "../Card/AddCard";
import CardModal from "../CardModal/CardModal";
import API from "../../api/api";
import "./List.css";

function List({ list, onRefresh, dragHandleProps, isDragging }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  async function handleUpdateTitle() {
    if (!title.trim() || title === list.title) {
      setTitle(list.title);
      setIsEditingTitle(false);
      return;
    }

    try {
      await API.put(`/lists/${list.id}`, { title: title.trim() });
      setIsEditingTitle(false);
      onRefresh();
    } catch (error) {
      console.error("Error updating list:", error);
      setTitle(list.title);
    }
  }

  async function handleDeleteList() {
    if (!confirm(`Delete "${list.title}"? All cards in this list will be deleted.`)) return;

    try {
      await API.delete(`/lists/${list.id}`);
      onRefresh();
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }

  async function handleDeleteCard(cardId) {
    try {
      await API.delete(`/cards/${cardId}`);
      onRefresh();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  }

  function handleAddCard() {
    setIsAddingCard(false);
    onRefresh();
  }

  return (
    <div className={`list ${isDragging ? 'list-dragging' : ''}`}>
      <div className="list-header" {...dragHandleProps}>
        {isEditingTitle ? (
          <input
            type="text"
            className="list-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdateTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTitle();
              if (e.key === "Escape") {
                setTitle(list.title);
                setIsEditingTitle(false);
              }
            }}
            autoFocus
          />
        ) : (
          <h3 
            className="list-title"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h3>
        )}
        
        <div className="list-menu">
          <button 
            className="list-menu-btn"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
          {showMenu && (
            <div className="list-menu-dropdown">
              <button onClick={handleDeleteList}>Delete List</button>
            </div>
          )}
        </div>
      </div>

      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <div 
            className={`list-cards ${snapshot.isDraggingOver ? 'list-cards-dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.map((card, index) => (
              <Draggable draggableId={card.id} index={index} key={card.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card 
                      card={card} 
                      isDragging={snapshot.isDragging}
                      onEdit={() => setSelectedCard(card)}
                      onDelete={handleDeleteCard}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      
      {isAddingCard ? (
        <AddCard 
          listId={list.id} 
          onAdd={handleAddCard}
          onCancel={() => setIsAddingCard(false)}
        />
      ) : (
        <button 
          className="add-card-btn"
          onClick={() => setIsAddingCard(true)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          Add a card
        </button>
      )}

      {selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={onRefresh}
        />
      )}
    </div>
  );
}

export default List;
