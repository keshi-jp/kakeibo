"use client";

import { useState } from "react";

interface CategoryProps {
  category: string;
  setCategory: (value: string) => void;
}

export default function Category({ category, setCategory }: CategoryProps) {
  const [categories, setCategories] = useState([
    "食費",
    "交通費",
    "娯楽",
    "追加",
  ]);

  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    setCategories([...categories.slice(0, -1), newCategory, "追加"]);
    setCategory(newCategory);
    setNewCategory("");
  }

  return (
    <div className="flex flex-col gap-2">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {categories.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>

      {category === "追加" && (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="新しいカテゴリを入力"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex-1"
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="bg-blue-500 dark:bg-blue-700 text-white rounded p-2 hover:bg-blue-600 dark:hover:bg-blue-600"
          >
            追加
          </button>
        </div>
      )}
    </div>
  );
}
