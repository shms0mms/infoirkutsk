export function TechBanner() {
  return (
    <div className="overflow-hidden bg-gray-900 py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="mx-4 text-2xl">
            {["</>", "01", "{}", "#", "&&", "||", "=>", "..."][i % 8]}
          </span>
        ))}
      </div>
    </div>
  );
}
