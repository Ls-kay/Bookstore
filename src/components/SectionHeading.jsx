export default function SectionHeading({ eyebrow, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="mb-3 text-xs font-extrabold tracking-[0.17em] text-green">
          {eyebrow}
        </p>
        <h2 className="mb-0 font-display text-4xl font-normal leading-tight tracking-[-0.045em] sm:text-5xl">
          {children}
        </h2>
      </div>
      <p className="mb-1 max-w-sm text-[#77796f]">{description}</p>
    </div>
  );
}
