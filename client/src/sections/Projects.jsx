import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: "Neon Cyberpunk City",
        description: "An interactive 3D city experience built with Three.js and WebGL. Explore the streets in a retro-futuristic environment.",
        tags: ["React", "Three.js", "WebGL"],
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop&q=80",
        link: "#",
        github: "#"
    },
    {
        title: "AI Dashboard Interface",
        description: "Futuristic dashboard for an AI analytics platform. Features real-time data visualization and holographic UI elements.",
        tags: ["Next.js", "D3.js", "Tailwind"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
        link: "#",
        github: "#"
    },
    {
        title: "Galaxy Ecommerce",
        description: "Space-themed shopping experience with gravity-based product interactions and seamless page transitions.",
        tags: ["React", "Framer Motion", "Stripe"],
        image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop&q=80",
        link: "#",
        github: "#"
    }
];

const Projects = () => {
    return (
        <section className="min-h-screen w-full py-20 px-4 md:px-20 relative">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-16 text-right w-full"
                >
                    SELECTED <span className="text-neonCyan">WORKS</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900/50 backdrop-blur-md border border-gray-800 p-6 rounded-xl hover:border-neonCyan transition-colors duration-300 group"
                        >
                            <div className="h-48 bg-gray-800 rounded-lg mb-6 overflow-hidden relative">
                                {/* Project Image */}
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-gray-700 hidden">
                                    Project Preview
                                </div>
                                <div className="absolute inset-0 bg-neonCyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <a 
                                        href={project.github} 
                                        onClick={(e) => {
                                            if (project.github === '#') {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="p-2 bg-black rounded-full hover:text-neonCyan transition-colors"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <a 
                                        href={project.link} 
                                        onClick={(e) => {
                                            if (project.link === '#') {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="p-2 bg-black rounded-full hover:text-neonCyan transition-colors"
                                    >
                                        <ExternalLink size={20} />
                                    </a>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                            <p className="text-gray-400 mb-6 text-sm leading-relaxed">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="text-xs font-mono text-neonCyan border border-neonCyan/30 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
