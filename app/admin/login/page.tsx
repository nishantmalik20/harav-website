import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";
import { BrandLockup } from "@/components/brand/brand-lockup";

export const metadata: Metadata = {
  title: "Staff sign-in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const { denied } = await searchParams;
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <BrandLockup logoClassName="h-12" />
        </div>
        <div className="rounded-md border border-espresso/10 bg-pearl p-8">
          <h1 className="mb-6 text-center font-display text-2xl text-espresso">Staff sign-in</h1>
          <LoginForm denied={denied === "1"} />
        </div>
      </div>
    </section>
  );
}
