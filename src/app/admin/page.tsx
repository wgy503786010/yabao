"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import articles from "@/data/articles.json";

const ADMIN_PASSWORD = "yabao2026";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("密码错误");
    }
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    const newArticle = {
      id: String(articles.length + 1),
      title,
      content,
      excerpt: excerpt || content.slice(0, 100) + "...",
      date: new Date().toISOString().split("T")[0],
    };

    console.log("新文章:", newArticle);
    alert("文章已发布！（注：当前为演示版本，数据保存在内存中）");
    setTitle("");
    setContent("");
    setExcerpt("");
  };

  if (!authenticated) {
    return (
      <div className="max-w-sm mx-auto">
        <h1 className="text-xl font-bold text-center text-[#8B7355] mb-8">后台管理</h1>
        <form onSubmit={handleLogin} className="fuzzy-card p-6">
          <input
            type="password"
            placeholder="管理密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="warm-input w-full mb-4 text-[#5D4E3A]"
          />
          <button type="submit" className="warm-btn w-full">
            登录
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="block text-center mt-6 text-[#B8A089] hover:text-[#8B7355]"
        >
          返回首页
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-[#8B7355]">发布文章</h1>
        <button
          onClick={() => router.push("/")}
          className="text-sm text-[#B8A089] hover:text-[#8B7355]"
        >
          查看首页 →
        </button>
      </div>

      <form onSubmit={handlePublish} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#8B7355] mb-2">标题</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="warm-input w-full text-[#5D4E3A]"
            placeholder="文章标题"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#8B7355] mb-2">
            摘要（选填）
          </label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="warm-input w-full text-[#5D4E3A]"
            placeholder="自动生成或手动填写"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#8B7355] mb-2">正文</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="warm-input w-full h-72 text-[#5D4E3A] resize-none"
            placeholder="文章正文..."
          />
        </div>

        <button type="submit" className="warm-btn">
          发布文章
        </button>
      </form>
    </div>
  );
}