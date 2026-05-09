export default function Section({
  id,
  title,
  description,
  eyebrow,
  className = "",
  align = "left",
  children,
}) {
  const sectionClassName = ["section", className].filter(Boolean).join(" ");
  const headingClassName = `section-heading section-heading--${align}`;

  return (
    <section id={id} className={sectionClassName}>
      <div className="container">
        {(eyebrow || title || description) && (
          <div className={headingClassName}>
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            {title ? <h2>{title}</h2> : null}
            {description ? <p>{description}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
