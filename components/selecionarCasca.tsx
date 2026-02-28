"use client";

import { cn } from "@/lib/utils";
import { useOrder } from "@/components/order-context";
import { SHELL_TYPES } from "@/lib/egg-data";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const SHELL_COLORS: Record<string, string> = {
  "ao-leite": "bg-[#6B3A2A]",
  branco: "bg-[#F5F0E8]",
  // Ajustei levemente o gradiente para dar um efeito de corte mais limpo no "meio a meio"
  "meio-a-meio": "bg-gradient-to-br from-[#6B3A2A] 50% to-[#F5F0E8] 50%",
  "70-cacau": "bg-[#3B1E0E]",
};

export function SelecionarCasca() {
  const { order, setShell } = useOrder();

  return (
    <section className="space-y-8">
      {/* Cabeçalho Refinado */}
      <div className="flex flex-col items-start text-left">
        <h2 className="text-3xl font-bold text-foreground font-serif tracking-tight">
          2. Tipo de Casca
        </h2>
        <p className="mt-2 text-sm text-muted-foreground tracking-widest uppercase text-[11px] font-semibold">
          Selecione o chocolate da sua casca
        </p>
      </div>

      {/* Grid de Seleção Premium */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SHELL_TYPES.map((shell) => {
          const isSelected = order.shell === shell.id;

          return (
            <motion.button
              key={shell.id}
              onClick={() => setShell(shell.id)}
              className={cn(
                "group relative flex w-full flex-col items-center justify-start overflow-hidden rounded-3xl border bg-card p-8 transition-all duration-500 ease-out outline-none",
                isSelected
                  ? "border-accent shadow-[0_10px_40px_-15px_rgba(var(--accent),0.4)] ring-1 ring-accent"
                  : "border-border/40 hover:border-accent/40 hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1",
              )}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Fundo sutil para o item selecionado */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-50" />
              )}

              {/* Esfera de Cor do Chocolate Premium */}
              <div className="relative z-10 mb-6 flex items-center justify-center">
                <div
                  className={cn(
                    "h-16 w-16 rounded-full border-2 border-border/20 shadow-inner transition-transform duration-500 group-hover:scale-110",
                    SHELL_COLORS[shell.id],
                  )}
                />
                {/* Efeito de iluminação/brilho 3D por cima do círculo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 to-white/20 mix-blend-overlay pointer-events-none" />
              </div>

              {/* Informação da Casca */}
              <div className="relative flex flex-col items-center z-10 w-full">
                <span
                  className={cn(
                    "font-serif text-2xl font-medium tracking-tight text-center transition-colors duration-500",
                    isSelected
                      ? "text-accent"
                      : "text-foreground group-hover:text-accent/90",
                  )}
                >
                  {shell.label}
                </span>

                {/* Divisória Elegante */}
                <div
                  className={cn(
                    "my-4 h-[1px] transition-all duration-500 ease-in-out",
                    isSelected
                      ? "bg-accent/40 w-16"
                      : "bg-border/60 group-hover:bg-accent/30 group-hover:w-12 w-8",
                  )}
                />

                {/* Descrição usando font-sans para ficar com a Inter limpa e fácil de ler */}
                <span className="text-center font-sans text-xs leading-relaxed text-muted-foreground/80 line-clamp-3">
                  {shell.description}
                </span>
              </div>

              {/* Ícone Flutuante de Seleção (Mesmo padrão do anterior) */}
              {isSelected && (
                <motion.div
                  className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-accent backdrop-blur-sm"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
