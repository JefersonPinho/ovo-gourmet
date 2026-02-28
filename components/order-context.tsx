"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import { EGG_SIZES, calculatePrice, type EggSize } from "@/lib/egg-data";

export type PaymentMethod = "pix" | "dinheiro" | "cartao" | null;
export type DeliveryMode = "entrega" | "retirada" | null;

export type DeliveryAddress = {
  rua: string;
  numero: string;
  bairro: string;
  referencia: string;
};

type OrderState = {
  sizeIndex: number | null;
  shell: string | null;
  fillings: string[];
  toppings: string[];
  customerName: string;
  paymentMethod: PaymentMethod;
  needsChange: boolean;
  changeFor: string;
  deliveryMode: DeliveryMode;
  address: DeliveryAddress;
};

type OrderAction =
  | { type: "SET_SIZE"; index: number }
  | { type: "SET_SHELL"; shell: string }
  | { type: "TOGGLE_FILLING"; filling: string }
  | { type: "TOGGLE_TOPPING"; topping: string }
  | { type: "SET_CUSTOMER_NAME"; name: string }
  | { type: "SET_PAYMENT_METHOD"; method: PaymentMethod }
  | { type: "SET_NEEDS_CHANGE"; needs: boolean }
  | { type: "SET_CHANGE_FOR"; value: string }
  | { type: "SET_DELIVERY_MODE"; mode: DeliveryMode }
  | { type: "SET_ADDRESS_FIELD"; field: keyof DeliveryAddress; value: string }
  | { type: "RESET" };

const initialAddress: DeliveryAddress = {
  rua: "",
  numero: "",
  bairro: "",
  referencia: "",
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "SET_SIZE":
      return { ...state, sizeIndex: action.index };
    case "SET_SHELL":
      return { ...state, shell: action.shell };
    case "TOGGLE_FILLING": {
      if (state.fillings.includes(action.filling)) {
        return {
          ...state,
          fillings: state.fillings.filter((f) => f !== action.filling),
        };
      }
      return { ...state, fillings: [...state.fillings, action.filling] };
    }
    case "TOGGLE_TOPPING": {
      if (state.toppings.includes(action.topping)) {
        return {
          ...state,
          toppings: state.toppings.filter((t) => t !== action.topping),
        };
      }
      return { ...state, toppings: [...state.toppings, action.topping] };
    }
    case "SET_CUSTOMER_NAME":
      return { ...state, customerName: action.name };
    case "SET_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.method,
        needsChange: action.method === "dinheiro" ? state.needsChange : false,
        changeFor: action.method === "dinheiro" ? state.changeFor : "",
      };
    case "SET_NEEDS_CHANGE":
      return {
        ...state,
        needsChange: action.needs,
        changeFor: action.needs ? state.changeFor : "",
      };
    case "SET_CHANGE_FOR":
      return { ...state, changeFor: action.value };
    case "SET_DELIVERY_MODE":
      return {
        ...state,
        deliveryMode: action.mode,
        address: action.mode === "entrega" ? state.address : initialAddress,
      };
    case "SET_ADDRESS_FIELD":
      return {
        ...state,
        address: { ...state.address, [action.field]: action.value },
      };
    case "RESET":
      return {
        sizeIndex: null,
        shell: null,
        fillings: [],
        toppings: [],
        customerName: "",
        paymentMethod: null,
        needsChange: false,
        changeFor: "",
        deliveryMode: null,
        address: initialAddress,
      };
    default:
      return state;
  }
}

type OrderContextType = {
  order: OrderState;
  setSize: (index: number) => void;
  setShell: (shell: string) => void;
  toggleFilling: (filling: string) => void;
  toggleTopping: (topping: string) => void;
  setCustomerName: (name: string) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNeedsChange: (needs: boolean) => void;
  setChangeFor: (value: string) => void;
  setDeliveryMode: (mode: DeliveryMode) => void;
  setAddressField: (field: keyof DeliveryAddress, value: string) => void;
  totalPrice: number;
  currentSize: EggSize | null;
  isProductComplete: boolean;
  isFormComplete: boolean;
  resetOrder: () => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, dispatch] = useReducer(orderReducer, {
    sizeIndex: null,
    shell: null,
    fillings: [],
    toppings: [],
    customerName: "",
    paymentMethod: null,
    needsChange: false,
    changeFor: "",
    deliveryMode: null,
    address: initialAddress,
  });

  const currentSize =
    order.sizeIndex !== null ? EGG_SIZES[order.sizeIndex] : null;
  const totalPrice = calculatePrice(order.sizeIndex, order.toppings);

  const isProductComplete =
    order.sizeIndex !== null &&
    order.shell !== null &&
    order.fillings.length > 0;
  const addressValid =
    order.deliveryMode === "retirada" ||
    (order.address.rua.trim() !== "" &&
      order.address.numero.trim() !== "" &&
      order.address.bairro.trim() !== "");
  const paymentValid =
    order.paymentMethod !== null &&
    (order.paymentMethod !== "dinheiro" ||
      !order.needsChange ||
      order.changeFor.trim() !== "");

  const isFormComplete =
    isProductComplete &&
    order.customerName.trim() !== "" &&
    order.deliveryMode !== null &&
    addressValid &&
    paymentValid;

  return (
    <OrderContext.Provider
      value={{
        order,
        setSize: (index) => dispatch({ type: "SET_SIZE", index }),
        setShell: (shell) => dispatch({ type: "SET_SHELL", shell }),
        toggleFilling: (filling) =>
          dispatch({ type: "TOGGLE_FILLING", filling }),
        toggleTopping: (topping) =>
          dispatch({ type: "TOGGLE_TOPPING", topping }),
        setCustomerName: (name) =>
          dispatch({ type: "SET_CUSTOMER_NAME", name }),
        setPaymentMethod: (method) =>
          dispatch({ type: "SET_PAYMENT_METHOD", method }),
        setNeedsChange: (needs) =>
          dispatch({ type: "SET_NEEDS_CHANGE", needs }),
        setChangeFor: (value) => dispatch({ type: "SET_CHANGE_FOR", value }),
        setDeliveryMode: (mode) =>
          dispatch({ type: "SET_DELIVERY_MODE", mode }),
        setAddressField: (field, value) =>
          dispatch({ type: "SET_ADDRESS_FIELD", field, value }),
        totalPrice,
        currentSize,
        isProductComplete,
        isFormComplete,
        resetOrder: () => dispatch({ type: "RESET" }),
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
