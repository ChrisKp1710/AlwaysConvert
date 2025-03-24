import { useTranslations } from 'next-intl';

export default function About() {
  const t = useTranslations('about');

  const cards: { title: string; description: string }[] = t.raw('cards');

  return (
    <div className="grid md:grid-cols-2 gap-6 pb-8">
      {cards.map((card: { title: string; description: string }, index: number) => (
        <div
          key={index}
          className={`border rounded-xl shadow-sm p-6 space-y-2 transition duration-300 hover:shadow-lg hover:border-primary ${
            index === cards.length - 1 && cards.length % 2 !== 0
              ? "md:col-span-2 md:max-w-[50%] md:mx-auto"
              : ""
          }`}
        >
          <h3 className="font-semibold text-lg">{card.title}</h3>
          <p className="text-muted-foreground">{card.description}</p>
        </div>
      ))}
    </div>
  );
}
