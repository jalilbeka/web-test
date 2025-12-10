import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'https://portfolio-backend-35po.onrender.com';
            console.log('Sending to:', `${apiUrl}/api/contact`);
            const response = await fetch(`${apiUrl}/api/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Response:', data);

            if (response.ok) {
                setStatus('Message Sent!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(data.message || 'Failed to send.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error sending message. Check console for details.');
        }
    };

    return (
        <section className="min-h-screen w-full py-20 px-4 md:px-20 relative flex flex-col justify-center items-center">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="max-w-2xl w-full bg-gray-900/50 backdrop-blur-lg p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl shadow-neonCyan/10"
            >
                <h2 className="text-4xl font-bold mb-8 text-center">
                    Let's <span className="text-neonCyan">Collaborate</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neonCyan transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neonCyan transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-neonCyan transition-colors"
                            required
                        />
                    </div>

                    <div className="border-2 border-neonCyan rounded-lg p-1 bg-black/30 shadow-[0_0_20px_rgba(0,243,255,0.5)]">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-gradient-to-r from-neonCyan to-neonViolet text-black font-bold py-4 rounded-lg uppercase tracking-wider hover:opacity-90 transition-opacity relative overflow-hidden"
                        >
                            <span className="relative z-10">{status || 'Send Message'}</span>
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </section>
    );
};

export default Contact;
