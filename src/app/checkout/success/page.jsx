import CheckoutSuccessStatus from "../../../components/CheckoutSuccessStatus";

export default async function CheckoutSuccessPage({ searchParams }) {
  const { session_id: sessionId } = await searchParams;

  return (
    <main className="grid min-h-screen place-items-center bg-paper px-5 py-12 font-body text-ink">
      <section className="w-full max-w-xl rounded-2xl bg-[#fffdf8] p-7 shadow-soft sm:p-10">
        <a
          className="mb-8 inline-flex items-center gap-2 font-display text-lg font-bold"
          href="/"
        >
          <span className="text-2xl text-[#b56d4c]" aria-hidden="true">
            ✳
          </span>
          The Paper Trail
        </a>
        <CheckoutSuccessStatus sessionId={sessionId || ""} />
      </section>
    </main>
  );
}
