import { useMemo, useState } from 'react'
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { proteinSources, recipes } from './data/recipes'
import { loadFavorites, loadShopping, saveFavorites, saveShopping } from './lib/storage'

const categoryNames = {
  proteins: 'Белки',
  vegetables: 'Овощи',
  grains: 'Крупы и зерновые',
  dairy: 'Молочные',
  other: 'Другое',
}

function App() {
  const [source, setSource] = useState('all')
  const [favorites, setFavorites] = useState(loadFavorites)
  const [shoppingList, setShoppingList] = useState(loadShopping)

  const filtered = useMemo(() => {
    if (source === 'all') return recipes
    return recipes.filter((r) => r.source === source)
  }, [source])

  const toggleFavorite = (id) => {
    const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id]
    setFavorites(next)
    saveFavorites(next)
  }

  const addIngredient = (ingredient) => {
    if (shoppingList.some((x) => x.name === ingredient.name)) return
    const next = [...shoppingList, { ...ingredient, checked: false }]
    setShoppingList(next)
    saveShopping(next)
  }

  const toggleShopping = (name) => {
    const next = shoppingList.map((item) => (item.name === name ? { ...item, checked: !item.checked } : item))
    setShoppingList(next)
    saveShopping(next)
  }

  const removeShopping = (name) => {
    const next = shoppingList.filter((item) => item.name !== name)
    setShoppingList(next)
    saveShopping(next)
  }

  return (
    <div className="screen-wrap">
      <nav className="top-nav glass">
        <Link to="/">Лента</Link>
        <Link to="/favorites">Избранное</Link>
        <Link to="/shopping">Список</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Feed filtered={filtered} source={source} setSource={setSource} favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetail favorites={favorites} toggleFavorite={toggleFavorite} addIngredient={addIngredient} />}
        />
        <Route path="/favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
        <Route
          path="/shopping"
          element={<Shopping shoppingList={shoppingList} toggleShopping={toggleShopping} removeShopping={removeShopping} />}
        />
      </Routes>
    </div>
  )
}

function Feed({ filtered, source, setSource, favorites, toggleFavorite }) {
  return (
    <>
      <h1 className="title">Protein Source Selector</h1>
      <div className="chips-row">
        {proteinSources.map((chip) => (
          <button key={chip.id} className={`chip glass ${source === chip.id ? 'active' : ''}`} onClick={() => setSource(chip.id)}>
            {chip.label}
          </button>
        ))}
      </div>

      <section className="feed">
        {filtered.map((recipe, idx) => (
          <motion.article
            className="feed-card glass"
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
          >
            <img src={recipe.image} alt={recipe.title} className="feed-image" />
            <div className="feed-content">
              <h2>{recipe.title}</h2>
              <p>{recipe.macros.protein}g protein • {recipe.calories} kcal</p>
              <div className="row">
                <Link className="btn" to={`/recipe/${recipe.id}`}>Открыть</Link>
                <button className="icon-btn" onClick={() => toggleFavorite(recipe.id)}>
                  {favorites.includes(recipe.id) ? '★' : '☆'}
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </>
  )
}

function RecipeDetail({ favorites, toggleFavorite, addIngredient }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const recipe = recipes.find((r) => r.id === id)

  if (!recipe) {
    return <div className="glass panel">Рецепт не найден.</div>
  }

  return (
    <motion.section className="detail glass" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="detail-hero">
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="detail-body">
        <div className="row">
          <h2>{recipe.title}</h2>
          <button className="icon-btn" onClick={() => toggleFavorite(recipe.id)}>
            {favorites.includes(recipe.id) ? '★' : '☆'}
          </button>
        </div>
        <p className="macro-row">
          {recipe.macros.protein}g P • {recipe.macros.fats}g F • {recipe.macros.carbs}g C • {recipe.calories} kcal
        </p>

        <h3>Ингредиенты</h3>
        <ul className="ingredients">
          {recipe.ingredients.map((item) => (
            <li key={item.name}>
              <span>{item.name} — {item.amount}</span>
              <button className="mini" onClick={() => addIngredient(item)}>+ в список</button>
            </li>
          ))}
        </ul>

        <h3>Шаги</h3>
        <ol className="steps">
          {recipe.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>

        <button className="btn" onClick={() => navigate(-1)}>Назад</button>
      </div>
    </motion.section>
  )
}

function Favorites({ favorites, toggleFavorite }) {
  const items = recipes.filter((r) => favorites.includes(r.id))
  return (
    <section>
      <h1 className="title">Favorites</h1>
      {items.length === 0 ? <div className="glass panel">Пока пусто.</div> : (
        <div className="feed">
          {items.map((recipe) => (
            <article className="feed-card glass" key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} className="feed-image" />
              <div className="feed-content">
                <h2>{recipe.title}</h2>
                <div className="row">
                  <Link className="btn" to={`/recipe/${recipe.id}`}>Открыть</Link>
                  <button className="icon-btn" onClick={() => toggleFavorite(recipe.id)}>★</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function Shopping({ shoppingList, toggleShopping, removeShopping }) {
  const grouped = shoppingList.reduce((acc, item) => {
    const key = item.category || 'other'
    acc[key] = [...(acc[key] || []), item]
    return acc
  }, {})

  return (
    <section>
      <h1 className="title">Smart Shopping List</h1>
      {shoppingList.length === 0 ? <div className="glass panel">Список пуст.</div> : Object.entries(grouped).map(([category, items]) => (
        <div className="glass panel" key={category}>
          <h3>{categoryNames[category] || category}</h3>
          <ul className="shopping-list">
            {items.map((item) => (
              <li key={item.name}>
                <label>
                  <input type="checkbox" checked={item.checked} onChange={() => toggleShopping(item.name)} />
                  <span className={item.checked ? 'checked' : ''}>{item.name} — {item.amount}</span>
                </label>
                <button className="mini danger" onClick={() => removeShopping(item.name)}>Удалить</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}

export default App
