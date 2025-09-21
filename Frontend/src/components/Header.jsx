import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Heart, Menu, X } from "lucide-react";

const Header = ({ cartItems = [], onRemoveFromCart, onUpdateQuantity }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <img
            src="https://placehold.co/40x40/000000/FFFFFF?text=F"
            alt="Furniro Logo"
            className="rounded-full"
          />
          <span className="text-gray-800 hidden md:block">Furniro</span>
        </Link>

        {/* Navigation (desktop) */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="hover:text-orange-500 transition-colors">
            Shop
          </Link>
          <Link to="/blog" className="hover:text-orange-500 transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-orange-500 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-orange-500 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden mt-2 flex flex-col space-y-2 text-gray-700 font-medium">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/shop" className="hover:text-orange-500 transition-colors">Shop</Link>
          <Link to="/blog" className="hover:text-orange-500 transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-orange-500 transition-colors">Contact</Link>
        </nav>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsCartOpen(false)}></div>
            <section className="absolute inset-y-0 right-0 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setIsCartOpen(false)}>
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        {cartItems.length === 0 ? (
                          <p className="text-center text-gray-500">Your cart is empty.</p>
                        ) : (
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cartItems.map((item) => (
                              <li key={item.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{item.name}</h3>
                                      <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <div className="flex items-center space-x-2 text-gray-500">
                                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                                      <span>Qty {item.quantity}</span>
                                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="flex">
                                      <button type="button" className="font-medium text-orange-600 hover:text-orange-500" onClick={() => onRemoveFromCart(item.id)}>Remove</button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-orange-700">Checkout</a>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or <button type="button" className="font-medium text-orange-600 hover:text-orange-500" onClick={() => setIsCartOpen(false)}>Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;