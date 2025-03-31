export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <section className="flex flex-col w-full">
      <h1 className="text-3xl font-bold">{slug}</h1>
    </section>
  )
}
