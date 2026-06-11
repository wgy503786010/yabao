"use client";

import { useState } from "react";
import Link from "next/link";
import articles from "@/data/articles.json";

interface Comment {
  id: string;
  nickname: string;
  content: string;
  date: string;
}

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string>("");
  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    { id: "1", nickname: "匿名", content: "说的太对了", date: "2026-06-10" },
  ]);
  const [showComments, setShowComments] = useState(false);

  if (!id) {
    params.then((resolved) => {
      setId(resolved.id);
    });
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-[#B8A089]">加载中...</div>
      </div>
    );
  }

  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="fuzzy-card p-6">
        <p className="text-[#A69580]">文章不存在</p>
        <Link href="/" className="text-[#C4A090] hover:underline mt-4 block">
          返回首页
        </Link>
      </div>
    );
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      nickname: nickname || "匿名",
      content: comment,
      date: new Date().toISOString().split("T")[0],
    };

    setComments([...comments, newComment]);
    setComment("");
    setNickname("");
  };

  return (
    <div>
      <Link
        href="/"
        className="text-[#B8A089] hover:text-[#8B7355] hover:underline mb-6 block text-sm"
      >
        ← 返回首页
      </Link>

      <article className="fuzzy-card p-6">
        <p className="text-sm text-[#B8A089] mb-3">{article.date}</p>
        <h1 className="text-xl font-bold text-[#5D4E3A] mb-6 leading-snug">
          {article.title}
        </h1>
        <div className="prose prose-stone max-w-none">
          <p className="text-[#8B7355] leading-loose whitespace-pre-wrap">
            {article.content}
          </p>
        </div>
      </article>

      <section className="mt-8">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-base font-semibold text-[#8B7355] flex items-center gap-2 mb-4"
        >
          <span>评论区</span>
          <span className="text-sm text-[#B8A089]">({comments.length})</span>
        </button>

        {showComments && (
          <>
            <div className="space-y-3 mb-5">
              {comments.map((c) => (
                <div key={c.id} className="fuzzy-card p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#5D4E3A]">{c.nickname}</span>
                    <span className="text-sm text-[#B8A089]">{c.date}</span>
                  </div>
                  <p className="text-[#8B7355]">{c.content}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmitComment} className="fuzzy-card p-5">
              <h4 className="font-semibold text-[#8B7355] mb-3">发表评论</h4>
              <input
                type="text"
                placeholder="昵称（选填）"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="warm-input w-full mb-3 text-[#5D4E3A]"
              />
              <textarea
                placeholder="写下你的感受..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="warm-input w-full mb-3 h-28 text-[#5D4E3A] resize-none"
              />
              <button type="submit" className="warm-btn">
                提交评论
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
