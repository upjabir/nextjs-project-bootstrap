"use client"

import React from "react";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import useTodos from "@/hooks/useTodos";

export default function TodoPage() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <img
          src="https://placehold.co/1200x400?text=Clean+Minimalistic+todo+app+banner+with+subtle+modern+typography+and+light+color+palette"
          alt="Clean minimalistic todo app banner with subtle modern typography and light color palette"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
          className="w-full rounded-lg shadow-sm"
        />
      </div>
      
      <div className="space-y-6">
        <TodoForm onAddTodo={addTodo} />
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
      
      {todos.length > 0 && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
        </div>
      )}
    </div>
  );
}
