export default function QuantityStepper({ value, onChange, label }) {
  return (
    <div
      className="inline-flex items-center gap-1"
      role="group"
      aria-label={`Reading list quantity for ${label}`}
    >
      <button
        className="grid h-9 w-9 place-items-center rounded-full border border-border text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        type="button"
        aria-label={`Remove one copy of ${label}`}
        disabled={value === 0}
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        −
      </button>
      <output className="min-w-6 text-center text-sm font-bold" aria-live="polite">
        {value}
      </output>
      <button
        className="grid h-9 w-9 place-items-center rounded-full bg-ink text-lg font-semibold text-white hover:bg-green"
        type="button"
        aria-label={`Add one copy of ${label}`}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
