import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  schema?: object;
}

const BASE_URL = 'https://www.maccosmetics.ma';
const DEFAULT_IMAGE = '/images/home-page-banner.png';

export default function SEO({ title, description, canonical, image, type = 'website', schema }: Props) {
  const fullTitle = title.includes('MAC Cosmetics') ? title : `${title} | MAC Cosmetics Maroc`;
  const imageUrl = image || DEFAULT_IMAGE;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
