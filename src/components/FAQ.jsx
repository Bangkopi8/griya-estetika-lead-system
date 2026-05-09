export default function FAQ({ items }) {
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
