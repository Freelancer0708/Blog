"use client";
import styles from "./blognew.module.css";
import { useState } from "react";

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true); // ローディング開始

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, isPublished }),
      });

      if (response.ok) {
        alert("Post created successfully!");
        setTitle("");
        setContent("");
        setIsPublished(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to create post: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <div className={styles.blog}>
      <main className={styles.main}>
        <h1>Create a New Blog Post</h1>
        <form onSubmit={handleSubmit} className={styles.list}>
          <div className={styles.item}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
              disabled={loading} // ローディング中は無効化
            />
          </div>
          <div className={styles.item}>
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={styles.textarea}
              required
              disabled={loading} // ローディング中は無効化
            ></textarea>
          </div>
          <div className={styles.item}>
            <label className={styles.published}>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                disabled={loading} // ローディング中は無効化
              />
              Published
            </label>
          </div>
          <button
            type="submit"
            className={styles.submit}
            disabled={loading} // ローディング中は無効化
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
}
