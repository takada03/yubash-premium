import { create } from 'zustand'
export const useCart = create((set)=>({
items:[],
addToCart:(product)=>set((state)=>({items:[...state.items,product]}))
}))
