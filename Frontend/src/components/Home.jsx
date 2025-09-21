import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const Home = ({ onAddToCart }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const products = [
    { id: 1, name: "Modern Sofa", price: 899, rating: 4.5, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", category: "Living Room" },
    { id: 2, name: "Dining Table", price: 1299, rating: 4.8, image: "https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop", category: "Dining" },
    { id: 3, name: "Office Chair", price: 449, rating: 4.3, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop", category: "Office" },
    { id: 4, name: "Bookshelf", price: 329, rating: 4.6, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", category: "Storage" },
    { id: 5, name: "Bed Frame", price: 799, rating: 4.7, image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop", category: "Bedroom" },
    { id: 6, name: "Coffee Table", price: 249, rating: 4.4, image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop", category: "Living Room" },
    { id: 7, name: "Wardrobe", price: 1099, rating: 4.5, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", category: "Bedroom" },
    { id: 8, name: "Desk Lamp", price: 89, rating: 4.2, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", category: "Lighting" }
  ];

  const featuredRooms = [
    { id: 1, title: "Beautiful rooms inspiration", subtitle: "Living Room", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop" },
    { id: 2, title: "Inner peace", subtitle: "Bedroom", image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&h=400&fit=crop" }
  ];

  const handleAddToCartClick = (product) => {
    onAddToCart(product);
    setShowSuccessPopup(true);
  };

  useEffect(() => {
    let timer;
    if (showSuccessPopup) {
      timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessPopup]);

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Discover Our New Collection
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Transform your home with our premium furniture collection designed for modern living.
              </p>
              <button className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg">
                Shop Now
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=500&fit=crop"
                alt="Modern Furniture"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl">
                <p className="text-sm text-gray-600">Special Offer</p>
                <p className="text-2xl font-bold text-amber-600">25% Off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse The Range</h2>
            <p className="text-gray-600">Discover our carefully curated furniture collections</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group cursor-pointer">
              <div className="overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
                  alt="Dining"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6">Dining</h3>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop"
                  alt="Living"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6">Living</h3>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                  alt="Bedroom"
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6">Bedroom</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
            <p className="text-gray-600">Handpicked furniture for every room in your home</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-amber-600 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleAddToCartClick(product)} // Pass the product object to the handler
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-xl font-bold text-amber-600">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
              Show More
            </button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Beautiful rooms inspiration
              </h2>
              <p className="text-gray-600 mb-8">
                Our designer already made a lot of beautiful prototypes of rooms that inspire you.
              </p>
              <button className="bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                Explore More
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
                  alt="Room 1"
                  className="rounded-2xl shadow-lg w-full"
                />
                <img
                  src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300&h=250&fit=crop"
                  alt="Room 2"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
              <div className="mt-8">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
                  alt="Room 3"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {showSuccessPopup && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideIn">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Item added to cart!</span>
          </div>
        </div>

      )}
    </div>
  );
};

export default Home;