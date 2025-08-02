import React, { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { BoardColumn } from './BoardColumn';
import { BoardFilter } from './BoardFilter';
import { CardDetailModal } from './CardDetailModal';
import { NewCardModal } from './NewCardModal';

interface BoardViewProps {
  boardId: string;
  boardType: 'scrum' | 'kanban';
}

interface Card {
  id: string;
  type: 'story' | 'task' | 'bug' | 'epic';
  title: string;
  description: string;
  priority: 'lowest' | 'low' | 'medium' | 'high' | 'highest';
  status: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  labels?: string[];
  attachments?: number;
  comments?: number;
  estimate?: number;
}

interface Column {
  id: string;
  title: string;
  cards: Card[];
}

export function BoardView({ boardId, boardType }: BoardViewProps) {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        {
          id: '1',
          type: 'story',
          title: 'Set up data pipeline',
          description: 'Configure ETL process for customer data',
          priority: 'high',
          status: 'backlog',
          assignee: { name: 'Alex Johnson' },
          labels: ['backend', 'infrastructure'],
          attachments: 2,
          comments: 5,
          estimate: 8
        }
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      cards: []
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      cards: [
        {
          id: '2',
          type: 'task',
          title: 'Implement data validation',
          description: 'Add validation rules for incoming data',
          priority: 'medium',
          status: 'in-progress',
          assignee: { name: 'Sarah Chen' },
          labels: ['backend'],
          comments: 3,
          estimate: 4
        }
      ]
    },
    {
      id: 'review',
      title: 'Review',
      cards: []
    },
    {
      id: 'done',
      title: 'Done',
      cards: []
    }
  ]);

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewCardModalOpen, setIsNewCardModalOpen] = useState(false);
  const [newCardColumn, setNewCardColumn] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = columns.find(col => col.id === source.droppableId);
      if (!column) return;

      const newCards = Array.from(column.cards);
      const [removed] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, removed);

      setColumns(columns.map(col =>
        col.id === source.droppableId ? { ...col, cards: newCards } : col
      ));
    } else {
      // Move between columns
      const sourceColumn = columns.find(col => col.id === source.droppableId);
      const destColumn = columns.find(col => col.id === destination.droppableId);
      if (!sourceColumn || !destColumn) return;

      const sourceCards = Array.from(sourceColumn.cards);
      const destCards = Array.from(destColumn.cards);
      const [removed] = sourceCards.splice(source.index, 1);
      
      // Update card status
      const updatedCard = { ...removed, status: destination.droppableId };
      destCards.splice(destination.index, 0, updatedCard);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, cards: sourceCards };
        }
        if (col.id === destination.droppableId) {
          return { ...col, cards: destCards };
        }
        return col;
      }));
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleFilterChange = (filters: Record<string, unknown>) => {
    // Implement filter logic
  };

  const handleAddCard = (columnId: string) => {
    setNewCardColumn(columnId);
    setIsNewCardModalOpen(true);
  };

  const handleCardClick = (cardId: string) => {
    setSelectedCard(cardId);
  };

  const handleCreateCard = (card: Omit<Card, 'id' | 'status'>) => {
    if (!newCardColumn) return;

    const newCard: Card = {
      ...card,
      id: Date.now().toString(),
      status: newCardColumn
    };

    setColumns(columns.map(col =>
      col.id === newCardColumn
        ? { ...col, cards: [...col.cards, newCard] }
        : col
    ));

    setIsNewCardModalOpen(false);
    setNewCardColumn(null);
  };

  const filteredColumns = columns.map(column => ({
    ...column,
    cards: column.cards.filter(card =>
      card.title.toLowerCase().includes(searchQuery) ||
      card.description.toLowerCase().includes(searchQuery) ||
      card.labels?.some(label => label.toLowerCase().includes(searchQuery)) ||
      card.assignee?.name.toLowerCase().includes(searchQuery)
    )
  }));

  return (
    <div className="h-full flex flex-col bg-slate-800">
      <BoardFilter
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 flex space-x-4 overflow-x-auto p-4">
          {filteredColumns.map(column => (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              cards={column.cards}
              onAddCard={() => handleAddCard(column.id)}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      </DragDropContext>

      {selectedCard && (
        <CardDetailModal
          cardId={selectedCard}
          onClose={() => setSelectedCard(null)}
          onUpdate={(updatedCard) => {
            setColumns(columns.map(col => ({
              ...col,
              cards: col.cards.map(card =>
                card.id === selectedCard ? { ...card, ...updatedCard } : card
              )
            })));
            setSelectedCard(null);
          }}
          onDelete={() => {
            setColumns(columns.map(col => ({
              ...col,
              cards: col.cards.filter(card => card.id !== selectedCard)
            })));
            setSelectedCard(null);
          }}
        />
      )}

      <NewCardModal
        isOpen={isNewCardModalOpen}
        onClose={() => {
          setIsNewCardModalOpen(false);
          setNewCardColumn(null);
        }}
        onCreate={handleCreateCard}
      />
    </div>
  );
}