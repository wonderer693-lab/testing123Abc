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

function parsePrice(s: string): string {
  const m = s.match(/[\d,]+/);
  return m ? m[0].replace(/,/g, "") : "0";
}

export function productSchema(name: string, price: string, rating: number): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    applicationCategory: "DeveloperApplication",
    offers: {
      "@type": "Offer",
      price: parsePrice(price),
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: rating,
      bestRating: 5,
      ratingCount: 5,
    },
  };
}

export function websiteSchema(siteUrl: string, siteName: string): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/compare/{query}`,
      },
      "query-input": "required name=query",
    },
  };
}

export function organizationSchema(siteUrl: string, siteName: string): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    sameAs: [
      "https://github.com/saaspolarbeam",
      "https://twitter.com/saaspolarbeam",
    ],
  };
}

export function articleSchema(headline: string, description: string, datePublished: string, authorName = "NextAuthCompare Team"): SchemaOrg {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
    },
  };
}
