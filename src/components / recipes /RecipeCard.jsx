import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';

const proteinLabels = {
  meat: 'Мясо',
  fish: 'Рыба',
  chicken: 'Курица',
  dairy: 'Молочка',
  plant: 'Растительный',
};

export default function RecipeCard({ recipe, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/recipe/${recipe.id}`} className="block group">
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={recipe.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'}
              alt={recipe.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-card/80 backdrop-blur-md rounded-full text-xs font-medium text-foreground">
                {proteinLabels[recipe.protein_source] || recipe.protein_source}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground leading-tight line-clamp-1">
              {recipe.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
              {recipe.description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
              {recipe.protein && (
                <span className="flex items-center gap-1 font-semibold text-accent">
                  {recipe.protein}г белка
                </span>
              )}
              {recipe.calories && (
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  {recipe.calories} ккал
                </span>
              )}
              {recipe.cook_time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {recipe.cook_time} мин
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
