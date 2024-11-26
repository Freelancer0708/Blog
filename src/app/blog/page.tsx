import Link from "next/link";
import styles from "./blog.module.css";
import { fetchBlogPosts } from '@/firebase/firestore';

export default async function Blog() {
    const posts = await fetchBlogPosts();
  return (
    <>
      <div className={styles.blog}>
        <main className={styles.main}>
          <h1>Blog Page</h1>

          <section className={styles.list}>
            {posts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className={styles.item}>
                <h2>{post.title}</h2>
                <p>{post.content.length > 60 ? `${post.content.slice(0, 60)}...` : post.content}</p>
              </Link>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
