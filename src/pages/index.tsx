import * as React from "react";
import { graphql } from "gatsby";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "../components/layout/Layout";
import {
  Shield,
  Calendar,
  Headphones,
  BookOpen,
  Building2,
  Users,
} from "lucide-react";
import {
  CategoriesSection,
  type CategoryCard,
  FeaturedArticlesSection,
  type FeaturedArticle,
  FinalCtaSection,
  HeroSection,
  HostCtaSection,
  HowItWorksSection,
  type HowItWorksStep,
  NewsletterSection,
  WhyKeyselySection,
  type WhyKeyselyItem,
} from "../components/home";
import type { MyQueryQuery } from "../graphql/__generated__/types";

const categories: CategoryCard[] = [
  {
    title: "Oficinas Privadas",
    description: "Consejos para elegir la oficina perfecta para tu equipo.",
    icon: Building2,
    colorClassName: "bg-brand-blue/10 text-brand-blue",
  },
  {
    title: "Coworking",
    description: "Tendencias y guías sobre espacios de coworking.",
    icon: Users,
    colorClassName: "bg-brand-lavender/10 text-brand-lavender",
  },
  {
    title: "Salas de Juntas",
    description: "Tips para organizar reuniones productivas.",
    icon: BookOpen,
    colorClassName: "bg-brand-beige/10 text-brand-beige",
  },
];

const whyKeysely: WhyKeyselyItem[] = [
  {
    title: "Reservas seguras",
    description: "Pago protegido y cancelación flexible.",
    icon: Shield,
  },
  {
    title: "Flexibilidad",
    description: "Por hora, día o mes según lo que necesites.",
    icon: Calendar,
  },
  {
    title: "Soporte 24/7",
    description: "Estamos aquí cuando nos necesites.",
    icon: Headphones,
  },
];

const howItWorks: HowItWorksStep[] = [
  {
    step: "1",
    title: "Busca",
    description: "Explora espacios por ubicación, precio y disponibilidad.",
  },
  {
    step: "2",
    title: "Reserva",
    description: "Elige fecha y hora y confirma tu reserva al instante.",
  },
  {
    step: "3",
    title: "Disfruta",
    description: "Gestiona tus reservas y reseñas desde tu panel.",
  },
];

function estimateReadTimeFromRawRichText(
  raw: string | null | undefined,
): string {
  if (!raw) return "";
  const text = raw.replace(/\\s+/g, " ").trim();
  if (!text) return "";
  // Very rough estimate: Contentful Rich Text JSON is noisy; we approximate by character length.
  const words = Math.max(1, Math.round(text.length / 5));
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

type IndexPageProps = PageProps<MyQueryQuery>;

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const featuredArticles: FeaturedArticle[] = (
    data.allContentfulBlogPost.nodes ?? []
  ).map((node: MyQueryQuery["allContentfulBlogPost"]["nodes"][number]) => {
    const firstCategory = node.categories?.title ?? "General";
    const readTime = estimateReadTimeFromRawRichText(node.content?.raw);
    return {
      title: node.title ?? "",
      excerpt: node.abstract ?? "",
      category: firstCategory,
      readTime,
    };
  });

  return (
    <Layout>
      <HeroSection backgroundImageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80" />
      <HowItWorksSection steps={howItWorks} />
      <CategoriesSection categories={categories} />

      <FeaturedArticlesSection articles={featuredArticles} />

      <HostCtaSection
        cta={{
          label: "Lista tu espacio",
          href: "https://keysely.com/about/publish-your-space",
        }}
      />
      <WhyKeyselySection items={whyKeysely} />
      <FinalCtaSection
        cta={{ label: "Explorar espacios", href: "https://keysely.com/search" }}
      />
      <NewsletterSection />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Keysely Blog — Guías y consejos sobre espacios de trabajo</title>
    <meta
      name="description"
      content="Descubre tendencias, guías y consejos sobre espacios de trabajo flexibles, coworking y oficinas en México."
    />
  </>
);

export const query = graphql`
  query MyQuery {
    allContentfulBlogPost(limit: 3, sort: { updatedAt: ASC }) {
      nodes {
        ...ContentfulBlogPostFragment
      }
    }
  }
`;
