"use client"

import { useOrder } from "@/components/order-context"
import { formatPrice } from "@/lib/egg-data"
import { motion, AnimatePresence } from "framer-motion"

export function MobileStickyBar() {
  const { totalPrice, order, isFormComplete } = useOrder()

  return (
    <AnimatePresence>
      {order.sizeIndex !== null && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 px-4 py-3.5 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-[var(--font-inter)] text-xs text-muted-foreground">Total do pedido</p>
              <p className="text-xl font-bold text-accent">{formatPrice(totalPrice)}</p>
            </div>
            <a
              href={isFormComplete ? "#resumo" : "#montar"}
              className="rounded-xl bg-accent px-5 py-2.5 font-[var(--font-inter)] text-sm font-bold text-accent-foreground shadow-md transition-all hover:brightness-110"
            >
              {isFormComplete ? "Enviar Pedido" : "Ver Resumo"}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
