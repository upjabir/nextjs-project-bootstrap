"use client"

import { useState, useEffect } from "react";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("todos");
      if (stored) {
        setTodos(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading todos", error);
      setTodos([]);
    }
  }, []);

  // Persist todos to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos", error);
    }
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}
