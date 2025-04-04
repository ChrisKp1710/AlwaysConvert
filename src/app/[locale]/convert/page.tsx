// src/app/[locale]/convert/page.tsx
import { useTranslations } from "next-intl";
import Dropzone from "../../components/dropzone"; // è già una Client Component

export default function ConvertPage() {
  const t = useTranslations("convert");

  return (
    <div className="bg-gradient-to-b from-background via-muted/30 to-background">
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mb-10">
            {t("subtitle")}
          </p>

          <Dropzone />

          <p className="text-sm text-muted-foreground mt-8">
            {t("supportedFormats")}
          </p>
        </div>
      </section>
    </div>
  );
}
