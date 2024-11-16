import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Plus, MoreVertical } from 'lucide-react';
import { BoardCard } from './BoardCard';

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

interface ColumnProps {
  id: string;
  title: string;
  cards: Card[];
  onAddCard: () => void;
  onCardClick: (cardId: string) => void;
}

export function BoardColumn({ id, title, cards, onAddCard, onCardClick }: ColumnProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-slate-800 rounded-lg">
      {/* Column Header */}
      <div className="p-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-white font-medium">{title}</h3>
            <span className="text-sm text-slate-400">{cards.length}</span>
          </div>
          <button className="p-1 hover:bg-slate-700 rounded">
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Column Content */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`p-2 min-h-[200px] transition-colors ${
              snapshot.isDraggingOver ? 'bg-slate-700/50' : ''
            }`}
          >
            {cards.map((card, index) => (
              <BoardCard
                key={card.id}
                index={index}
                {...card}
                onClick={() => onCardClick(card.id)}
              />
            ))}
            {provided.placeholder}
            
            {/* Add Card Button */}
            <button
              onClick={onAddCard}
              className="w-full p-2 mt-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition flex items-center justify-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Issue</span>
            </button>
          </div>
        )}
      </Droppable>
    </div>
  );
}