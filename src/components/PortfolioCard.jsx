import { useState } from "react";

export default function PortfolioCard({ title, category, description, image }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <article className="portfolio-card">
      <div className="portfolio-media">
        {image && !hasImageError ? (
          <img
            src={image}
            alt={title}
            className="portfolio-image"
            loading="lazy"
            decoding="async"
            onError={() => setHasImageError(true)}
          />
        ) : (
          <div className="portfolio-placeholder" aria-label={`${title} placeholder`}>
            <span>{title}</span>
          </div>
        )}
      </div>
      <div className="portfolio-body">
        <span className="portfolio-category">{category}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  );
}
