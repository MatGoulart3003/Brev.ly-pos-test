import { CreateLinkForm } from "../../components/CreateLinkForm/CreateLinkForm";
import { LinksList } from "../../components/LinksList/LinksList";
import { Logo } from "../../components/Logo/Logo";

const stylesheet = {
  page: "min-h-dvh px-3 py-8",
  content: "mx-auto flex w-full max-w-[980px] flex-col gap-6 md:gap-8 md:pt-16",
  logoWrapper: "flex justify-center lg:justify-start",
  grid: "flex flex-col gap-3 lg:grid lg:grid-cols-[380px_1fr] lg:items-start lg:gap-5",
};

export function Home() {
  return (
    <main className={stylesheet.page}>
      <div className={stylesheet.content}>
        <div className={stylesheet.logoWrapper}>
          <Logo />
        </div>
        <div className={stylesheet.grid}>
          <CreateLinkForm />
          <LinksList />
        </div>
      </div>
    </main>
  );
}
