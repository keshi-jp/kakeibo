"use client";

import { CategoryType } from "../../../types";

export default function Category({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}: CategoryType) {

  return (
    <div className="flex flex-col gap-2">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border rounded p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      >
        {categories.map((item: {id: string; name: string}) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
