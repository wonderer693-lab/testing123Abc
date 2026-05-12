import { getTool } from "./data";

interface SchemaOrg {
  "@context": string
  "@type": string
  [key: string]: unknown
}

export function breadcrumbSchema(items: { name: string; url: string }[]): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function productSchema(): SchemaOrg {
  const tool = getTool();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    applicationCategory: "BusinessApplication",
    offers: [
      {
        "@type": "Offer",
        price: tool.pricing.starter,
        priceCurrency: tool.pricing.currency,
        name: "Starter",
      },
      {
        "@type": "Offer",
        price: tool.pricing.unlimited,
        priceCurrency: tool.pricing.currency,
        name: "Unlimited",
      },
    ],
  };
}

export function reviewSchema(
  name: string,
  reviewBody: string,
  authorName: string
): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "SoftwareApplication", name: getTool().name },
    reviewBody,
    author: { "@type": "Person", name: authorName },
  };
}
