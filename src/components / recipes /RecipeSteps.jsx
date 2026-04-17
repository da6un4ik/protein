export default function RecipeSteps({ steps }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
            {step.step_number || i + 1}
          </div>
          <div className="flex-1 pt-1">
            <p className="text-foreground leading-relaxed">{step.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
