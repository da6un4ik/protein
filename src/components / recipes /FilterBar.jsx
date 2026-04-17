import { motion } from 'framer-motion';

const proteinLabels = {
  all: 'Все',
  meat: 'Мясо',
  fish: 'Рыба',
  chicken: 'Курица',
  dairy: 'Молочка',
  plant: 'Растительный',
};

const mealLabels = {
  all: 'Все',
  hot: 'Горячее',
  breakfast: 'Завтрак',
  snack: 'Перекус',
};

function PillGroup({ items, value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {Object.entries(items).map(([key, label]) => {
        const isActive = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="relative px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200"
          >
            {isActive && (
              <motion.div
                layoutId="pill-bg"
                className="absolute inset-0 bg-primary rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MealPillGroup({ items, value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {Object.entries(items).map(([key, label]) => {
        const isActive = value === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function FilterBar({ proteinFilter, mealFilter, onProteinChange, onMealChange }) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">Источник белка</p>
        <PillGroup items={proteinLabels} value={proteinFilter} onChange={onProteinChange} />
      </div>
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">Тип блюда</p>
        <MealPillGroup items={mealLabels} value={mealFilter} onChange={onMealChange} />
      </div>
    </div>
  );
}
