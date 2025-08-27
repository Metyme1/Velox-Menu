import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

interface Cafe {
  name: string;
  logo?: string;
}

export default function App() {
  const [cafes, setCafes] = useState<Cafe[]>([]);

  useEffect(() => {
    const fetchCafes = async () => {
      const cafesRef = collection(db, "cafes");
      const snap = await getDocs(cafesRef);

      const cafeList: Cafe[] = snap.docs.map((doc) => ({
        name: doc.data().name,
        logo:
          doc.data().logo ||
          "https://via.placeholder.com/120x120.png?text=Cafe",
      }));

      setCafes(cafeList);
    };

    fetchCafes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      {/* Navbar */}
      <header className="bg-[#800020] text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            Velox Menu
          </h1>
          <nav className="hidden md:flex space-x-6 text-base sm:text-lg font-medium">
            <a href="#home" className="hover:text-gray-200 transition">
              Home
            </a>
            <a href="#about" className="hover:text-gray-200 transition">
              About Us
            </a>
            <a href="#partners" className="hover:text-gray-200 transition">
              Cafes
            </a>
            <a href="#contact" className="hover:text-gray-200 transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="bg-gradient-to-r from-[#800020] via-[#990024] to-[#b3002d] text-white text-center flex flex-col justify-center items-center px-6 py-20 sm:py-28"
      >
        <h2 className="text-3xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Discover Menus Instantly 🍴
        </h2>
        <p className="max-w-2xl mx-auto text-base sm:text-lg opacity-90">
          Explore menus from your favorite cafes in seconds. Fast, elegant &
          digital with <b>Velox Menu</b>.
        </p>
        <button className="mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#800020] rounded-full font-semibold shadow-xl hover:scale-105 transition">
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 text-center"
      >
        <h3 className="text-2xl sm:text-4xl font-bold text-[#800020] mb-6">
          About Us
        </h3>
        <p className="max-w-3xl mx-auto text-gray-700 text-base sm:text-lg leading-relaxed">
          At Velox Menu, we simplify dining by transforming traditional menus
          into <b>smart digital experiences</b>. Restaurants & cafes can now
          provide modern QR-code menus that delight customers.
        </p>
      </section>

      {/* Cafes Section */}
      <section
        id="partners"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-white text-center"
      >
        <h3 className="text-2xl sm:text-4xl font-bold text-[#800020] mb-10">
          Explore Our Cafes
        </h3>
        {cafes.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-10 max-w-6xl mx-auto">
            {cafes.map((cafe, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl p-4 sm:p-6 transition transform hover:-translate-y-1"
              >
                <img
                  src={cafe.logo}
                  alt={cafe.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 mx-auto rounded-full object-cover border-2 sm:border-4 border-[#800020] mb-3 sm:mb-4"
                />
                <p className="font-semibold text-sm sm:text-lg">{cafe.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Loading cafes...</p>
        )}
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-50 text-center"
      >
        <h3 className="text-2xl sm:text-4xl font-bold text-[#800020] mb-6">
          Contact Us
        </h3>
        <p className="text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto text-base sm:text-lg">
          Have questions or want to join Velox Menu? Let’s talk.
        </p>
        <form className="max-w-lg mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm text-sm sm:text-base"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm text-sm sm:text-base"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 sm:py-3 border rounded-lg shadow-sm text-sm sm:text-base"
            rows={4}
          />
          <button className="w-full px-6 py-2 sm:py-3 bg-[#800020] text-white rounded-lg font-semibold hover:bg-[#660018] transition">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#800020] text-white text-center py-4 sm:py-6 mt-auto">
        <p className="opacity-90 text-sm sm:text-base">
          © {new Date().getFullYear()} Velox Menu — Smart Dining Experience
        </p>
      </footer>
    </div>
  );
}
