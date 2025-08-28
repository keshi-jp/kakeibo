"use client";

import { CategoryType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

type SettingProps = Pick<CategoryType, "categories" | "setCategories"> & {
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default function Setting({
  categories,
  setCategories,
  setSelectedCategory,
}: SettingProps) {
  const [newCategory, setNewCategory] = useState("");
  const [isCategory, setIsCategory] = useState<boolean>(true);

  const filteredCategories = categories.filter((cat) => cat.name !== "設定");

  const handleAddClick = () => {
    if (!newCategory.trim()) return;
    setCategories([
      ...categories.slice(0, -1),
      { id: uuidv4(), name: newCategory },
      { id: "setting", name: "設定" },
    ]);
    setNewCategory("");
  };

  const handleDeleteClick = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleBackClick = () => {
    if (categories.length === 1) {
      setIsCategory(false);
    }
    setSelectedCategory(categories[0].name);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">カテゴリー設定</h1>

      <ul className="space-y-2 mb-4">
        {filteredCategories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center bg-gradient-to-r from-indigo-100 to-indigo-200 dark:from-gray-700 dark:to-gray-800 shadow-md rounded-2xl p-3 hover:scale-105 transition-transform duration-200"
          >
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {cat.name}
            </span>
            <button
              onClick={() => handleDeleteClick(cat.id)}
              className="px-3 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              削除
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="新しいカテゴリー"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="flex-1 rounded-full border px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          onClick={handleAddClick}
          className="rounded-full px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-md hover:scale-105 transition-transform"
        >
          追加
        </button>
      </div>

      <button
        onClick={handleBackClick}
        className="mt-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
      >
        ← 戻る
      </button>
      {!isCategory && (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400">
          カテゴリーがありません。
        </p>
      )}
    </div>
  );
}
