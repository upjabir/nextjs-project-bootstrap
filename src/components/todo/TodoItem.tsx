"use client"

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { Todo } from "@/hooks/useTodos";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border-b border-border last:border-b-0">
      <div className="flex items-center gap-3 flex-1">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodo(todo.id)}
        />
        <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>
          {todo.text}
        </span>
      </div>
      <Button variant="outline" size="sm" onClick={() => deleteTodo(todo.id)}>
        Delete
      </Button>
    </div>
  );
}
