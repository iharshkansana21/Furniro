import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
    return (
        <div className="bg-gray-100 text-gray-800 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-amber-600 mb-4">Get in Touch</h2>
                    <p className="text-lg text-gray-600">We'd love to hear from you! Send us a message or find our contact details below.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-6 text-gray-900">Send Us a Message</h3>
                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="mt-1 block w-full rounded-md bg-gray-50 border-gray-300 text-gray-900 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg space-y-8">
                        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h3>
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 flex-shrink-0 text-amber-600" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">Our Location</p>
                                <p className="text-gray-600">123 Furniture St, Design City, DC 12345</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 flex-shrink-0 text-amber-600" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">Phone Number</p>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 flex-shrink-0 text-amber-600" />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-900">Email Address</p>
                                <p className="text-gray-600">info@furniture.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;