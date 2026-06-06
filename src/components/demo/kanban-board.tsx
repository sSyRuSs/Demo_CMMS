"use client";

import { CalendarDays, MapPin, Star, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type KanbanStatus = {
  value: string;
  label: string;
  color: string;
};

export type KanbanCard = {
  id: string;
  title: string;
  status: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  location: string;
  assignee: string;
  description: string;
  issueNumber: number;
  date: string;
  starred?: boolean;
};

const defaultStatuses: KanbanStatus[] = [
  { value: "In_open", label: "Todo", color: "#94a3b8" },
  { value: "In_progress", label: "In Progress", color: "#f59e0b" },
  { value: "Completed", label: "Done", color: "#10b981" },
  { value: "Overdue", label: "Overdue", color: "#ef4444" },
  { value: "Requested", label: "Requested", color: "#8b5cf6" },
  { value: "Approved", label: "Approved", color: "#3b82f6" },
];

const priorityStyle = {
  HIGH: {
    card: "cmms-kanban-card-high",
    label: "High",
  },
  MEDIUM: {
    card: "cmms-kanban-card-medium",
    label: "Medium",
  },
  LOW: {
    card: "cmms-kanban-card-low",
    label: "Low",
  },
};

export function KanbanBoard({
  title = "Kanban Board",
  cards,
  statuses = defaultStatuses,
  onOpenDetail,
}: {
  title?: string;
  cards: KanbanCard[];
  statuses?: KanbanStatus[];
  onOpenDetail?: (id: string) => void;
}) {
  return (
    <div className="cmms-kanban-shell">
      <div className="cmms-kanban-header">
        <h2>{title}</h2>
        <span>{cards.length} items</span>
      </div>
      <div className="cmms-kanban-scroll">
        <div className="cmms-kanban-track">
          {statuses.map((status) => {
            const statusCards = cards.filter((card) => card.status === status.value);
            return (
              <section className="cmms-kanban-column" key={status.value}>
                <div className="cmms-kanban-column-header">
                  <div className="cmms-kanban-column-title">
                    <span>{status.label}</span>
                    <i style={{ backgroundColor: status.color }} />
                  </div>
                  <span className="cmms-kanban-count">{statusCards.length}</span>
                </div>

                <div className="cmms-kanban-list">
                  {statusCards.map((card) => (
                    <button
                      className={`cmms-kanban-card ${priorityStyle[card.priority].card}`}
                      key={card.id}
                      onClick={() => onOpenDetail?.(card.id)}
                      type="button"
                    >
                      <div className="cmms-kanban-accent" />
                      <div className="cmms-kanban-card-body">
                        <div className="cmms-kanban-card-title-row">
                          <h3>{card.title}</h3>
                          {card.starred && <Star className="cmms-kanban-star" />}
                        </div>
                        <div className="cmms-kanban-meta">
                          <MapPin className="h-4 w-4" />
                          <span>{card.location}</span>
                        </div>
                        <p>{card.description}</p>
                        <div className="cmms-kanban-footer">
                          <div className="cmms-kanban-badges">
                            <Badge variant="secondary">#{card.issueNumber}</Badge>
                            <Badge variant={card.priority === "HIGH" ? "danger" : card.priority === "MEDIUM" ? "warning" : "success"}>
                              {priorityStyle[card.priority].label}
                            </Badge>
                          </div>
                          <div className="cmms-kanban-user">
                            <UserRound className="h-3 w-3" />
                            <span>{card.assignee}</span>
                          </div>
                        </div>
                        <div className="cmms-kanban-date">
                          <CalendarDays className="h-3 w-3" />
                          <span>{card.date}</span>
                        </div>
                      </div>
                    </button>
                  ))}

                  {statusCards.length === 0 && (
                    <div className="cmms-kanban-empty">No items</div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
