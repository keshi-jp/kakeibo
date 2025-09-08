"use client";

import React, { useState } from "react";
import Category from "./category/Category";
import { CategoryType } from "@/types";
import { useExpenseStore } from "@/stores/expenseStore";
import { ExpenseType } from "../display/Display.types";
import { useDateArrStore } from "@/stores/dateArrStore";
import { CurrencyYenIcon, PencilIcon } from "@heroicons/react/24/outline";

type FormProps = CategoryType;

export default function Form({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}: FormProps) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { addExpense } = useExpenseStore();
  const { addDate } = useDateArrStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
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
    setError("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleAmountChange = (value: string) => {
    if (value === "") {
      setAmount("");
      setError("");
      return;
    }
    const num = Number(value);
    if (isNaN(num) || num === 0) {
      setAmount("");
      setError("有効な金額（0より大きい数）を入力してください");
      return;
    }
    setAmount(value);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-center animate-fade-in">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center animate-fade-in dark:bg-green-900 dark:text-green-200">
          支出を追加しました！
        </div>
      )}
      <Category
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="relative">
        <CurrencyYenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          placeholder="金額（例：1000）"
          value={amount}
          onChange={(e) => handleAmountChange(e.target.value)}
          className="input-common pl-10"
          required
          aria-label="支出金額"
        />
      </div>
      <div className="relative">
        <PencilIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          placeholder="メモ（任意）"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="input-common pl-10"
          aria-label="メモ"
        />
      </div>
      <button type="submit" className="btn-primary">
        追加
      </button>
    </form>
  );
}
