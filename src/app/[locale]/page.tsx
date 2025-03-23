import { useTranslations } from "next-intl";
import Dropzone from "../components/dropzone";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="space-y-16 pb-8">
      <div className="space-y-6">
        <h1 className="text-3xl md:text-5xl font-medium text-center">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-md md:text-lg text-center md:px-24 xl:px-44 2xl:px-52">
          {t("description")}
        </p>
      </div>

      <Dropzone />
    </div>
  );
}
