"use client";

import { CategoryType } from "@/types";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Category({
  categories,
  setCategories,
  selectedCategory,
  setSelectedCategory,
}: CategoryType) {

  return (
    <div className="relative">
      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-300" />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="input-common pl-4 pr-10 appearance-none"
        aria-label="カテゴリーまたは設定を選択"
      >
        <optgroup label="カテゴリー">
          {categories.map((item: { id: string; name: string }) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="その他">
          <option value="設定">⚙️ 設定</option>
        </optgroup>
      </select>
    </div>
  );
}
