"use client";

import { useState } from "react";
import Form from "../form/Form";
import { Expense } from "./Display.types";
import List from "../list/List";
import Setting from "../setting/Setting";
import { CategoryType } from "@/app/types";

export default function Display() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<CategoryType["categories"]>([
    { id: "1", name: "食費" },
    { id: "2", name: "交通費" },
    { id: "3", name: "娯楽" },
    { id: "setting", name: "設定" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("食費");

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  if (selectedCategory === "設定") {
    return <Setting categories={categories} setCategories={setCategories} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">家計簿</h1>
      <Form
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      <List expenses={expenses} />

      <p className="text-lg font-semibold">合計: {total}円</p>
    </div>
  );
}
