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

export function productSchema(name: string, price: string, rating: number): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: price.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      ratingCount: 1,
    },
  };
}
