"use client";

import { useState } from "react";
import Form from "../form/Form";
import { Expense } from "../../types/type";
import List from "../list/List";

export default function Display() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="dark">
      <Form
        expenses={expenses}
        setExpenses={setExpenses}
      />

      <List expenses={expenses} />

      <p className="text-lg font-semibold">合計: {total}円</p>
    </div>
  );
}
