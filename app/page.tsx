"use client";
import { useState } from "react";

type Expense = {
  id: number;
  category: string;
  amount: number;
  note: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [category, setCategory] = useState("食費");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount) return;

    const newExpense: Expense = {
      id: Date.now(),
      category,
      amount: num,
      note,
    };

    setExpenses([...expenses, newExpense]);

    setCategory("食費");
    setAmount("");
    setNote("");
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">家計簿アプリ</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="食費">食費</option>
          <option value="交通費">交通費</option>
          <option value="娯楽">娯楽</option>
          <option value="その他">その他</option>
        </select>

        <input
          type="text"
          placeholder="金額"
          value={amount}
          onChange={(e) => {
            const value = e.target.value;

            if (value === "") {
              setAmount("");
              return;
            }

            const num = Number(value);

            if (!isNaN(num)) {
              setAmount(num === 0 ? "" : value);
            }
          }}
          className="border rounded p-2"
          required
        />

        <input
          type="text"
          placeholder="メモ（任意）"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="border rounded p-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          追加
        </button>
      </form>

      <ul className="space-y-2 mb-4">
        {expenses.map((exp) => (
          <li key={exp.id} className="border p-2 rounded flex justify-between">
            <div>
              <p className="font-medium">{exp.category}</p>
              <p className="text-sm text-gray-600">{exp.note}</p>
            </div>
            <p className="font-bold">{exp.amount}円</p>
          </li>
        ))}
      </ul>


      <p className="text-lg font-semibold">合計: {total}円</p>
    </main>
  );
}
