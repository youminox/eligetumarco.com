import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenChatButton from "@/components/OpenChatButton";
import AmazonAffiliateBox from "@/components/AmazonAffiliateBox";
import { getContextualAmazonProducts } from "@/lib/amazon";

export default function NotFound() {
  const amz = getContextualAmazonProducts("404", "marcos-para-padres-y-abuelos");
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <section className="wrap py-20 text-center">
          <span className="eyebrow">Página no encontrada (404)</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            No encontramos esa guía, pero aquí tienes las más consultadas
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--muted)]">
            Explora nuestras comparativas de marcos digitales con Wi‑Fi para
            padres y abuelos o pregúntale en vivo a nuestro Asesor IA.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-buy shine">
              Volver al Inicio
            </Link>
            <Link
              href="/marcos-para-padres-y-abuelos/"
              className="btn btn-ghost"
            >
              Marcos para Padres y Abuelos
            </Link>
            <OpenChatButton label="Preguntar al Asesor IA" />
          </div>
          <div className="mt-12 text-left">
            <AmazonAffiliateBox
              variant="showcase"
              sectionTitle={amz.sectionTitle}
              sectionSubtitle={amz.sectionSubtitle}
              products={amz.products}
              source="404"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
