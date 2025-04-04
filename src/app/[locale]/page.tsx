import { useTranslations } from "next-intl";
import { Shield, Image, Video, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/button";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 bg-blue-50 dark:bg-muted/40 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t("hero.title1")}{" "}
            <span className="text-primary">{t("hero.title2")}</span>{" "}
            {t("hero.title3")}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/converter">
              <Button size="lg" className="gap-2 text-base animate-pulse">
                {t("hero.cta")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="gap-2 text-base">
                {t("hero.learnMore")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            {t("features.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-500" />}
              title={t("features.security.title")}
              desc={t("features.security.desc")}
            />
            <FeatureCard
              icon={<Image className="h-6 w-6 text-green-500" />}
              title={t("features.images.title")}
              desc={t("features.images.desc")}
            />
            <FeatureCard
              icon={<Video className="h-6 w-6 text-yellow-500" />}
              title={t("features.videos.title")}
              desc={t("features.videos.desc")}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-50 dark:bg-muted/40">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t("cta.desc")}
          </p>
          <Link href="/converter">
            <Button size="lg">{t("cta.button")}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground">{desc}</p>
    </div>
  );
}
