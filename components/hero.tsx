import Image from "next/image";
import NextLogo from "./next-logo";
import SupabaseLogo from "./supabase-logo";
import LogoType from "@/public/TaskarimLogotype.png";

export default function Header() {
  return (
    <div className="flex flex-col gap-7 items-center">
      <div className="flex justify-center items-center">
        <Image
          alt="taskarim"
          src={LogoType}
          width={240}
          className="dark:brightness-150 brightness-75"
        />
      </div>
      <div className="flex gap-8 justify-center items-center">
        <a href="https://supabase.com/" target="_blank" rel="noreferrer">
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
        <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
          <NextLogo />
        </a>
      </div>
      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        ابزار مدیریت امور و کار ها ساخته شده با{" "}
        <a
          href="https://supabase.com/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>{" "}
        و{" "}
        <a
          href="https://nextjs.org/"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Next.js
        </a>
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
