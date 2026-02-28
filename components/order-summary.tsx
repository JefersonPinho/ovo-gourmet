"use client";

import { useOrder } from "@/components/order-context";
import { motion } from "framer-motion";
import {
  EGG_SIZES,
  SHELL_TYPES,
  FILLINGS,
  TOPPINGS,
  formatPrice,
} from "@/lib/egg-data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PAYMENT_LABELS: Record<string, string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  cartao: "Cartão",
};

export function buildWhatsAppMessage(
  size: string,
  shell: string,
  fillings: string[],
  toppings: string[],
  total: number,
  customerName: string,
  paymentMethod: string,
  needsChange: boolean,
  changeFor: string,
  deliveryMode: string,
  address: { rua: string; numero: string; bairro: string; referencia: string },
) {
  const shellLabel = SHELL_TYPES.find((s) => s.id === shell)?.label ?? shell;
  const fillingLabels = fillings
    .map((fId) => FILLINGS.find((f) => f.id === fId)?.label ?? fId)
    .join(" + ");
  const toppingLabels =
    toppings.length > 0
      ? toppings
          .map((tId) => TOPPINGS.find((t) => t.id === tId)?.label ?? tId)
          .join(", ")
      : "Nenhuma";

  const lines = [
    `Olá! Gostaria de fazer um pedido:`,
    ``,
    `*Nome:* ${customerName}`,
    ``,
    `*Tamanho:* ${size}`,
    `*Casca:* ${shellLabel}`,
    `*Recheios:* ${fillingLabels}`,
    `*Coberturas:* ${toppingLabels}`,
    ``,
    `*Pagamento:* ${PAYMENT_LABELS[paymentMethod] ?? paymentMethod}`,
  ];

  if (paymentMethod === "dinheiro" && needsChange && changeFor) {
    lines.push(`*Troco para:* ${changeFor}`);
  }

  lines.push(``);

  if (deliveryMode === "entrega") {
    lines.push(`*Entrega no endereço:*`);
    lines.push(`${address.rua}, ${address.numero}`);
    lines.push(`${address.bairro}`);
    if (address.referencia) lines.push(`Ref: ${address.referencia}`);
  } else {
    lines.push(`*Retirada no local*`);
  }

  lines.push(``);
  lines.push(`*Valor total: ${formatPrice(total)}*`);
  lines.push(``);
  lines.push(`*Atenção:* O valor total ainda não inclui a taxa de entrega.`);

  return encodeURIComponent(lines.join("\n"));
}

export function OrderSummary() {
  const { order, totalPrice, currentSize } = useOrder();

  const sizeLabel = currentSize ? currentSize.weight : "Pendente";
  const shellLabel =
    SHELL_TYPES.find((s) => s.id === order.shell)?.label ?? "Pendente";
  const fillingLabels =
    order.fillings.length > 0
      ? order.fillings
          .map((fId) => FILLINGS.find((f) => f.id === fId)?.label ?? fId)
          .join(", ")
      : "Pendente";
  const toppingLabels =
    order.toppings.length > 0
      ? order.toppings
          .map((tId) => TOPPINGS.find((t) => t.id === tId)?.label ?? tId)
          .join(", ")
      : "Nenhuma";

  const warnAndScroll = (id: string, message: string) => {
    toast.error(message, { duration: 4000 });
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus({ preventScroll: true });
    }
  };

  const handleValidationAndSubmit = () => {
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
    window.open(`https://wa.me/5585982255592?text=${msg}`, "_blank");
  };

  return (
    <section className="space-y-8" id="resumo">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          Resumo do Pedido
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
          Confira antes de enviar
        </p>
      </div>

      <div className="divide-y divide-border/50 rounded-3xl border border-border/60 bg-card p-6 shadow-md">
        <SummaryRow
          label="Tamanho"
          value={sizeLabel}
          isPending={order.sizeIndex === null}
        />
        <SummaryRow label="Casca" value={shellLabel} isPending={!order.shell} />
        <SummaryRow
          label="Recheios"
          value={fillingLabels}
          isPending={order.fillings.length === 0}
        />
        <SummaryRow label="Coberturas" value={toppingLabels} />

        {order.customerName && (
          <SummaryRow label="Nome" value={order.customerName} />
        )}
        {order.paymentMethod && (
          <SummaryRow
            label="Pagamento"
            value={PAYMENT_LABELS[order.paymentMethod]}
          />
        )}
        {order.paymentMethod === "dinheiro" &&
          order.needsChange &&
          order.changeFor && (
            <SummaryRow label="Troco para" value={order.changeFor} />
          )}

        {order.deliveryMode && (
          <SummaryRow
            label="Entrega"
            value={
              order.deliveryMode === "retirada"
                ? "Retirada no local"
                : order.address.rua
                  ? `${order.address.rua}, ${order.address.numero} - ${order.address.bairro}`
                  : "Endereço pendente"
            }
          />
        )}

        <div className="flex items-center justify-between pt-6 mt-2">
          <span className="font-sans text-sm font-bold tracking-widest uppercase text-muted-foreground">
            Total
          </span>
          <motion.span
            key={totalPrice}
            className="font-serif text-4xl font-bold text-accent"
            initial={{ scale: 1.1, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {formatPrice(totalPrice)}
          </motion.span>
        </div>
      </div>

      <motion.button
        onClick={handleValidationAndSubmit}
        className="hidden lg:flex w-full items-center justify-center gap-3 rounded-full bg-accent px-6 py-5 font-sans text-base font-bold uppercase tracking-wide text-accent-foreground shadow-[0_10px_40px_-15px_rgba(var(--accent),0.5)] transition-all hover:brightness-110 active:scale-95"
        whileTap={{ scale: 0.98 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
        Enviar Pedido no WhatsApp
      </motion.button>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  isPending,
}: {
  label: string;
  value: string;
  isPending?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 font-sans">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={cn(
          "text-right text-sm font-semibold transition-colors",
          isPending ? "text-destructive" : "text-foreground",
        )}
      >
        {value}
      </span>
    </div>
  );
}
