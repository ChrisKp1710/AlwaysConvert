import { getTranslations } from "next-intl/server";
import { Shield, Lock, Eye, Server, Zap, FileText, DollarSign, FileIcon, BookOpen, RefreshCw } from "lucide-react";

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  return (
    <div className="bg-gradient-to-b from-blue-50 via-indigo-50/30 to-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-gray-600">
              {t("subtitle")}
            </p>
          </header>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-50 p-3 rounded-full">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t("commitment.title")}</h2>
            </div>

            <p className="text-gray-600 mb-4">
              {t("commitment.description")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center text-center">
                <Lock className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{t("commitment.noCollection.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("commitment.noCollection.desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Server className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{t("commitment.noUpload.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("commitment.noUpload.desc")}
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Eye className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{t("commitment.noTracking.title")}</h3>
                <p className="text-sm text-gray-600">
                  {t("commitment.noTracking.desc")}
                </p>
              </div>
            </div>
          </div>

          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">{t("howWorks.title")}</h2>
            <p className="text-gray-600 mb-4">
              {t("howWorks.description")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {t.raw("howWorks.points").map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">{t("adsManagement.title")}</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg">{t("adsManagement.adSense.title")}</h3>
              </div>
              <p className="text-gray-600 mb-4">
                {t("adsManagement.adSense.description")}
              </p>

              {[1, 2, 3, 4, 5].map((section) => (
                <div key={section}>
                  <h4 className="font-medium mb-2 mt-4">{t(`adsManagement.section${section}.title`)}</h4>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600 mb-4">
                    {t.raw(`adsManagement.section${section}.points`).map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">{t("technical.title")}</h2>
            <p className="text-gray-600 mb-4">
              {t("technical.description")}
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {t.raw("technical.points").map((point: string, i: number) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          {/* Standard Privacy Policy sections - Styled better */}
          <section className="mb-8 animate-fade-in">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-full">
                  <FileIcon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{t("standardPolicy.title") || "Dettagli Legali della Privacy Policy"}</h2>
              </div>

              <p className="text-gray-500 text-sm mb-6">
                {t("standardPolicy.effectiveDate", {
                  date: new Date().toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                })}
              </p>

              <p className="text-gray-600 mb-6">
                {t("standardPolicy.intro")}
              </p>

              {t.raw("standardPolicy.sections").map((section: { title: string; content: string }, index: number) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="bg-blue-50 p-2 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  <div className="pl-10">
                    <p className="text-gray-600">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">{t("contact.title")}</h2>
            <p className="text-gray-600">
              {t("contact.description")}
            </p>
            <a href="mailto:privacy@alwaysconvert.app" className="text-primary hover:underline mt-2 inline-block">
              {t("contact.email")}
            </a>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">{t("updates.title")}</h2>
            </div>
            <p className="text-gray-600 text-sm">
              {t("updates.description", { date: "1 Novembre 2023" })}
            </p>
            <p className="text-gray-600 text-sm mt-4 pt-4 border-t border-gray-200">
              {t("standardPolicy.consent")}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
