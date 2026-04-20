const FAVORITES_KEY = 'protein_app_favorites'
const SHOPPING_KEY = 'protein_app_shopping'

const safeParse = (value, fallback) => {
  try {
    return JSON.parse(value) ?? fallback
  } catch {
    return fallback
  }
}

export const loadFavorites = () => safeParse(localStorage.getItem(FAVORITES_KEY), [])
export const saveFavorites = (value) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(value))

export const loadShopping = () => safeParse(localStorage.getItem(SHOPPING_KEY), [])
export const saveShopping = (value) => localStorage.setItem(SHOPPING_KEY, JSON.stringify(value))
