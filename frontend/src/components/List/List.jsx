import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import Card from "../Card/Card";
import AddCard from "../Card/AddCard";
import "./List.css";

function List({ list, onRefresh, dragHandleProps, isDragging }) {
  const [isAddingCard, setIsAddingCard] = useState(false);

  function handleAddCard() {
    setIsAddingCard(false);
    onRefresh();
  }

  return (
    <div className={`list ${isDragging ? 'list-dragging' : ''}`}>
      <div className="list-header" {...dragHandleProps}>
        <h3 className="list-title">{list.title}</h3>
        <button className="list-menu-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
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
                    <Card card={card} isDragging={snapshot.isDragging} />
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
    </div>
  );
}

export default List;
