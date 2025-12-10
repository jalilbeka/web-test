import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
            <div className="z-10 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-white to-neonViolet drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                >
                    CREATIVE
                    <br />
                    DEVELOPER
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase mb-8"
                >
                    Future-Ready Web Experiences
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 20px #00f3ff" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const projectsSection = document.querySelector('section:nth-of-type(3)');
                        if (projectsSection) {
                            projectsSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="px-8 py-3 border border-neonCyan text-neonCyan rounded-full uppercase tracking-widest hover:bg-neonCyan hover:text-black transition-colors duration-300 cursor-pointer"
                >
                    View Work
                </motion.button>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                className="absolute bottom-10"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-3 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
