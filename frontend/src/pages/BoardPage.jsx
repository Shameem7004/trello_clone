import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import API from "../api/api";
import List from "../components/List/List";
import AddList from "../components/List/AddList";
import SearchBar from "../components/SearchBar/SearchBar";
import "./BoardPage.css";

function BoardPage() {
  const [lists, setLists] = useState([]);
  const [boardTitle, setBoardTitle] = useState("Sample Project Board");
  const [searchQuery, setSearchQuery] = useState("");
  const [isStarred, setIsStarred] = useState(false);
  const boardId = "16c6b2e9-e11a-442c-a454-52df4762c124";

  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const res = await API.get(`/boards/${boardId}`);
      const normalized = normalizeData(res.data);
      setLists(normalized);
      if (res.data.length > 0 && res.data[0].board_title) {
        setBoardTitle(res.data[0].board_title);
      }
    } catch (error) {
      console.error("Error fetching board:", error);
    }
  }

  function normalizeData(rows) {
    const map = {};
    rows.forEach(r => {
      if (!r.list_id) return;
      if (!map[r.list_id]) {
        map[r.list_id] = { 
          id: r.list_id, 
          title: r.list_title,
          position: r.list_position || 0,
          cards: [] 
        };
      }
      if (r.card_id) {
        map[r.list_id].cards.push({ 
          id: r.card_id, 
          title: r.card_title,
          description: r.card_description,
          position: r.card_position || 0
        });
      }
    });
    
    const listsArray = Object.values(map);
    // Sort lists by position
    listsArray.sort((a, b) => a.position - b.position);
    // Sort cards within each list
    listsArray.forEach(list => {
      list.cards.sort((a, b) => a.position - b.position);
    });
    
    return listsArray;
  }

  function handleAddList(newList) {
    setLists([...lists, { ...newList, cards: [] }]);
  }

  async function onDragEnd(result) {
    const { source, destination, draggableId, type } = result;
    
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    // Handle list reordering
    if (type === "LIST") {
      const newLists = Array.from(lists);
      const [movedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, movedList);
      
      setLists(newLists);
      // TODO: Add API call to update list positions
      return;
    }

    // Handle card reordering/moving
    const sourceListIndex = lists.findIndex(l => l.id === source.droppableId);
    const destListIndex = lists.findIndex(l => l.id === destination.droppableId);

    if (sourceListIndex === -1 || destListIndex === -1) return;

    const sourceList = lists[sourceListIndex];
    const destList = lists[destListIndex];

    const sourceCards = Array.from(sourceList.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Moving within same list
      sourceCards.splice(destination.index, 0, movedCard);
      
      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };
      
      setLists(newLists);
    } else {
      // Moving to different list
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, movedCard);
      
      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards
      };
      newLists[destListIndex] = {
        ...destList,
        cards: destCards
      };
      
      setLists(newLists);
    }

    try {
      await API.put("/cards/move", {
        cardId: draggableId,
        listId: destination.droppableId,
        position: destination.index + 1
      });
    } catch (error) {
      console.error("Error moving card:", error);
      fetchBoard();
    }
  }

  // Filter cards based on search
  const filteredLists = lists.map(list => ({
    ...list,
    cards: list.cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  const displayLists = searchQuery ? filteredLists : lists;

  return (
    <div className="board-page">
      <div className="board-header">
        <div className="board-header-left">
          <h1 className="board-title">{boardTitle}</h1>
          <button 
            className={`board-star ${isStarred ? 'starred' : ''}`}
            onClick={() => setIsStarred(!isStarred)}
          >
            {isStarred ? '⭐' : '☆'}
          </button>
          <div className="board-divider"></div>
          <button className="board-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            Board
          </button>
        </div>
        
        <div className="board-header-right">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <button className="board-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z"/>
            </svg>
            Share
          </button>
          <button className="board-btn-menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" type="LIST" direction="horizontal">
          {(provided) => (
            <div 
              className="board-lists-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="board-lists">
                {displayLists.map((list, index) => (
                  <Draggable 
                    draggableId={list.id} 
                    index={index} 
                    key={list.id}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <List 
                          list={list} 
                          boardId={boardId} 
                          onRefresh={fetchBoard}
                          dragHandleProps={provided.dragHandleProps}
                          isDragging={snapshot.isDragging}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddList boardId={boardId} onAdd={handleAddList} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default BoardPage;
