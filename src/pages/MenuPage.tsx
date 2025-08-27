import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import MenuItemCard from "../components/MenuItemCard";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

export default function MenuPage() {
  const { slug } = useParams();
  const [cafe, setCafe] = useState<any>(null);
  const [activeCat, setActiveCat] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCafe = async () => {
      if (!slug) return;
      const ref = doc(db, "cafes", slug);
      const snap = await getDoc(ref);
      if (snap.exists()) setCafe(snap.data());
    };
    fetchCafe();
  }, [slug]);

  if (!cafe) return <p className="text-center mt-20">Loading...</p>;

  const categories = ["All", ...cafe.categories.map((c: any) => c.name)];

  return (
    <div className="min-h-screen bg-[#d8ebe9]">
      {/* White header block */}
      <div className="bg-white rounded-b-2xl shadow-sm px-4 pt-6 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Menu</h1>
          <button className="p-2 rounded-lg border border-gray-200">
            <FiShoppingCart size={20} />
          </button>
        </div>

        {/* Search inside header */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 text-sm outline-none"
          />
        </div>
      </div>

      {/* Category bar (on teal background) */}
      <div className="flex space-x-5 px-4 py-3 bg-[#d8ebe9] overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`text-base ${
              activeCat === cat ? "text-black font-semibold" : "text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid on teal background */}
      <div className="px-4 pb-6 grid grid-cols-2 gap-4">
        {cafe.categories
          .filter((c: any) => activeCat === "All" || c.name === activeCat)
          .flatMap((c: any) => c.items)
          .filter((item: any) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item: any, i: number) => (
            <MenuItemCard key={i} item={item} />
          ))}
      </div>
    </div>
  );
}
