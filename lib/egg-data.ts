export type EggSize = {
  label: string;
  weight: string;
  price: number;
};

export type ShellType = {
  id: string;
  label: string;
  description: string;
};

export type Filling = {
  id: string;
  label: string;
};

export type Topping = {
  id: string;
  label: string;
  price: number;
};

export const EGG_SIZES: EggSize[] = [
  { label: "150g", weight: "150g", price: 29.9 },
  { label: "250g", weight: "250g", price: 39.9 },
  { label: "350g", weight: "350g", price: 49.9 },
];

export const SHELL_TYPES: ShellType[] = [
  {
    id: "ao-leite",
    label: "Chocolate ao Leite",
    description: "Cremoso e classico",
  },
  { id: "branco", label: "Chocolate Branco", description: "Suave e delicado" },
  {
    id: "meio-a-meio",
    label: "Meio a Meio",
    description: "Metade ao leite, metade branco",
  },
];

export const FILLINGS: Filling[] = [
  { id: "brigadeiro", label: "Brigadeiro" },
  { id: "ninho", label: "Ninho" },
  { id: "ninho-nutella", label: "Ninho com Nutella" },
  { id: "oreo", label: "Oreo" },
  { id: "caribe", label: "Caribe" },
  { id: "prestigio", label: "Prestigio" },
  { id: "maracuja", label: "Maracuja" },
  { id: "amendoim", label: "Amendoim" },
  { id: "morango", label: "Morango" },
];

export const TOPPINGS: Topping[] = [
  { id: "granulado", label: "Granulado", price: 2 },
  { id: "morango", label: "Morango", price: 2.0 },
  { id: "nutella", label: "Nutella Extra", price: 2.0 },
  { id: "leite-ninho", label: "Leite Ninho", price: 2.0 },
  { id: "ovomaltine", label: "Ovomaltine", price: 2.0 },
  { id: "coco", label: "Coco Ralado", price: 2.0 },
  { id: "amendoim", label: "Amendoim", price: 2.0 },
  { id: "oreo", label: "Biscoito Oreo", price: 2.0 },

];

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calculatePrice(
  sizeIndex: number | null,
  toppings: string[],
): number {
  if (sizeIndex === null) return 0;
  let total = EGG_SIZES[sizeIndex].price;
  toppings.forEach((tId) => {
    const top = TOPPINGS.find((t) => t.id === tId);
    if (top) total += top.price;
  });
  return total;
}
