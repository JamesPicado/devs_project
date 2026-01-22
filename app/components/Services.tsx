"use client";

import { motion } from "framer-motion";

const SERVICES_DATA = [
  {
    category: "Development",
    items: [
      {
        title: "Custom Web Applications",
        description: "We build hand-crafted apps from the ground up — backend, frontend, or both.",
      },
      {
        title: "Full-Stack Development",
        description: "From databases to design, we handle every layer with precision and care.",
      },
      {
        title: "Performance & Scalability",
        description: "We make sure your app not only looks good, but runs fast and grows easily.",
      },
    ],
  },
  {
    category: "Creative & Visual",
    items: [
      {
        title: "Photography Services",
        description: "Need great visuals? We help you capture images that elevate your project or brand.",
      },
      {
        title: "Design Integration",
        description: "Clean, modern interfaces built to make your users feel at home.",
      },
      {
        title: "Brand-Aligned Visuals",
        description: "From colors to layout, we make sure your digital presence feels consistent and unique.",
      },
    ],
  },
  {
    category: "Collaboration & Experience",
    items: [
      {
        title: "Built for Your Users",
        description: "Every project starts with understanding what your users actually want.",
      },
      {
        title: "Tailored to You",
        description: "No templates, no shortcuts — just software that fits you.",
      },
      {
        title: "Transparent Process",
        description: "We collaborate closely with you every step of the way.",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-[var(--foreground)]/70 max-w-2xl mx-auto text-lg">
            Designing and developing digital solutions tailored to any need, from interfaces and websites to applications and enterprise systems, including visual content, optimization, and continuous support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[var(--foreground)]/5 backdrop-blur-sm border border-[var(--foreground)]/10 rounded-2xl p-8 hover:bg-[var(--foreground)]/10 transition-colors duration-300"
            >
              <h3 className="text-xl font-bold mb-8 text-blue-400">
                {service.category}
              </h3>
              <div className="space-y-8">
                {service.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="group">
                    <h4 className="font-semibold text-lg mb-2 group-hover:text-blue-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[var(--foreground)]/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
