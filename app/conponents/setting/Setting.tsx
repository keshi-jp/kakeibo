import { CategoryType } from "@/app/types";
import { v4 as uuidv4 } from "uuid";

type SettingProps = Pick<CategoryType, "categories" | "setCategories">;

export default function Setting({ categories, setCategories }: SettingProps) {
  const setCategory = categories.filter((cat) => {
    return cat.name !== "設定";
  });

  const handleAddClick = () => {
    setCategories([...categories, {id: uuidv4(), name: "a"}]);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <ul>
        {setCategory.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
      <button onClick={handleAddClick}>カテゴリーを追加</button>
    </div>
  );
}
