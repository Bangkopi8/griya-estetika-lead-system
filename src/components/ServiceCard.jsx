export default function ServiceCard({ title, description }) {
  return (
    <article className="service-card">
      <span className="service-icon" aria-hidden="true">
        <img src="/assets/gea-logo-badge.png" alt="GEA" />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
