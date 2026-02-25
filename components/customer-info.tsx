"use client"

import { cn } from "@/lib/utils"
import { useOrder, type PaymentMethod, type DeliveryMode } from "@/components/order-context"
import { motion, AnimatePresence } from "framer-motion"
import { User, CreditCard, MapPin, Truck, Store } from "lucide-react"

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "pix", label: "Pix", icon: "pix" },
  { id: "dinheiro", label: "Dinheiro", icon: "cash" },
  { id: "cartao", label: "Cartao", icon: "card" },
]

const DELIVERY_OPTIONS: { id: DeliveryMode; label: string; description: string }[] = [
  { id: "entrega", label: "Entrega", description: "Receba no seu endereco" },
  { id: "retirada", label: "Retirada", description: "Retire no local" },
]

export function CustomerInfoSection() {
  const {
    order,
    setCustomerName,
    setPaymentMethod,
    setNeedsChange,
    setChangeFor,
    setDeliveryMode,
    setAddressField,
  } = useOrder()

  return (
    <section className="space-y-8">
      {/* Nome */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">5. Seus Dados</h2>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="customer-name" className="font-[var(--font-inter)] text-sm font-medium text-foreground">
            Seu Nome <span className="text-destructive">*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            value={order.customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full rounded-xl border-2 border-border bg-card px-4 py-3 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* Pagamento */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">6. Pagamento</h2>
        </div>
        <p className="font-[var(--font-inter)] text-sm text-muted-foreground">
          Selecione a forma de pagamento
        </p>
        <div className="grid grid-cols-3 gap-3">
          {PAYMENT_OPTIONS.map((opt) => {
            const isSelected = order.paymentMethod === opt.id
            return (
              <motion.button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border-2 px-3 py-5 font-[var(--font-inter)] transition-colors duration-200",
                  isSelected
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                    : "border-border bg-card hover:border-accent/40 hover:shadow-md"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {opt.icon === "pix" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className={cn(isSelected ? "text-accent" : "text-muted-foreground")}>
                    <path d="M17.176 14.639a2.56 2.56 0 0 1-1.822-.755l-2.676-2.676a.548.548 0 0 0-.756 0l-2.7 2.7a2.577 2.577 0 0 1-1.822.755h-.462l3.413 3.413a2.833 2.833 0 0 0 4.006 0l3.436-3.437h-.617ZM7.4 9.385a2.577 2.577 0 0 1 1.822.755l2.7 2.7a.548.548 0 0 0 .756 0l2.676-2.676a2.56 2.56 0 0 1 1.822-.755h.617L14.357 5.97a2.833 2.833 0 0 0-4.006 0L6.938 9.385h.462Z" fill="currentColor"/>
                    <path d="M20.03 10.643l-1.86-1.86h-1.07a1.597 1.597 0 0 0-1.134.47l-2.676 2.676a1.533 1.533 0 0 1-2.168 0L8.422 9.23a1.597 1.597 0 0 0-1.134-.47H6.13l-1.86 1.86a2.833 2.833 0 0 0 0 4.005l1.86 1.86h1.158a1.597 1.597 0 0 0 1.134-.47l2.7-2.7a1.493 1.493 0 0 1 2.168 0l2.676 2.676a1.597 1.597 0 0 0 1.134.47h1.094l1.86-1.86a2.833 2.833 0 0 0 0-4.005l-.024.047Z" fill="currentColor"/>
                  </svg>
                )}
                {opt.icon === "cash" && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn(isSelected ? "text-accent" : "text-muted-foreground")}>
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                )}
                {opt.icon === "card" && (
                  <CreditCard className={cn("h-6 w-6", isSelected ? "text-accent" : "text-muted-foreground")} />
                )}
                <span className={cn("text-sm font-semibold", isSelected ? "text-foreground" : "text-muted-foreground")}>
                  {opt.label}
                </span>
              </motion.button>
            )
          })}
        </div>

        {/* Troco condicional */}
        <AnimatePresence>
          {order.paymentMethod === "dinheiro" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 rounded-xl bg-secondary p-4">
                <div className="flex items-center gap-3">
                  <label className="font-[var(--font-inter)] text-sm font-medium text-foreground">
                    Precisa de troco?
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNeedsChange(true)}
                      className={cn(
                        "rounded-lg px-4 py-1.5 font-[var(--font-inter)] text-sm font-semibold transition-colors",
                        order.needsChange
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-muted-foreground border border-border"
                      )}
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setNeedsChange(false)}
                      className={cn(
                        "rounded-lg px-4 py-1.5 font-[var(--font-inter)] text-sm font-semibold transition-colors",
                        !order.needsChange
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-muted-foreground border border-border"
                      )}
                    >
                      Nao
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {order.needsChange && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label htmlFor="change-for" className="font-[var(--font-inter)] text-xs font-medium text-muted-foreground">
                        Troco para quanto? <span className="text-destructive">*</span>
                      </label>
                      <input
                        id="change-for"
                        type="text"
                        value={order.changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        placeholder="Ex: R$ 100,00"
                        className="mt-1 w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Entrega / Retirada */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-accent" />
          <h2 className="text-2xl font-bold text-foreground">7. Entrega</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {DELIVERY_OPTIONS.map((opt) => {
            const isSelected = order.deliveryMode === opt.id
            return (
              <motion.button
                key={opt.id}
                onClick={() => setDeliveryMode(opt.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-5 font-[var(--font-inter)] transition-colors duration-200",
                  isSelected
                    ? "border-accent bg-accent/10 shadow-lg shadow-accent/10"
                    : "border-border bg-card hover:border-accent/40 hover:shadow-md"
                )}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {opt.id === "entrega" ? (
                  <Truck className={cn("h-6 w-6", isSelected ? "text-accent" : "text-muted-foreground")} />
                ) : (
                  <Store className={cn("h-6 w-6", isSelected ? "text-accent" : "text-muted-foreground")} />
                )}
                <span className={cn("text-sm font-bold", isSelected ? "text-foreground" : "text-muted-foreground")}>
                  {opt.label}
                </span>
                <span className="text-center text-xs text-muted-foreground">{opt.description}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Campos de endereco */}
        <AnimatePresence>
          {order.deliveryMode === "entrega" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-3 rounded-xl bg-secondary p-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="addr-rua" className="font-[var(--font-inter)] text-xs font-medium text-muted-foreground">
                      Rua / Avenida <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="addr-rua"
                      type="text"
                      value={order.address.rua}
                      onChange={(e) => setAddressField("rua", e.target.value)}
                      placeholder="Nome da rua"
                      className="w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="addr-numero" className="font-[var(--font-inter)] text-xs font-medium text-muted-foreground">
                      Numero <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="addr-numero"
                      type="text"
                      value={order.address.numero}
                      onChange={(e) => setAddressField("numero", e.target.value)}
                      placeholder="N"
                      className="w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="addr-bairro" className="font-[var(--font-inter)] text-xs font-medium text-muted-foreground">
                      Bairro <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="addr-bairro"
                      type="text"
                      value={order.address.bairro}
                      onChange={(e) => setAddressField("bairro", e.target.value)}
                      placeholder="Bairro"
                      className="w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="addr-ref" className="font-[var(--font-inter)] text-xs font-medium text-muted-foreground">
                      Referencia <span className="text-muted-foreground/60">(Opcional)</span>
                    </label>
                    <input
                      id="addr-ref"
                      type="text"
                      value={order.address.referencia}
                      onChange={(e) => setAddressField("referencia", e.target.value)}
                      placeholder="Ponto de referencia"
                      className="w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 font-[var(--font-inter)] text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
