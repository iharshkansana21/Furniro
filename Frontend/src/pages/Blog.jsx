import React from 'react';

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: 'The Art of Minimalist Furniture',
            excerpt: 'Discover how less is more with minimalist designs that create a sense of calm and space in your home.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
            link: '#',
        },
        {
            id: 2,
            title: 'Sustainable Living: Eco-Friendly Furniture',
            excerpt: 'Learn about the materials and practices that make furniture both beautiful and kind to the planet.',
            image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=300&h=250&fit=crop',
            link: '#',
        },
        {
            id: 3,
            title: 'Maximizing Small Spaces with Smart Furniture',
            excerpt: 'Get expert tips on how to choose multi-functional furniture to make the most of every square foot.',
            image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop',
            link: '#',
        },
    ];

    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-4">Our Blog</h2>
                    <p className="text-lg text-gray-600">Insights and inspiration for your home decor.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-amber-500 mb-2">{post.title}</h3>
                                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                <a href={post.link} className="text-amber-600 hover:text-amber-400 font-medium transition-colors">
                                    Read More &rarr;
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;