"use client";

import { useOrder } from "@/components/order-context";
import { EGG_SIZES, formatPrice } from "@/lib/egg-data";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { buildWhatsAppMessage } from "@/components/order-summary";

export function MobileStickyBar() {
  const { totalPrice, order } = useOrder();

  const warnAndScroll = (id: string, message: string) => {
    toast.error(message, { duration: 4000 });
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus({ preventScroll: true });
    }
  };

  const handleCheckout = () => {
    if (order.sizeIndex === null)
      return warnAndScroll(
        "step-tamanho",
        "Por favor, escolha o tamanho do ovo.",
      );
    if (!order.shell)
      return warnAndScroll(
        "step-casca",
        "Por favor, escolha o chocolate da casca.",
      );
    if (order.fillings.length === 0)
      return warnAndScroll(
        "step-recheio",
        "Você esqueceu de escolher os recheios!",
      );

    if (!order.customerName.trim())
      return warnAndScroll(
        "customer-name",
        "Como podemos te chamar? Preencha seu nome.",
      );

    if (!order.paymentMethod)
      return warnAndScroll("step-pagamento", "Selecione a forma de pagamento.");
    if (
      order.paymentMethod === "dinheiro" &&
      order.needsChange &&
      !order.changeFor.trim()
    ) {
      return warnAndScroll("change-for", "Para quanto você precisa de troco?");
    }

    if (!order.deliveryMode)
      return warnAndScroll(
        "step-entrega",
        "Selecione se deseja entrega ou retirada.",
      );
    if (order.deliveryMode === "entrega") {
      if (!order.address.rua.trim())
        return warnAndScroll("addr-rua", "Faltou informar a rua para entrega.");
      if (!order.address.numero.trim())
        return warnAndScroll(
          "addr-numero",
          "Faltou informar o número do endereço.",
        );
      if (!order.address.bairro.trim())
        return warnAndScroll(
          "addr-bairro",
          "Faltou informar o bairro para entrega.",
        );
    }

    const msg = buildWhatsAppMessage(
      EGG_SIZES[order.sizeIndex].weight,
      order.shell,
      order.fillings,
      order.toppings,
      totalPrice,
      order.customerName,
      order.paymentMethod as string,
      order.needsChange,
      order.changeFor,
      order.deliveryMode as string,
      order.address,
    );
    window.open(`https://wa.me/5585988887023?text=${msg}`);
  };

  return (
    <AnimatePresence>
      {order.sizeIndex !== null && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/30 bg-background/85 px-5 py-4 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total do Pedido
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="rounded-full bg-accent px-8 py-3.5 font-sans text-[13px] font-bold uppercase tracking-wide text-accent-foreground shadow-[0_5px_15px_-5px_rgba(var(--accent),0.5)] transition-all hover:brightness-110 active:scale-95"
            >
              Enviar Pedido
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
