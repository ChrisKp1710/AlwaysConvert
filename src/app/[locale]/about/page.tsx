import { getTranslations } from "next-intl/server";
import {
  Shield,
  Zap,
  CheckCircle,
  Code,
  DollarSign,
  Heart,
  Globe,
  Server,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/button";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white dark:from-background dark:via-muted/30 dark:to-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600 dark:text-muted-foreground">
              {t("subtitle")}
            </p>
          </header>

          {/* Mission */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("mission.title")}
            </h2>
            <p className="text-gray-600 dark:text-muted-foreground mb-4">
              {t("mission.description")}
            </p>
          </section>

          {/* Security */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("security.title")}
            </h2>

            {/* File Protection */}
            <div className="bg-white dark:bg-muted rounded-xl shadow-sm border border-gray-100 dark:border-muted/40 p-6 md:p-8 mb-6">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900 dark:text-foreground">
                <Shield className="h-5 w-5 text-primary" />
                {t("security.files.title")}
              </h3>
              <ul className="space-y-3 pl-6 list-disc text-gray-600 dark:text-muted-foreground">
                <li>
                  <strong>{t("security.files.noSignup.title")}</strong>:{" "}
                  {t("security.files.noSignup.desc")}
                </li>
                <li>
                  <strong>{t("security.files.delete.title")}</strong>:{" "}
                  {t("security.files.delete.desc")}
                </li>
                <li>
                  <strong>{t("security.files.secure.title")}</strong>:{" "}
                  {t("security.files.secure.desc")}
                </li>
              </ul>
            </div>

            {/* Ads */}
            <div className="bg-white dark:bg-muted rounded-xl shadow-sm border border-gray-100 dark:border-muted/40 p-6 md:p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-gray-900 dark:text-foreground">
                <DollarSign className="h-5 w-5 text-primary" />
                {t("ads.title")}
              </h3>
              <p className="text-gray-600 dark:text-muted-foreground mb-4">
                {t("ads.description")}
              </p>

              <h4 className="font-semibold text-lg mb-2 mt-4 text-gray-900 dark:text-foreground">
                🛡️ {t("ads.transparency.title")}
              </h4>
              <ul className="space-y-2 pl-6 list-disc text-gray-600 dark:text-muted-foreground mb-4">
                <li>
                  <strong>{t("ads.transparency.safe.title")}</strong>:{" "}
                  {t("ads.transparency.safe.desc")}
                </li>
                <li>
                  <strong>{t("ads.transparency.relevant.title")}</strong>:{" "}
                  {t("ads.transparency.relevant.desc")}
                </li>
                <li>
                  <strong>{t("ads.transparency.noTrack.title")}</strong>:{" "}
                  {t("ads.transparency.noTrack.desc")}
                </li>
              </ul>

              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-foreground">
                💡 {t("ads.howWorks.title")}
              </h4>
              <ul className="space-y-2 pl-6 list-disc text-gray-600 dark:text-muted-foreground">
                <li>{t("ads.howWorks.auto")}</li>
                <li>{t("ads.howWorks.spots")}</li>
                <li>{t("ads.howWorks.clicks")}</li>
              </ul>
            </div>
          </section>

          {/* Transparency */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("transparency.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
              {[
                { icon: Code, label: "openSource" },
                { icon: Heart, label: "passion" },
                { icon: CheckCircle, label: "free" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-white dark:bg-muted p-6 rounded-xl shadow-sm border border-gray-100 dark:border-muted/40 text-center"
                >
                  <Icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-foreground">
                    {t(`transparency.${label}.title`)}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    {t(`transparency.${label}.desc`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technologies */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("tech.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Globe, label: "frontend", desc: "Next.js" },
                { icon: Zap, label: "conversion", desc: "FFmpeg" },
                { icon: Server, label: "hosting", desc: t("tech.hosting_desc") },
                {
                  icon: Shield,
                  label: "security",
                  desc: t("tech.security_desc"),
                },
              ].map(({ icon: Icon, label, desc }) => (
                <div
                  key={label}
                  className="flex gap-4 bg-white dark:bg-muted p-5 rounded-lg border border-gray-100 dark:border-muted/40 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium mb-1 text-gray-900 dark:text-foreground">
                      {t(`tech.${label}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-muted-foreground text-sm">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {[1, 2].map((faq) => (
                <div
                  key={faq}
                  className="bg-white dark:bg-muted p-6 rounded-xl shadow-sm border border-gray-100 dark:border-muted/40"
                >
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-foreground">
                    {t(`faq.q${faq}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-muted-foreground">
                    {t(`faq.q${faq}.desc`)}
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-600 dark:text-muted-foreground">
                    {t.raw(`faq.q${faq}.points`).map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-foreground">
              {t("contact.title")}
            </h2>
            <p className="text-gray-600 dark:text-muted-foreground mb-4">
              {t("contact.desc")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@alwaysconvert.app"
                  className="text-primary hover:underline"
                >
                  support@alwaysconvert.app
                </a>
              </li>
              <li>
                <strong>GitHub:</strong> {t("contact.github")}
              </li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center mb-12 animate-fade-in">
            <p className="text-xl font-bold mb-4 text-primary">
              {t("cta.title")}
            </p>
            <Link href="/converter">
              <Button size="lg" className="mt-2">
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
