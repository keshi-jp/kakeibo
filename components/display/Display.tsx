"use client";

import { useState } from "react";
import Form from "../form/Form";
import RecentExpensesList from "../recentExpenses/RecentExpensesList";
import Setting from "../setting/Setting";
import { CategoryType } from "@/types";
import Link from "next/link";

export default function Display() {
  const [categories, setCategories] = useState<CategoryType["categories"]>([
    { id: "1", name: "食費" },
    { id: "2", name: "交通費" },
    { id: "3", name: "娯楽" },
    { id: "setting", name: "設定" },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("食費");

  if (selectedCategory === "設定") {
    return (
      <Setting
        categories={categories}
        setCategories={setCategories}
        setSelectedCategory={setSelectedCategory}
      />
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">家計簿</h2>
      <Form
        categories={categories}
        setCategories={setCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <RecentExpensesList />

      <Link
        href="/expenses"
        className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        管理画面へ
      </Link>
    </div>
  );
}
