export default function IngredientsList({ ingredients }) {
  if (!ingredients || ingredients.length === 0) return null;

  return (
    <div className="space-y-0">
      {ingredients.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-border last:border-0"
        >
          <span className="text-foreground">{item.name}</span>
          <span className="text-muted-foreground text-sm font-medium">{item.amount}</span>
        </div>
      ))}
    </div>
  );
}
