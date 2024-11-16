import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Clock, AlertCircle, MessageSquare, Paperclip, Link } from 'lucide-react';

interface CardProps {
  id: string;
  index: number;
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
  onClick: () => void;
}

export function BoardCard({
  id,
  index,
  type,
  title,
  description,
  priority,
  assignee,
  labels,
  attachments,
  comments,
  estimate,
  onClick
}: CardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'highest': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      case 'epic':
        return <Link className="h-4 w-4 text-purple-400" />;
      default:
        return <div className="w-4 h-4 rounded bg-blue-400" />;
    }
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={`bg-slate-700 rounded-lg p-3 mb-2 cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
          }`}
          style={{
            ...provided.draggableProps.style,
            opacity: snapshot.isDragging ? 0.8 : 1
          }}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getTypeIcon(type)}
              <span className="text-xs text-slate-400 font-medium uppercase">{type}</span>
            </div>
            <button 
              className="p-1 hover:bg-slate-600 rounded"
              onClick={(e) => {
                e.stopPropagation();
                // Handle menu click
              }}
            >
              <MoreVertical className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Card Title */}
          <h4 className="text-white font-medium mb-2">{title}</h4>

          {/* Labels */}
          {labels && labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {labels.map((label, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400"
                >
                  {label}
                </span>
              ))}
            </div>
          )}

          {/* Card Metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
            <div className="flex items-center space-x-3">
              {assignee && (
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-xs text-white font-medium">
                      {assignee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
              )}
              {estimate && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{estimate}h</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {attachments && attachments > 0 && (
                <span className="flex items-center space-x-1">
                  <Paperclip className="h-3 w-3" />
                  <span>{attachments}</span>
                </span>
              )}
              {comments && comments > 0 && (
                <span className="flex items-center space-x-1">
                  <MessageSquare className="h-3 w-3" />
                  <span>{comments}</span>
                </span>
              )}
            </div>
          </div>

          {/* Priority Badge */}
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 rounded text-xs ${getPriorityColor(priority)}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
        </div>
      )}
    </Draggable>
  );
}