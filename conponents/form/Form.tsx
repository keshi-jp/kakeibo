"use client";

import styles from "./Form.module.css";
import React, { useState } from "react";
import { Expense } from "../display/Display.types";
import Category from "./Category";
import { CategoryType } from "@/types";

interface FormProps extends CategoryType {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export default function Form({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
  expenses,
  setExpenses,
}: FormProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (num <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      selectedCategory,
      amount: num,
      note,
    };

    setExpenses([...expenses, newExpense]);
    setSelectedCategory("食費");
    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <Category
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <input
        type="text"
        placeholder="金額"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "") {
            setAmount("");
            return;
          }

          const num = Number(value);

          if (!isNaN(num)) {
            setAmount(num === 0 ? "" : value);
          }
        }}
        className={styles.inputCommon}
        required
      />

      <input
        type="text"
        placeholder="メモ（任意）"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className={styles.inputCommon}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
      >
        追加
      </button>
    </form>
  );
}
