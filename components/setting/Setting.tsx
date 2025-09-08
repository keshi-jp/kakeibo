"use client";

import { CategoryType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

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


  const handleAddClick = () => {
    if (!newCategory.trim()) return;
    setCategories([
      ...categories,
      { id: uuidv4(), name: newCategory }
    ]);
    setNewCategory("");
  };

  const handleDeleteClick = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleBackClick = () => {
    if (categories.length === 0) {
      setIsCategory(false);
    } else {
      setSelectedCategory(categories[0].name);
    }
  };

  useEffect(() => {
    if (categories.length > 0) {
      setIsCategory(true);
    }
  }, [categories])

  return (
    <div className="card p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-[var(--foreground)]">
        カテゴリー設定
      </h1>

      <ul className="space-y-3 mb-6">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="card p-4 flex justify-between items-center transition-all duration-200 hover:shadow-lg animate-fade-in"
          >
            <span className="font-medium text-[var(--card-foreground)]">
              {cat.name}
            </span>
            <button
              onClick={() => handleDeleteClick(cat.id)}
              className="btn-delete"
              aria-label={`カテゴリー「${cat.name}」を削除`}
            >
              <TrashIcon className="h-5 w-5 text-red-500 dark:text-red-400" />
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <PlusIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
          <input
            type="text"
            placeholder="新しいカテゴリー（例：日用品）"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="input-common pl-10"
            aria-label="新しいカテゴリー入力"
          />
        </div>
        <button
          onClick={handleAddClick}
          className="btn-primary flex items-center justify-center gap-2"
          aria-label="カテゴリーを追加"
        >
          <PlusIcon className="h-5 w-5" />
          追加
        </button>
      </div>

      <button
        onClick={handleBackClick}
        className="text-[var(--primary)] hover:text-[var(--primary-hover)] flex items-center gap-2 transition-colors"
        aria-label="家計簿画面に戻る"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        戻る
      </button>
      {!isCategory && (
        <p className="mt-6 text-center text-gray-500 dark:text-gray-400 animate-fade-in">
          カテゴリーがありません。
        </p>
      )}
    </div>
  );
}
