import Link from "next/link";
import articles from "@/data/articles.json";

export default function Home() {
  return (
    <div>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-[#8B7355] mb-4">最新文章</h2>
        <div className="space-y-4">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`}
              className="fuzzy-card block p-5"
            >
              <p className="text-sm text-[#B8A089] mb-2">{article.date}</p>
              <h3 className="font-semibold text-[#5D4E3A] text-lg leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-[#A69580] mt-3 leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>


    </div>
  );
}