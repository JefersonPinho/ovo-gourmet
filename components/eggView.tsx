"use client";

import { OrderProvider } from "@/components/order-context";
import { SelecionarTamanho } from "@/components/selecionarTamanho";
import { SelecionarCasca } from "@/components/selecionarCasca";
import { SelecionarRecheio } from "@/components/selecionarRecheio";
import { SelecionarCobertura } from "@/components/selecionarAdicionais";
import { Informacoes } from "@/components/informacoes";
import { OrderSummary } from "@/components/order-summary";
import { MobileStickyBar } from "@/components/mobile-sticky-bar";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function BuilderContent() {
  return (
    <div className="min-h-screen bg-background">
      <main
        id="montar"
        className="mx-auto max-w-7xl px-5 py-12 pb-40 lg:pb-16 overflow-x-hidden"
      >
        {/* --- NOVO TÍTULO AQUI --- */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            Ovo de colher Gourmet
          </h1>
          {/* <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Personalize cada detalhe para a sua Páscoa
          </p> */}
          <div className="mt-6 h-1 w-20 rounded-full bg-accent/60" />
        </motion.div>
        {/* ------------------------ */}

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-10">
          <div className="flex-1 space-y-14">
            <motion.div
              id="step-tamanho"
              className="scroll-mt-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SelecionarTamanho />
            </motion.div>

            <motion.div
              id="step-casca"
              className="scroll-mt-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SelecionarCasca />
            </motion.div>

            <motion.div
              id="step-recheio"
              className="scroll-mt-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SelecionarRecheio />
            </motion.div>

            <motion.div
              id="step-cobertura"
              className="scroll-mt-24"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SelecionarCobertura />
            </motion.div>

            <motion.div
              className="scroll-mt-24 pt-4"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Informacoes />
            </motion.div>

            <div className="lg:hidden mt-8">
              <OrderSummary />
            </div>
          </div>

          <div className="hidden lg:block lg:w-[400px]">
            <div className="sticky top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      <MobileStickyBar />
    </div>
  );
}

export function EggViewPage() {
  return (
    <OrderProvider>
      <BuilderContent />
    </OrderProvider>
  );
}
