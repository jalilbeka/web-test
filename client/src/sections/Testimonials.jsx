import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Alex Rivera",
        role: "CTO, TechStart",
        text: "The level of creativity and technical skill shown was unmatched. Our platform looks absolutely stunning."
    },
    {
        name: "Sarah Chen",
        role: "Product Lead, Innovate Corp",
        text: "Delivered beyond expectations. The 3D interactions added a layer of polish we didn't know we needed."
    },
    {
        name: "Michael Ross",
        role: "Founder, FutureStudio",
        text: "A true professional who understands modern web trends. The neon aesthetic fits our brand perfectly."
    }
];

const Testimonials = () => {
    return (
        <section className="min-h-screen w-full py-20 px-4 md:px-20 relative flex items-center">
            <div className="max-w-6xl mx-auto w-full">
                <motion.h2
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-20 text-neonViolet"
                >
                    CLIENT <span className="text-white">FEEDBACK</span>
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-8 rounded-2xl relative"
                        >
                            <div className="text-6xl text-neonViolet/20 font-serif absolute top-4 left-6">"</div>
                            <p className="text-gray-300 mb-6 relative z-10">{t.text}</p>
                            <div>
                                <div className="font-bold text-white">{t.name}</div>
                                <div className="text-sm text-gray-500">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
