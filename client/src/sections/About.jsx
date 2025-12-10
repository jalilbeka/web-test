import { motion } from 'framer-motion';

const skills = [
    { name: "React / Next.js", level: 95 },
    { name: "Three.js / WebGL", level: 85 },
    { name: "Node.js / Express", level: 90 },
    { name: "TailwindCSS", level: 98 },
];

const About = () => {
    return (
        <section className="min-h-screen w-full py-20 px-4 md:px-20 flex flex-col justify-center relative bg-black/20 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto w-full"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-12 text-white">
                    <span className="text-neonMagenta">#</span> ABOUT ME
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            I am a digital artisan crafting immersive web experiences. My passion lies in blending cutting-edge technology with artistic design to create websites that are not just functional, but unforgettable.
                        </p>
                        <p className="text-gray-300 text-lg leading-relaxed">
                            Specializing in the Javascript ecosystem, I push the boundaries of what's possible on the web using WebGL and modern animation libraries.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-neonCyan font-mono">{skill.name}</span>
                                    <span className="text-white font-mono">{skill.level}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1, delay: 0.2 * index }}
                                        className="h-full bg-gradient-to-r from-neonCyan to-neonViolet"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
