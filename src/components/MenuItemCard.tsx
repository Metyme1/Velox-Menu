// MenuItemCard.tsx
import { FiClock } from "react-icons/fi";
import { AiFillStar } from "react-icons/ai";

interface MenuItem {
  name: string;
  price: number;
  time: number;
  rating: number;
  image: string;
}

export default function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-md text-gray-800 text-center">
          {item.name}
        </h3>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
          <span className="flex items-center gap-1 text-green-600">
            <FiClock /> {item.time} min
          </span>
          <span className="flex items-center gap-1 text-red-500">
            <AiFillStar /> {item.rating}
          </span>
        </div>
        <p className="font-bold text-md mt-1 text-center">${item.price}</p>
      </div>
    </div>
  );
}
