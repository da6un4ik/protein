const recipes = [
  {
    name: 'Омлет с творогом',
    protein: 34,
    ingredients: ['3 яйца', '120 г творога 5%', 'зелень', 'соль по вкусу'],
  },
  {
    name: 'Курица с киноа',
    protein: 42,
    ingredients: ['160 г куриного филе', '70 г киноа', 'огурец', 'помидор'],
  },
  {
    name: 'Йогурт-боул',
    protein: 28,
    ingredients: ['250 г греческого йогурта', '30 г протеина', 'ягоды', 'семена чиа'],
  },
]

const app = document.getElementById('app')
const recipesNode = document.getElementById('recipes')
const summaryNode = document.getElementById('summary')
const toggleButton = document.getElementById('themeToggle')

const totalProtein = recipes.reduce((sum, recipe) => sum + recipe.protein, 0)
summaryNode.textContent = `Всего белка в подборке: ${totalProtein} г`

for (const recipe of recipes) {
  const card = document.createElement('article')
  card.className = 'card'

  const title = document.createElement('h2')
  title.textContent = recipe.name

  const protein = document.createElement('p')
  protein.textContent = `${recipe.protein} г белка`

  const list = document.createElement('ul')
  recipe.ingredients.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    list.appendChild(li)
  })

  card.append(title, protein, list)
  recipesNode.appendChild(card)
}

const applyTheme = (theme) => {
  const isDark = theme === 'dark'
  app.classList.toggle('dark', isDark)
  toggleButton.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема'
}

const savedTheme = localStorage.getItem('theme') || 'light'
applyTheme(savedTheme)

toggleButton.addEventListener('click', () => {
  const nextTheme = app.classList.contains('dark') ? 'light' : 'dark'
  localStorage.setItem('theme', nextTheme)
  applyTheme(nextTheme)
})
