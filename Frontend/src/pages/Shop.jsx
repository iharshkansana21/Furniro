import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden transform transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                {title}
                            </h3>
                            <div className="mt-2">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

const Toast = ({ message, isVisible, onHide }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    return (
        <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{message}</span>
            </div>
        </div>
    );
};

const Shop = ({ onAddToCart }) => {
    const API_BASE_URL = 'https://furniro-6dum.onrender.com';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        brand: '',
        category: '',
        priceMin: '',
        priceMax: '',
        sort: 'name-asc',
        page: 1,
        limit: 12,
    });

    const [totalProducts, setTotalProducts] = useState(0);
    const [availableBrands, setAvailableBrands] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        description: '',
    });

    const [isToastVisible, setIsToastVisible] = useState(false);
    const handleAddToCart = (product) => {
        onAddToCart(product);
        setIsToastVisible(true);
    };

    // Function to fetch products from the backend API.
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(`${API_BASE_URL}/products?${queryParams}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setProducts(data.products);
            setTotalProducts(data.totalProducts);
            setAvailableBrands(data.brands);
            setAvailableCategories(data.categories);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
            page: 1,
        }));
    };

    const handlePageChange = (pageNumber) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: pageNumber,
        }));
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add product');
            }
            setIsModalOpen(false);
            setFormData({ name: '', brand: '', category: '', price: '', description: '' });
            fetchProducts();
            setIsToastVisible(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            setIsModalOpen(false);
            setEditingProduct(null);
            setFormData({ name: '', brand: '', category: '', price: '', description: '' });
            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productToDelete.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
            fetchProducts();
        } catch (err) {
            setError(err.message);
        }
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            brand: product.brand,
            category: product.category,
            price: product.price,
            description: product.description,
        });
        setIsModalOpen(true);
    };

    const openDeleteModal = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const totalPages = Math.ceil(totalProducts / filters.limit);
    const ProductCard = ({ product, onAddToCart }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <div
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300 ease-in-out cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" onError={(e) => { e.target.src = 'https://placehold.co/400x400/D4D4D4/1E293B?text=Product' }} />
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold rounded-full p-2">
                        -30%
                    </div>
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-gray-800 mt-2">{product.name}</h3>
                    <p className="text-sm text-gray-500 my-1">{product.description}</p>
                    <div className="flex justify-center items-center mt-2">
                        <span className="text-lg font-bold text-gray-900">Rp {product.price?.toLocaleString('id-ID')}</span>
                    </div>
                </div>
                {isHovered && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center p-4 transition-opacity duration-300">
                        <button
                            className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-500 hover:text-white transition-colors"
                            onClick={() => onAddToCart(product)}
                        >
                            Add to cart
                        </button>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button
                                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200"
                                onClick={(e) => { e.stopPropagation(); openEditModal(product); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button
                                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-200"
                                onClick={(e) => { e.stopPropagation(); openDeleteModal(product); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 font-inter w-full overflow-hidden">
            <section className="bg-cover bg-center h-80 flex flex-col justify-center items-center text-center p-4" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80)' }}>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800">Shop</h1>
                <div className="flex items-center text-gray-700 mt-4">
                    <a href="/" className="font-semibold hover:text-orange-500">Home</a>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    <span className="font-semibold text-orange-500">Shop</span>
                </div>
            </section>

            <section className="bg-orange-50 p-4 md:p-8 flex flex-wrap items-center justify-between sticky top-16 z-10">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 cursor-pointer hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM13 16a1 1 0 011-1h6a1 1 0 011 1v2a1 1 0 01-1 1h-6a1 1 0 01-1-1v-2z" /></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 cursor-pointer hover:text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    <p className="text-sm md:text-base text-gray-600">
                        Showing {products.length > 0 ? (filters.page - 1) * filters.limit + 1 : 0}-{Math.min(filters.page * filters.limit, totalProducts)} of {totalProducts} results
                    </p>
                </div>
                <div className="flex flex-wrap items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="show" className="text-gray-600 hidden md:block">Show</label>
                        <select id="show" value={filters.limit} onChange={e => handleFilterChange('limit', Number(e.target.value))} className="p-2 border border-gray-300 rounded-lg">
                            <option value="8">8</option>
                            <option value="12">12</option>
                            <option value="16">16</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label htmlFor="sort" className="text-gray-600 hidden md:block">Sort by</label>
                        <select id="sort" value={filters.sort} onChange={e => handleFilterChange('sort', e.target.value)} className="p-2 border border-gray-300 rounded-lg">
                            <option value="name-asc">Name: A-Z</option>
                            <option value="name-desc">Name: Z-A</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                        </select>
                    </div>
                    <button
                        onClick={() => {
                            setEditingProduct(null);
                            setFormData({ name: '', brand: '', category: '', price: '', description: '' });
                            setIsModalOpen(true);
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                    >
                        Add Product
                    </button>
                </div>
            </section>

            <div className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
                <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Filters</h3>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Brand</label>
                        <select
                            value={filters.brand}
                            onChange={(e) => handleFilterChange('brand', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Brands</option>
                            {availableBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Category</label>
                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="">All Categories</option>
                            {availableCategories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Price Range (IDR)</label>
                        <div className="flex space-x-2 items-center">
                            <input
                                type="number"
                                placeholder="Min"
                                value={filters.priceMin}
                                onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                                className="w-1/2 p-2 border border-gray-300 rounded-lg"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={filters.priceMax}
                                onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                                className="w-1/2 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setFilters({ brand: '', category: '', priceMin: '', priceMax: '', sort: 'name-asc', page: 1, limit: 12 })}
                        className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Reset Filters
                    </button>
                </aside>

                <main className="w-full md:w-3/4">
                    {loading && <div className="text-center text-lg text-gray-600">Loading products...</div>}
                    {error && <div className="text-center text-lg text-red-500">Error: {error}</div>}
                    {!loading && !error && products.length === 0 && (
                        <div className="text-center text-lg text-gray-600">No products found.</div>
                    )}
                    {!loading && !error && products.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>
                    )}
                    {!loading && !error && totalPages > 1 && (
                        <div className="mt-8 flex justify-center items-center space-x-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-colors duration-200 ${filters.page === i + 1 ? 'bg-orange-500 text-white' : 'bg-orange-200 text-gray-800 hover:bg-orange-300'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            {filters.page < totalPages && (
                                <button
                                    onClick={() => handlePageChange(filters.page + 1)}
                                    className="bg-orange-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-orange-300 font-semibold transition-colors"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    )}
                </main>
            </div>

            <footer className="bg-white py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6a2 2 0 110-4 2 2 0 010 4zm7-5.5V11a.5.5 0 01-.5.5h-2.18c-.46 0-.89.2-1.2.53l-1.92 2.05L9.62 10.9a1.002 1.002 0 00-1.2-.53L5.8 11.5H3.5a.5.5 0 01-.5-.5V8.5a.5.5 0 01.5-.5h2.18c.46 0 .89.2 1.2.53l1.92 2.05L14.38 8.1a1.002 1.002 0 001.2-.53L18.2 7.5H20.5a.5.5 0 01.5.5z" /></svg>
                        <h4 className="font-bold text-gray-800 text-lg">High Quality</h4>
                        <p className="text-gray-500 text-sm mt-1">crafted from excellent materials</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20.5H4a2 2 0 01-2-2v-12a2 2 0 012-2h12a2 2 0 012 2v6m-4 5l4-4M4 14.5l4-4m-2 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>
                        <h4 className="font-bold text-gray-800 text-lg">Warranty Protection</h4>
                        <p className="text-gray-500 text-sm mt-1">Over 2 years</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        <h4 className="font-bold text-gray-800 text-lg">Free Shipping</h4>
                        <p className="text-gray-500 text-sm mt-1">Order over 150 $</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-800 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4h2a1 1 0 001-1v-2a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zm-1-9.5V5m0 14v-1.5M4 12H2.5M21.5 12H20M12 4.5l-1.5-1.5m3 0L12 4.5" /></svg>
                        <h4 className="font-bold text-gray-800 text-lg">24 / 7 Support</h4>
                        <p className="text-gray-500 text-sm mt-1">Dedicated support</p>
                    </div>
                </div>
            </footer>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProduct ? "Update Product" : "Add New Product"}>
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                    <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                    <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                    <input type="text" name="category" placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || '' })} className="w-full p-2 border border-gray-300 rounded-lg" required />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-2 border border-gray-300 rounded-lg" required ></textarea>
                    <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                        {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                </form>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Delete">
                <p className="text-gray-700">Are you sure you want to delete {productToDelete?.name}?</p>
                <div className="flex justify-end mt-4 space-x-2">
                    <button onClick={handleDeleteProduct} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                        Delete
                    </button>
                </div>
            </Modal>

            <Toast message="Item added to cart!" isVisible={isToastVisible} onHide={() => setIsToastVisible(false)} />
        </div>
    );
};

export default Shop;