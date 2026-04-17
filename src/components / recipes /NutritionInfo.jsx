export default function NutritionInfo({ calories, protein, fat, carbs }) {
  const items = [
    { label: 'Калории', value: calories, unit: 'ккал', color: 'bg-orange-100 text-orange-700' },
    { label: 'Белки', value: protein, unit: 'г', color: 'bg-red-100 text-red-700' },
    { label: 'Жиры', value: fat, unit: 'г', color: 'bg-yellow-100 text-yellow-700' },
    { label: 'Углеводы', value: carbs, unit: 'г', color: 'bg-blue-100 text-blue-700' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map(({ label, value, unit, color }) => (
        <div key={label} className={`rounded-xl p-3 text-center ${color}`}>
          <p className="text-lg font-bold">{value || '—'}</p>
          <p className="text-[10px] font-medium uppercase tracking-wide mt-0.5">{unit}</p>
          <p className="text-[10px] mt-1 opacity-70">{label}</p>
        </div>
      ))}
    </div>
  );
}
