import DeployButton from "@/components/deploy-button";
import Link from "next/link";
import Image from "next/image";
import HeaderAuth from "@/components/header-auth";
import LogoType from "@/public/TaskarimLogo.png";
import { EnvVarWarning } from "@/components/env-var-warning";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Vazirmatn } from "next/font/google";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin", "latin-ext"] });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "تسکریم | ابزار مدیریت امور",
  description: "بهترین ابزار تسک منیجر",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="rtl"
      className={vazir.className}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex  items-center font-semibold">
                    <Link
                      href={"/"}
                      className="text-xl flex items-center gap-2"
                    >
                      <Image
                        alt="taskarim"
                        src={LogoType}
                        className="dark:brightness-150 brightness-75"
                        width={36}
                      />
                      <span className="max-sm:hidden">تسکریم</span>
                    </Link>
                    <div className="mr-3">
                      <ThemeSwitcher />
                    </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
              </nav>
              <div className="flex flex-col gap-20 max-w-5xl p-5">
                {children}
              </div>

              {/* <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer> */}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
