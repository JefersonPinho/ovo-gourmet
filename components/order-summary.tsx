"use client"

import { useOrder } from "@/components/order-context"
import { motion } from "framer-motion"
import {
  EGG_SIZES,
  SHELL_TYPES,
  FILLINGS,
  TOPPINGS,
  formatPrice,
} from "@/lib/egg-data"

const PAYMENT_LABELS: Record<string, string> = {
  pix: "Pix",
  dinheiro: "Dinheiro",
  cartao: "Cartao",
}

function buildWhatsAppMessage(
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
  address: { rua: string; numero: string; bairro: string; referencia: string }
) {
  const shellLabel = SHELL_TYPES.find((s) => s.id === shell)?.label ?? shell
  const fillingLabels = fillings
    .map((fId) => FILLINGS.find((f) => f.id === fId)?.label ?? fId)
    .join(" + ")
  const toppingLabels =
    toppings.length > 0
      ? toppings
          .map((tId) => TOPPINGS.find((t) => t.id === tId)?.label ?? tId)
          .join(", ")
      : "Nenhuma"

  const lines = [
    `Ola! Gostaria de fazer um pedido:`,
    ``,
    `*Nome:* ${customerName}`,
    ``,
    `*Ovo de Colher ${size}*`,
    `*Casca:* ${shellLabel}`,
    `*Recheio:* ${fillingLabels}`,
    `*Coberturas:* ${toppingLabels}`,
    ``,
    `*Pagamento:* ${PAYMENT_LABELS[paymentMethod] ?? paymentMethod}`,
  ]

  if (paymentMethod === "dinheiro" && needsChange && changeFor) {
    lines.push(`*Troco para:* ${changeFor}`)
  }

  lines.push(``)

  if (deliveryMode === "entrega") {
    lines.push(`*Entrega no endereco:*`)
    lines.push(`${address.rua}, ${address.numero}`)
    lines.push(`${address.bairro}`)
    if (address.referencia) {
      lines.push(`Ref: ${address.referencia}`)
    }
  } else {
    lines.push(`*Retirada no local*`)
  }

  lines.push(``)
  lines.push(`*Valor total: ${formatPrice(total)}*`)

  return encodeURIComponent(lines.join("\n"))
}

export function OrderSummary() {
  const { order, totalPrice, currentSize, isFormComplete } = useOrder()

  const sizeLabel = currentSize ? currentSize.weight : "--"
  const shellLabel =
    SHELL_TYPES.find((s) => s.id === order.shell)?.label ?? "--"
  const fillingLabels =
    order.fillings.length > 0
      ? order.fillings
          .map((fId) => FILLINGS.find((f) => f.id === fId)?.label ?? fId)
          .join(", ")
      : "--"
  const toppingLabels =
    order.toppings.length > 0
      ? order.toppings
          .map((tId) => TOPPINGS.find((t) => t.id === tId)?.label ?? tId)
          .join(", ")
      : "Nenhuma"

  const handleWhatsApp = () => {
    if (!isFormComplete || order.sizeIndex === null || !order.shell || !order.paymentMethod || !order.deliveryMode) return
    const msg = buildWhatsAppMessage(
      EGG_SIZES[order.sizeIndex].weight,
      order.shell,
      order.fillings,
      order.toppings,
      totalPrice,
      order.customerName,
      order.paymentMethod,
      order.needsChange,
      order.changeFor,
      order.deliveryMode,
      order.address
    )
    window.open(`https://wa.me/?text=${msg}`, "_blank")
  }

  return (
    <section className="space-y-5" id="resumo">
      <h2 className="text-2xl font-bold text-foreground">Resumo do Pedido</h2>

      <div className="divide-y divide-border rounded-2xl border border-border bg-card p-5 shadow-sm">
        <SummaryRow label="Tamanho" value={sizeLabel} />
        <SummaryRow label="Casca" value={shellLabel} />
        <SummaryRow label="Recheio" value={fillingLabels} />
        <SummaryRow label="Coberturas" value={toppingLabels} />

        {order.customerName && (
          <SummaryRow label="Nome" value={order.customerName} />
        )}
        {order.paymentMethod && (
          <SummaryRow label="Pagamento" value={PAYMENT_LABELS[order.paymentMethod] ?? "--"} />
        )}
        {order.paymentMethod === "dinheiro" && order.needsChange && order.changeFor && (
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
                  : "Endereco pendente"
            }
          />
        )}

        <div className="flex items-center justify-between pt-4">
          <span className="font-sans text-lg font-bold text-foreground">Total</span>
          <motion.span
            key={totalPrice}
            className="text-3xl font-bold text-accent"
            initial={{ scale: 1.15, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {order.sizeIndex !== null ? formatPrice(totalPrice) : "--"}
          </motion.span>
        </div>
      </div>

      <motion.button
        onClick={handleWhatsApp}
        disabled={!isFormComplete}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4.5 font-[var(--font-inter)] text-base font-bold text-accent-foreground shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        whileHover={isFormComplete ? { scale: 1.02 } : {}}
        whileTap={isFormComplete ? { scale: 0.98 } : {}}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        Enviar Pedido no WhatsApp
      </motion.button>
      {!isFormComplete && (
        <p className="text-center font-[var(--font-inter)] text-xs text-muted-foreground">
          {!order.customerName.trim()
            ? "Preencha seu nome para continuar"
            : !order.paymentMethod
              ? "Selecione a forma de pagamento"
              : !order.deliveryMode
                ? "Selecione entrega ou retirada"
                : order.deliveryMode === "entrega" && (!order.address.rua.trim() || !order.address.numero.trim() || !order.address.bairro.trim())
                  ? "Preencha o endereco de entrega"
                  : "Selecione tamanho, casca e pelo menos 1 recheio"}
        </p>
      )}
    </section>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 font-[var(--font-inter)]">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}
