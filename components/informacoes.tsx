"use client";

import { cn } from "@/lib/utils";
import {
  useOrder,
  type PaymentMethod,
  type DeliveryMode,
} from "@/components/order-context";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Store, Check } from "lucide-react";
import { formatPrice } from "@/lib/egg-data";

const PAYMENT_OPTIONS: { id: PaymentMethod; label: string }[] = [
  { id: "pix", label: "Pix" },
  { id: "dinheiro", label: "Dinheiro" },
  { id: "cartao", label: "Cartão" },
];

const DELIVERY_OPTIONS: {
  id: DeliveryMode;
  label: string;
  description: string;
}[] = [
  { id: "entrega", label: "Entrega", description: "Receba no seu endereço" },
  { id: "retirada", label: "Retirada", description: "Retire no local" },
];

export function Informacoes() {
  const {
    order,
    setCustomerName,
    setPaymentMethod,
    setNeedsChange,
    setChangeFor,
    setDeliveryMode,
    setAddressField,
    totalPrice,
  } = useOrder();

  const inputBaseClasses =
    "w-full rounded-2xl border border-border/50 bg-card px-5 py-4 font-sans text-base md:text-sm text-foreground placeholder:text-muted-foreground/40 transition-all focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none hover:border-border shadow-sm";

  // Lógica para converter o valor digitado em número válido
  let numericChangeFor = NaN;
  if (order.changeFor) {
    let clean = order.changeFor.replace(/[^\d.,]/g, "");
    if (clean.includes(",")) {
      clean = clean.replace(/\./g, "").replace(",", ".");
    }
    numericChangeFor = parseFloat(clean);
  }

  return (
    <section className="space-y-12">
      <div className="space-y-6">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
              5. Seus Dados
            </h2>
          </div>
          <p className="text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
            Como podemos te chamar?
          </p>
        </div>

        <div className="space-y-2 max-w-2xl">
          <label
            htmlFor="customer-name"
            className="font-sans text-[13px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
          >
            Seu Nome <span className="text-accent">*</span>
          </label>
          <input
            id="customer-name"
            type="text"
            value={order.customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Digite seu nome completo"
            className={inputBaseClasses}
          />
        </div>
      </div>

      <div className="h-[1px] w-full bg-border/40" />

      <div className="space-y-6">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
              6. Pagamento
            </h2>
          </div>
          <p className="text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
            Selecione a forma de acerto
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PAYMENT_OPTIONS.map((opt) => {
            const isSelected = order.paymentMethod === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className={cn(
                  "group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border bg-card p-5 transition-all duration-500 ease-out outline-none",
                  isSelected
                    ? "border-accent shadow-[0_5px_20px_-10px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                    : "border-border/40 hover:border-accent/40 hover:shadow-md hover:-translate-y-1",
                )}
                whileTap={{ scale: 0.97 }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
                )}
                <span
                  className={cn(
                    "font-sans text-sm font-semibold tracking-wide transition-colors z-10 relative",
                    isSelected
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent/80",
                  )}
                >
                  {opt.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {order.paymentMethod === "dinheiro" && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-5 rounded-3xl bg-secondary/30 p-6 border border-border/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <label className="font-sans text-sm font-semibold text-foreground">
                    Vai precisar de troco?
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNeedsChange(true)}
                      className={cn(
                        "rounded-xl px-6 py-2 font-sans text-sm font-semibold transition-all duration-300",
                        order.needsChange
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "bg-background border border-border/50 text-muted-foreground hover:border-accent/50",
                      )}
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setNeedsChange(false)}
                      className={cn(
                        "rounded-xl px-6 py-2 font-sans text-sm font-semibold transition-all duration-300",
                        !order.needsChange
                          ? "bg-accent text-accent-foreground shadow-md"
                          : "bg-background border border-border/50 text-muted-foreground hover:border-accent/50",
                      )}
                    >
                      Não
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {order.needsChange && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 pt-2"
                    >
                      <label
                        htmlFor="change-for"
                        className="font-sans text-[12px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
                      >
                        Troco para quanto?{" "}
                        <span className="text-accent">*</span>
                      </label>
                      <input
                        id="change-for"
                        type="text"
                        value={order.changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        placeholder="Ex: 100"
                        className={inputBaseClasses}
                      />

                      {/* UI do Cálculo do Troco */}
                      {order.changeFor.trim() !== "" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-sm font-sans px-1"
                        >
                          {isNaN(numericChangeFor) ? (
                            <span className="text-muted-foreground text-xs">
                              Digite apenas números e vírgulas.
                            </span>
                          ) : numericChangeFor < totalPrice ? (
                            <span className="text-destructive font-semibold text-[13px]">
                              Valor insuficiente (Total é{" "}
                              {formatPrice(totalPrice)})
                            </span>
                          ) : numericChangeFor === totalPrice ? (
                            <span className="text-green-600 font-semibold text-[13px]">
                              Valor exato, não será necessário troco.
                            </span>
                          ) : (
                            <span className="text-green-600 font-bold text-[13px] bg-green-500/10 px-3 py-1.5 rounded-lg inline-block shadow-sm">
                              Seu troco será:{" "}
                              {formatPrice(numericChangeFor - totalPrice)}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[1px] w-full bg-border/40" />

      <div className="space-y-6">
        <div className="flex flex-col items-start text-left">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
              7. Entrega
            </h2>
          </div>
          <p className="text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
            Como o ovo chegará até você?
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DELIVERY_OPTIONS.map((opt) => {
            const isSelected = order.deliveryMode === opt.id;
            return (
              <motion.button
                key={opt.id}
                onClick={() => setDeliveryMode(opt.id)}
                className={cn(
                  "group relative flex flex-col items-center justify-center gap-3 rounded-3xl border bg-card p-6 min-h-[140px] transition-all duration-500 ease-out outline-none",
                  isSelected
                    ? "border-accent shadow-[0_5px_20px_-10px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                    : "border-border/40 hover:border-accent/40 hover:shadow-md hover:-translate-y-1",
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
                )}

                <div
                  className={cn(
                    "p-3 rounded-full transition-colors z-10 relative",
                    isSelected
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent/70",
                  )}
                >
                  {opt.id === "entrega" ? (
                    <Truck className="h-6 w-6" />
                  ) : (
                    <Store className="h-6 w-6" />
                  )}
                </div>

                <div className="z-10 relative flex flex-col items-center gap-1">
                  <span
                    className={cn(
                      "font-sans text-sm font-bold tracking-wide transition-colors",
                      isSelected ? "text-accent" : "text-foreground",
                    )}
                  >
                    {opt.label}
                  </span>
                  <span className="text-center font-sans text-[11px] text-muted-foreground/80 line-clamp-2">
                    {opt.description}
                  </span>
                </div>

                {isSelected && (
                  <motion.div
                    className="absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {order.deliveryMode === "entrega" && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-4 rounded-3xl bg-secondary/30 p-6 border border-border/40 mt-2">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
                  <div className="space-y-2 sm:col-span-8">
                    <label
                      htmlFor="addr-rua"
                      className="font-sans text-[12px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
                    >
                      Rua / Avenida <span className="text-accent">*</span>
                    </label>
                    <input
                      id="addr-rua"
                      type="text"
                      value={order.address.rua}
                      onChange={(e) => setAddressField("rua", e.target.value)}
                      placeholder="Nome da sua rua"
                      className={inputBaseClasses}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-4">
                    <label
                      htmlFor="addr-numero"
                      className="font-sans text-[12px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
                    >
                      Número <span className="text-accent">*</span>
                    </label>
                    <input
                      id="addr-numero"
                      type="text"
                      value={order.address.numero}
                      onChange={(e) =>
                        setAddressField("numero", e.target.value)
                      }
                      placeholder="Ex: 123"
                      className={inputBaseClasses}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="addr-bairro"
                      className="font-sans text-[12px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
                    >
                      Bairro <span className="text-accent">*</span>
                    </label>
                    <input
                      id="addr-bairro"
                      type="text"
                      value={order.address.bairro}
                      onChange={(e) =>
                        setAddressField("bairro", e.target.value)
                      }
                      placeholder="Seu bairro"
                      className={inputBaseClasses}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="addr-ref"
                      className="font-sans text-[12px] font-semibold text-muted-foreground uppercase tracking-wide ml-1"
                    >
                      Referência{" "}
                      <span className="text-muted-foreground/50 font-normal">
                        (Opcional)
                      </span>
                    </label>
                    <input
                      id="addr-ref"
                      type="text"
                      value={order.address.referencia}
                      onChange={(e) =>
                        setAddressField("referencia", e.target.value)
                      }
                      placeholder="Ex: Perto do mercado"
                      className={inputBaseClasses}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
