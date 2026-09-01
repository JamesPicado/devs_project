"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../LanguageContext";

const GALLERY_IMAGES = [
  { src: "/img_projects/DSC01634.jpg", alt: "Professional photography" },
  { src: "/img_projects/DSC01644.jpg", alt: "Creative visual capture" },
  { src: "/img_projects/DSC01661.jpg", alt: "Artistic composition" },
  { src: "/img_projects/DSC01672.jpg", alt: "Photography production" },
  { src: "/img_projects/DSC01698.jpg", alt: "Professional shot" },
] as const;

export default function Gallery() {
  const { language } = useLanguage();
  const es = language === "es";
  const [galleryModal, setGalleryModal] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  return (
    <>
      <section
        id="gallery"
        className="relative z-10 w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 sm:px-6 py-24"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold">
              {es ? "Galería" : "Gallery"}
            </h2>
            <p className="text-sm text-[var(--foreground)]/75 max-w-3xl mx-auto">
              {es
                ? "Fotografía profesional por"
                : "Professional photography by"}{" "}
              <a
                href="https://www.pexels.com/@jonathan-cordova-r-2637981/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Jonathan Cordova R.
              </a>
            </p>
          </div>

          <motion.div
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            {/* First row - 3 photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {GALLERY_IMAGES.slice(0, 3).map((image, idx) => (
                <motion.button
                  key={`${image.src}-${idx}`}
                  type="button"
                  onClick={() =>
                    setGalleryModal({ src: image.src, alt: image.alt })
                  }
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1"
                  style={{
                    aspectRatio: "1/1",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`transition-transform duration-700 group-hover:scale-110 ${
                      idx === 0 ? "object-cover object-bottom" : "object-cover"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs text-white/90 font-medium line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Second row - 2 photos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {GALLERY_IMAGES.slice(3, 5).map((image, idx) => (
                <motion.button
                  key={`${image.src}-${idx + 3}`}
                  type="button"
                  onClick={() =>
                    setGalleryModal({ src: image.src, alt: image.alt })
                  }
                  variants={{
                    hidden: { opacity: 0, scale: 0.9, y: 20 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 hover:-translate-y-1"
                  style={{
                    aspectRatio: "1/1",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-xs text-white/90 font-medium line-clamp-2">
                      {image.alt}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {galleryModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <button
            className="absolute inset-0 cursor-default"
            onClick={() => setGalleryModal(null)}
            aria-label="Close gallery"
          />

          <div className="relative z-10 flex items-center gap-6">
            {/* Left Arrow */}
            <button
              type="button"
              onClick={() => {
                const currentIndex = GALLERY_IMAGES.findIndex(
                  (img) => img.src === galleryModal.src,
                );
                const prevIndex =
                  currentIndex === 0
                    ? GALLERY_IMAGES.length - 1
                    : currentIndex - 1;
                setGalleryModal(GALLERY_IMAGES[prevIndex]);
              }}
              className="flex items-center justify-center h-10 w-10 text-white/60 hover:text-white text-3xl transition"
              aria-label="Previous image"
            >
              ‹
            </button>

            {/* Image Card */}
            <div className="relative inline-block overflow-hidden rounded-[24px] bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_40px_140px_rgba(0,0,0,0.7)]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setGalleryModal(null)}
                className="absolute top-4 right-4 z-20 flex items-center justify-center h-10 w-10 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-xl transition backdrop-blur-sm"
                aria-label="Close gallery"
              >
                ✕
              </button>

              <div className="p-6">
                <img
                  src={galleryModal.src}
                  alt={galleryModal.alt}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>
              <div className="px-6 pb-6 text-center space-y-2">
                <p className="text-[14px] uppercase tracking-[0.35em] text-white font-semibold">
                  {galleryModal.alt}
                </p>
                <p className="text-[11px] text-white/70">
                  {es
                    ? "Foto por Jonathan Cordova R."
                    : "Photo by Jonathan Cordova R."}
                </p>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              type="button"
              onClick={() => {
                const currentIndex = GALLERY_IMAGES.findIndex(
                  (img) => img.src === galleryModal.src,
                );
                const nextIndex =
                  currentIndex === GALLERY_IMAGES.length - 1
                    ? 0
                    : currentIndex + 1;
                setGalleryModal(GALLERY_IMAGES[nextIndex]);
              }}
              className="flex items-center justify-center h-10 w-10 text-white/60 hover:text-white text-3xl transition"
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
