// lib/egg-data.ts

export type EggSize = {
  label: string;
  weight: string;
  price: number;
  image: string; // 1. Adicionado aqui
};

export type ShellType = {
  id: string;
  label: string;
  description: string;
  image: string;
};

export type Filling = {
  id: string;
  label: string;
  image: string;
};

export type Topping = {
  id: string;
  label: string;
  image: string;
};

// 2. Adicionados os caminhos das imagens para os tamanhos
export const EGG_SIZES: EggSize[] = [
  {
    label: "200g",
    weight: "200g",
    price: 29.9,
    image: "/images/tamanhos/tamanho_200.webp",
  },
  {
    label: "300g",
    weight: "300g",
    price: 44.9,
    image: "/images/tamanhos/tamanho_300.jpg",
  },
  {
    label: "500g",
    weight: "500g",
    price: 59.9,
    image: "/images/tamanhos/tamanho_500.jpg",
  },
];

export const SHELL_TYPES: ShellType[] = [
  {
    id: "ao-leite",
    label: "Chocolate ao Leite",
    description: "Cremoso e classico",
    image: "/images/cascas/casca_ao_leite.jpg",
  },
  {
    id: "branco",
    label: "Chocolate Branco",
    description: "Suave e delicado",
    image: "/images/cascas/casca_branca.webp",
  },
];

export const FILLINGS: Filling[] = [
  {
    id: "brigadeiro",
    label: "Creme de brigadeiro",
    image: "/images/recheios/recheio_brigadeiro.webp",
  },
  {
    id: "ninho",
    label: "Creme de ninho",
    image: "/images/recheios/recheio_ninho.webp",
  },
  {
    id: "prestigio",
    label: "Creme de prestígio",
    image: "/images/recheios/recheio_prestigio.jpg",
  },
  {
    id: "morango",
    label: "Creme de morango",
    image: "/images/recheios/recheio_morango.jpg",
  },
  {
    id: "maracuja",
    label: "Creme de maracujá",
    image: "/images/recheios/recheio_maracuja.jpg",
  },
  {
    id: "caribe",
    label: "Creme de caribe",
    image: "/images/recheios/recheio_caribe.webp",
  },
  {
    id: "amendoim",
    label: "Creme de amendoim",
    image: "/images/recheios/recheio_amendoim.webp",
  },
  {
    id: "oreo",
    label: "Creme de Oreo",
    image: "/images/recheios/recheio_oreo.jpg",
  },
];

export const TOPPINGS: Topping[] = [
  { id: "morango", label: "Morango", image: "/images/adicionais/morango.webp" },
  { id: "m&m", label: "M&M", image: "/images/adicionais/mm.jpg" },
  {
    id: "prestigio",
    label: "Bombom Prestígio",
    image: "/images/adicionais/prestigio.jpg",
  },
  {
    id: "caribe",
    label: "Bombom Caribe",
    image: "/images/adicionais/caribe.jpg",
  },
  {
    id: "gotas",
    label: "Gotas de Chocolate",
    image: "/images/adicionais/gotas.webp",
  },
  {
    id: "marshmallow",
    label: "Marshmallow",
    image: "/images/adicionais/marshmallow.webp",
  },
  {
    id: "amendoim",
    label: "Amendoim",
    image: "/images/adicionais/amendoim.jpg",
  },
  { id: "oreo", label: "Biscoito Oreo", image: "/images/adicionais/oreo.jpg" },
  {
    id: "chocoball",
    label: "Chocoball",
    image: "/images/adicionais/chocoball.webp",
  },
  {
    id: "pacoquita",
    label: "Paçoquita",
    image: "/images/adicionais/pacoquita.webp",
  },
  { id: "fini", label: "Fini", image: "/images/adicionais/fini.jpg" },
  { id: "jujuba", label: "Jujuba", image: "/images/adicionais/jujuba.webp" },
];

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function calculatePrice(sizeIndex: number | null): number {
  if (sizeIndex === null) return 0;
  return EGG_SIZES[sizeIndex].price;
}
