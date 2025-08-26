export interface CategoryType {
  categories: { id: string; name: string }[];
  setCategories: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}
