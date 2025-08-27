import { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function AdminPage() {
  const [slug, setSlug] = useState("");
  const [cafeName, setCafeName] = useState("");
  const [category, setCategory] = useState("");

  const [item, setItem] = useState({
    name: "",
    price: "",
    time: "",
    rating: "",
    image: "",
  });

  const saveAll = async () => {
    if (!slug || !cafeName || !category || !item.name) {
      return alert("Please fill in all fields");
    }

    const ref = doc(db, "cafes", slug);
    const snap = await getDoc(ref);

    // If cafe does not exist, create it
    if (!snap.exists()) {
      await setDoc(ref, {
        name: cafeName,
        categories: [
          {
            name: category,
            items: [
              {
                ...item,
                price: Number(item.price),
                time: Number(item.time),
                rating: Number(item.rating),
              },
            ],
          },
        ],
      });
      alert("Cafe + Category + Item created!");
      return;
    }

    // If cafe exists
    const cafeData = snap.data();
    let categories = cafeData.categories || [];

    // Find category
    const categoryIndex = categories.findIndex((c: any) => c.name === category);

    if (categoryIndex === -1) {
      // New category
      categories.push({
        name: category,
        items: [
          {
            ...item,
            price: Number(item.price),
            time: Number(item.time),
            rating: Number(item.rating),
          },
        ],
      });
    } else {
      // Add to existing category
      categories[categoryIndex].items.push({
        ...item,
        price: Number(item.price),
        time: Number(item.time),
        rating: Number(item.rating),
      });
    }

    await updateDoc(ref, { categories });
    alert("Item added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      {/* Cafe + Category + Item Form */}
      <div className="bg-white p-4 rounded shadow space-y-3">
        <input
          type="text"
          placeholder="Cafe slug (e.g. maki)"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Cafe name"
          value={cafeName}
          onChange={(e) => setCafeName(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Category (e.g. Breakfast)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Item name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Time (minutes)"
          value={item.time}
          onChange={(e) => setItem({ ...item, time: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={item.rating}
          onChange={(e) => setItem({ ...item, rating: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={item.image}
          onChange={(e) => setItem({ ...item, image: e.target.value })}
          className="border px-3 py-2 rounded w-full"
        />

        <button
          onClick={saveAll}
          className="px-4 py-2 bg-green-600 text-white rounded w-full"
        >
          Save Cafe + Category + Item
        </button>
      </div>
    </div>
  );
}
