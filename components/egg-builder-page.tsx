"use client"

import { OrderProvider, useOrder } from "@/components/order-context"
import { HeroSection } from "@/components/hero-section"
import { SizeSelector } from "@/components/size-selector"
import { ShellSelector } from "@/components/shell-selector"
import { FillingSelector } from "@/components/filling-selector"
import { ToppingSelector } from "@/components/topping-selector"
import { CustomerInfoSection } from "@/components/customer-info"
import { OrderSummary } from "@/components/order-summary"
import { MobileStickyBar } from "@/components/mobile-sticky-bar"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

function StepIndicator() {
  const { order } = useOrder()

  const steps = [
    { label: "Tamanho", done: order.sizeIndex !== null },
    { label: "Casca", done: order.shell !== null },
    { label: "Recheio", done: order.fillings.length > 0 },
    { label: "Coberturas", done: order.toppings.length > 0 },
    { label: "Dados", done: order.customerName.trim() !== "" },
    { label: "Pagamento", done: order.paymentMethod !== null },
    { label: "Entrega", done: order.deliveryMode !== null },
  ]

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 font-[var(--font-inter)] md:gap-2">
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1 md:gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 md:h-8 md:w-8 md:text-xs",
                step.done
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {step.done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
            </div>
            <span className="hidden text-[10px] font-medium text-muted-foreground sm:block">
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={cn(
                "mb-4 hidden h-0.5 w-4 rounded-full transition-all duration-300 sm:block md:w-8",
                step.done ? "bg-accent" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function BuilderContent() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />

      <main id="montar" className="mx-auto max-w-7xl px-4 py-10 pb-32 lg:pb-10">
        <div className="mb-10">
          <StepIndicator />
        </div>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8">
          {/* Left: Selection area */}
          <div className="flex-1 space-y-10">
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <SizeSelector />
            </motion.div>
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ShellSelector />
            </motion.div>
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <FillingSelector />
            </motion.div>
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <ToppingSelector />
            </motion.div>

            {/* Dados do cliente, pagamento, entrega */}
            <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <CustomerInfoSection />
            </motion.div>

            {/* Mobile: order summary inline */}
            <div className="lg:hidden">
              <OrderSummary />
            </div>
          </div>

          {/* Right: Sticky summary sidebar (desktop) */}
          <div className="hidden lg:block lg:w-[360px]">
            <div className="sticky top-6">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-primary py-6 text-center">
        <p className="font-[var(--font-inter)] text-sm text-primary-foreground/60">
          {"Ovo de Colher Gourmet"} &copy; {new Date().getFullYear()} &mdash; {"Feito com amor"}
        </p>
      </footer>

      <MobileStickyBar />
    </div>
  )
}

export function EggBuilderPage() {
  return (
    <OrderProvider>
      <BuilderContent />
    </OrderProvider>
  )
}
