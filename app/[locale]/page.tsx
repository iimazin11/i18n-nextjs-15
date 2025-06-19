"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useTransition, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLocaleChange = (nextLocale: string) => {
    const currentPathname = window.location.pathname;
    const newPath = currentPathname.replace(/^\/[a-z]{2}/, `/${nextLocale}`);
    startTransition(() => {
      router.push(newPath);
    });
  };

  const locales = [
    {
      code: "en",
      name: "English",
      flag: `https://th.bing.com/th/id/OIP.nmPZhvg2mDsOnkmEsxQsEQHaD2?w=304&h=180&c=7&r=0&o=7&pid=1.7&rm=3`,
    },
    {
      code: "ar",
      name: "العربية",
      flag: `https://th.bing.com/th/id/OIP.nueNU-FHb-iYI0pJJPQbzwHaEK?w=310&h=180&c=7&r=0&o=7&pid=1.7&rm=3`,
    },
  ];

  const currentLocale = locales.find((l) => l.code === locale);

  return (
    <div dir={direction} className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>
      <Link href="/about" className="text-blue-600 underline">
        {t("about")}
      </Link>

      <div className="relative inline-block mt-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-2 border rounded shadow bg-white hover:bg-gray-100 text-black"
        >
          <img src={currentLocale?.flag} alt="" className="w-5 h-4" />
          <span className="text-sm font-medium">{currentLocale?.name}</span>
        </button>

        {open && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
            {locales.map((item) => (
              <li key={item.code}>
                <button
                  onClick={() => {
                    setOpen(false);
                    handleLocaleChange(item.code);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center gap-2 text-black"
                >
                  <img src={item.flag} alt="" className="w-5 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
