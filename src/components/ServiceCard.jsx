export default function ServiceCard({ icon, title, description }) {
  return (
    <article className="service-card">
      <span className="service-icon" aria-hidden="true">
        {icon}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
