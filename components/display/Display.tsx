"use client";

import { useEffect, useState } from "react";
import Form from "../form/Form";
import RecentExpensesList from "../recentExpenses/RecentExpensesList";
import { CategoryType } from "@/types";
import Link from "next/link";
import Setting from "../setting/Setting";

export default function Display() {
  const [categories, setCategories] = useState<CategoryType["categories"]>([
    { id: "1", name: "食費" },
    { id: "2", name: "交通費" },
    { id: "3", name: "娯楽" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0].name : ""
  );

  // SettingコンポーネントはLinkで別ページに遷移するのではなく、
  // ルートページ(app/page.tsx)内で状態によって表示を切り替える設計なのでDisplay.tsxに置く。
  if (selectedCategory === "設定") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <Setting
          categories={categories}
          setCategories={setCategories}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--foreground)]">
          家計簿
        </h2>
        <Form
          categories={categories}
          setCategories={setCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <RecentExpensesList />
        <Link
          href="/expenses"
          className="btn-primary inline-block mt-6 w-full text-center"
        >
          管理画面へ
        </Link>
      </div>
    </div>
  );
}
