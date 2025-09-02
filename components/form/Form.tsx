"use client";

import styles from "./Form.module.css";
import React, { useState } from "react";
import Category from "./category/Category";
import { CategoryType } from "@/types";
import { useExpenseStore } from "@/stores/expenseStore";
import { ExpenseType } from "../display/Display.types";
import { useDateArrStore } from "@/stores/dateArrStore";

type FormProps = CategoryType;

export default function Form({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}: FormProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { addExpense } = useExpenseStore();
  const { addDate } = useDateArrStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (num <= 0) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const newExpense: ExpenseType = {
      id: Date.now(),
      date: now.toLocaleString(),
      selectedCategory,
      amount: num,
      note,
    };

    addExpense(newExpense, formattedDate);
    addDate(formattedDate);
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
