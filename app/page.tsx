import Display from "./conponents/display/Display"

export default function Home() {
  return (
    <main className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">家計簿アプリ</h1>
      <Display />
    </main>
  );
}

