import React, { useState, useEffect, useRef } from "react";
import "./NavMenu.css"; // Import the new CSS file

// New NavMenu component to handle the animation and display
const NavMenu = ({ isOpen, menuLinks, onSearchSubmit, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      {/* This is the "stretching ball" background */}
      <div className={`menu-revealer ${isOpen ? "is-open" : ""}`} />

      {/* This is the menu content that appears on top */}
      <nav className={`mobile-menu md:hidden px-6 pt-24 pb-8 fixed inset-0 overflow-y-auto ${isOpen ? "menu-open" : ""}`}>
        <form onSubmit={handleSearch} className="mb-8 max-w-sm mx-auto">
          <label htmlFor="mobile-search" className="sr-only">Search</label>
          <input
            id="mobile-search"
            type="search"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-600 rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-black text-white placeholder-gray-400"
            autoComplete="off"
          />
        </form>
        <ul className="flex flex-col items-center space-y-4 text-white text-lg font-medium">
          {menuLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="block hover:text-gray-300 transition-colors" onClick={onClose}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export const WellnessJournal = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const articleRefs = useRef([]);
  const [visibleArticles, setVisibleArticles] = useState([]);

  const articles = [
    {
      title: "5 Morning Rituals for a Balanced Day",
      description: "Start your day with intention and calm by incorporating these simple morning rituals.",
      date: "April 15, 2024",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "The Power of Journaling for Mental Clarity",
      description: "Learn how journaling can help you process emotions and gain clarity in your thoughts.",
      date: "April 10, 2024",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Nourishing Your Body with Whole Foods",
      description: "Explore the benefits of whole foods and how to incorporate them into your daily meals.",
      date: "April 5, 2024",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    },
    {
      title: "Simple Yoga Poses to Relieve Stress",
      description: "Try these beginner-friendly yoga poses to help you unwind and relax after a busy day.",
      date: "April 1, 2024",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80",
    },
  ];

  useEffect(() => {
    setVisibleArticles(new Array(articles.length).fill(false));
  }, [articles.length]);

  useEffect(() => {
    if (!articleRefs.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleArticles((prev) => {
              if (prev[index]) return prev;
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    articleRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => {
      articleRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [articleRefs, articles.length]);

  const handleSearchSubmit = (query) => {
    alert(`Searching for: ${query}`);
    setMenuOpen(false);
  };

  const menuLinks = [
    { label: "Home", href: "#home" },
    { label: "Food", href: "/food" },
    { label: "Shopping", href: "/shopping" },
    { label: "Style & Beauty", href: "/style-beauty" },
    { label: "Health", href: "/health" },
    { label: "Holidays", href: "/holidays" },
    { label: "Life", href: "/life" },
    { label: "News", href: "/news" },
    { label: "About Us", href: "#about" },
    { label: "Subscribe", href: "/subscribe" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50 relative">
        <div className="container mx-auto flex items-center justify-between py-5 px-6 md:px-12">
          <h1 className="text-2xl font-bold tracking-wide cursor-default select-none">
            The Wellness Journal
          </h1>
          <nav className="hidden md:flex space-x-8 text-gray-700 text-sm font-medium">
            {menuLinks.map(({ label, href }) => (
              <a key={label} href={href} className="hover:text-gray-900 transition-colors">
                {label}
              </a>
            ))}
          </nav>

          {/* UPDATED Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-12 h-12 flex justify-center items-center bg-black rounded-full z-[101]"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transition-opacity duration-300 ease-in-out ${menuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute block h-0.5 w-6 bg-white rounded-sm transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>

        {/* UPDATED: Use the new NavMenu component */}
        <NavMenu 
          isOpen={menuOpen}
          menuLinks={menuLinks}
          onSearchSubmit={handleSearchSubmit}
          onClose={() => setMenuOpen(false)}
        />
      </header>

      {/* Main Content remains the same */}
      <main className="container mx-auto px-6 md:px-12 py-12 max-w-5xl">
        <section id="home" className="mb-20">
          <article className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-semibold leading-tight mb-4">
                Embrace Mindfulness: A Journey to Inner Peace
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Discover simple mindfulness techniques to reduce stress and enhance your daily wellbeing. Start your journey today with gentle practices that fit your lifestyle.
              </p>
              <a href="#" className="inline-block border border-gray-900 text-gray-900 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-900 hover:text-white transition">
                Read More
              </a>
            </div>
            <div className="rounded-lg overflow-hidden shadow-sm">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Calm person meditating in nature" className="w-full h-auto object-cover rounded-lg" loading="lazy" />
            </div>
          </article>
        </section>
        <section id="articles" className="mb-20">
          <h3 className="text-2xl font-semibold mb-10 border-b border-gray-200 pb-3">
            Recent Articles
          </h3>
          <div className="grid sm:grid-cols-2 gap-12">
            {articles.map(({ title, description, date, image }, idx) => (
              <article
                key={idx}
                data-index={idx}
                ref={(el) => (articleRefs.current[idx] = el)}
                className={`flex flex-col rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-shadow ease-out ${visibleArticles[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} hover:shadow-md`}
                style={{
                  transitionProperty: "opacity, transform, box-shadow",
                  transitionDuration: "1000ms",
                  transitionDelay: `${idx * 150}ms`,
                }}
              >
                <img src={image} alt={title} className="w-full h-48 object-cover" loading="lazy" />
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold mb-2">{title}</h4>
                  <p className="text-gray-600 flex-grow">{description}</p>
                  <time className="text-xs text-gray-400 mt-4">{date}</time>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="about" className="mb-20 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">About The Wellness Journal</h3>
          <p className="text-gray-700 leading-relaxed">
            The Wellness Journal is your calm corner on the internet — a place to explore mindful living, self-care, and holistic wellness. We believe in simplicity, authenticity, and nurturing your mind, body, and soul.
          </p>
        </section>
        <section id="contact" className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
          <p className="text-gray-700 mb-6">
            Have questions or want to collaborate? Reach out to us!
          </p>
          <form className="flex flex-col gap-4 max-w-md mx-auto">
            <input type="text" placeholder="Your Name" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" required />
            <input type="email" placeholder="Your Email" className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400" required />
            <textarea placeholder="Your Message" rows={4} className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none" required />
            <button type="submit" className="bg-gray-900 text-white rounded-md py-2 font-medium hover:bg-gray-800 transition">
              Send Message
            </button>
          </form>
        </section>
      </main>
      <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm select-none">
        &copy; 2025 thewellnessjournal.me — All rights reserved.
      </footer>
    </div>
  );
};
