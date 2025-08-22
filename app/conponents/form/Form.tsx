"use client";

import styles from "./Form.module.css";
import React, { useState } from "react";
import { Expense } from "../../types/type";
import Category from "./Category";

interface ListProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export default function Form({ expenses, setExpenses }: ListProps) {
  const [category, setCategory] = useState("食費");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (num <= 0) return;

    const newExpense: Expense = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      category,
      amount: num,
      note,
    };

    setExpenses([...expenses, newExpense]);
    setCategory("食費");
    setAmount("");
    setNote("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <Category category={category} setCategory={setCategory} />

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
