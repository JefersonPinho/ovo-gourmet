"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-primary">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(198,167,94,0.15),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 md:py-24">
        <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="mb-3 font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Pascoa 2026
            </p>
            <h1 className="text-balance uppercase font-sans text-3xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Monte seu ovo
            </h1>
            <p className="mt-4 max-w-lg font-[var(--font-inter)] text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Escolha cada detalhe do seu ovo artesanal. Casca, recheio e coberturas feitos com os melhores ingredientes.
            </p>
            <motion.a
              href="#montar"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 font-[var(--font-inter)] text-sm font-bold text-accent-foreground shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Comece a Montar
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
            </motion.a>
          </motion.div>
          <motion.div
            className="relative h-64 w-64 flex-shrink-0 md:h-80 md:w-80 lg:h-[400px] lg:w-[400px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />
            <div className="absolute -inset-3 rounded-full border border-accent/20" />
            <Image
              src="/images/hero-egg.jpg"
              alt="Ovo gourmet com recheio de chocolate e coberturas"
              fill
              className="rounded-full object-cover shadow-2xl"
              priority
            />
          </motion.div>
        </div>
      </div>
    </header>
  )
}
