"use client";

export default function TestApiPage() {
  const testGet = async () => {
    const res = await fetch("/api/articles");
    const data = await res.json();
    console.log("Дані з API:", data);
    alert("Дані отримано! Перевір консоль (F12)");
  };

  const testPost = async () => {
    const res = await fetch("/api/articles", {
      method: "POST",
      body: JSON.stringify({
        title: "Тест із браузера",
        body: "Перевірка зв'язку з фронтендом",
        authorId: 1 // Переконайся, що такий ID є в базі dev
      }),
    });
    const result = await res.json();
    console.log("Створено:", result);
  };

  return (
    <div className="p-10 space-x-4">
      <h1 className="text-xl mb-4">Тестування API (Завдання 4)</h1>
      <button onClick={testGet} className="bg-green-500 text-white p-2 rounded">
        Перевірити GET
      </button>
      <button onClick={testPost} className="bg-blue-500 text-white p-2 rounded">
        Перевірити POST
      </button>
    </div>
  );
}
