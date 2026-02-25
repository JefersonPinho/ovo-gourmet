export type EggSize = {
  label: string
  weight: string
  price: number
  maxFillings: number
  maxToppings: number
}

export type ShellType = {
  id: string
  label: string
  description: string
}

export type Filling = {
  id: string
  label: string
}

export type Topping = {
  id: string
  label: string
  price: number
}

export const EGG_SIZES: EggSize[] = [
  { label: "250g", weight: "250g", price: 39.90, maxFillings: 1, maxToppings: 2 },
  { label: "350g", weight: "350g", price: 49.90, maxFillings: 1, maxToppings: 3 },
  { label: "500g", weight: "500g", price: 69.90, maxFillings: 2, maxToppings: 4 },
  { label: "750g", weight: "750g", price: 89.90, maxFillings: 2, maxToppings: 5 },
]

export const SHELL_TYPES: ShellType[] = [
  { id: "ao-leite", label: "Chocolate ao Leite", description: "Cremoso e classico" },
  { id: "branco", label: "Chocolate Branco", description: "Suave e delicado" },
  { id: "meio-a-meio", label: "Meio a Meio", description: "Metade ao leite, metade branco" },
  { id: "70-cacau", label: "70% Cacau", description: "Intenso e marcante" },
]

export const FILLINGS: Filling[] = [
  { id: "brigadeiro", label: "Brigadeiro Gourmet" },
  { id: "ninho-nutella", label: "Ninho com Nutella" },
  { id: "oreo", label: "Oreo Cremoso" },
  { id: "ferrero", label: "Ferrero Rocher" },
  { id: "prestigio", label: "Prestigio" },
  { id: "maracuja", label: "Maracuja Trufado" },
  { id: "mousse-morango", label: "Mousse de Morango" },
]

export const TOPPINGS: Topping[] = [
  { id: "granulado", label: "Granulado Belga", price: 0 },
  { id: "morango", label: "Morango Fresco", price: 3.00 },
  { id: "kinder-bueno", label: "Kinder Bueno", price: 4.00 },
  { id: "kitkat", label: "KitKat", price: 3.00 },
  { id: "nutella", label: "Nutella Extra", price: 4.00 },
  { id: "leite-ninho", label: "Leite Ninho", price: 0 },
  { id: "ovomaltine", label: "Ovomaltine", price: 0 },
]

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}

export function calculatePrice(
  sizeIndex: number | null,
  toppings: string[]
): number {
  if (sizeIndex === null) return 0
  let total = EGG_SIZES[sizeIndex].price
  toppings.forEach((tId) => {
    const top = TOPPINGS.find((t) => t.id === tId)
    if (top) total += top.price
  })
  return total
}
