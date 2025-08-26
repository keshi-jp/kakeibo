import { Expense } from "../display/Display.types";

interface ListProps {
  expenses: Expense[];
}

export default function List({ expenses }: ListProps) {
  return (
    <ul className="space-y-2 mb-4">
      {expenses.map((exp: Expense) => (
        <li
          key={exp.id}
          className="border p-2 rounded flex justify-between bg-gray-100 dark:bg-gray-800"
        >
          <div>
            <p>{exp.date}</p>
            <p className="font-medium">{exp.selectedCategory}</p>
            <p className="text-sm text-gray-600">{exp.note}</p>
          </div>
          <p className="font-bold">{exp.amount}円</p>
        </li>
      ))}
    </ul>
  );
}
