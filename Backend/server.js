const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// In-memory data store for products
let products = [
    { id: 1, name: 'Syltherine', brand: 'Furniro', category: 'Chair', price: 2500000, description: 'Stylish cafe chair', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
    { id: 2, name: 'Leviosa', brand: 'Furniro', category: 'Sofa', price: 2500000, description: 'Minimalist sofa', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 3, name: 'Lolito', brand: 'Furniro', category: 'Sofa', price: 7000000, description: 'Luxury big sofa', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 4, name: 'Respira', brand: 'Furniro', category: 'Table', price: 500000, description: 'Minimalist table', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
    { id: 5, name: 'Granger', brand: 'Furniro', category: 'Bed', price: 6000000, description: 'Comfortable bed', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 6, name: 'Antero', brand: 'Furniro', category: 'Desk', price: 3500000, description: 'Modern desk', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
    { id: 7, name: 'Aether', brand: 'Furniro', category: 'Lamp', price: 950000, description: 'Retro desk lamp', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop' },
    { id: 8, name: 'Cosmo', brand: 'Furniro', category: 'Chair', price: 1800000, description: 'Ergonomic chair', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
    { id: 9, name: 'Rayan', brand: 'IKEA', category: 'Lamp', price: 850000, description: 'Classic standing lamp', image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop' },
    { id: 10, name: 'Vento', brand: 'IKEA', category: 'Table', price: 900000, description: 'Small coffee table', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
    { id: 11, name: 'Lumi', brand: 'FurnitureCo', category: 'Chair', price: 3100000, description: 'Stylish and modern chair', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
    { id: 12, name: 'Dante', brand: 'FurnitureCo', category: 'Sofa', price: 8500000, description: 'Extra large corner sofa', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 13, name: 'Pluto', brand: 'DecorHome', category: 'Desk', price: 4200000, description: 'Simple office desk', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
    { id: 14, name: 'Nebula', brand: 'DecorHome', category: 'Bed', price: 7800000, description: 'Queen size bed frame', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
    { id: 15, name: 'Orbit', brand: 'DecorHome', category: 'Table', price: 1200000, description: 'Dining table with glass top', image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop' },
    { id: 16, name: 'Luna', brand: 'DecorHome', category: 'Chair', price: 2800000, description: 'Wooden dining chair', image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=300&fit=crop' },
];
app.get('/products', (req, res) => {
    let filtered = [...products];
    const { brand, category, priceMin, priceMax, sort, page, limit } = req.query;

    // Filtering
    if (brand) filtered = filtered.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    if (category) filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (priceMin || priceMax) {
        const min = parseFloat(priceMin) || 0;
        const max = parseFloat(priceMax) || Infinity;
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }

    // Sorting
    if (sort) {
        switch (sort) {
            case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
            case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'name-asc': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
            case 'name-desc': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
        }
    }

    // Pagination
    const itemsPerPage = parseInt(limit) || 8;
    const currentPage = parseInt(page) || 1;
    const totalProducts = filtered.length;
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    res.json({
        products: paginated,
        totalProducts,
        totalPages: Math.ceil(totalProducts / itemsPerPage),
        brands: [...new Set(products.map(p => p.brand))],
        categories: [...new Set(products.map(p => p.category))]
    });
});

//Add a product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    if (!newProduct.image) {
        // Use a default static image
        newProduct.image = 'https://images.unsplash.com/photo-1582582429013-6f3fdfcba0d5';
    }
    products.push(newProduct);
    res.status(201).json(newProduct);
});

//Update a product
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({ message: 'Product not found' });

    products[index] = { ...products[index], ...req.body, id };
    res.json(products[index]);
});

//Delete a product
app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length < initialLength) res.status(204).send();
    else res.status(404).json({ message: 'Product not found' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
