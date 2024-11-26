import styles from "./blogsingle.module.css";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

interface BlogProps {
  params: { slug: string }; // URLの`slug`パラメータ
}

export default async function BlogSingle({ params }: BlogProps) {
  const docRef = doc(db, "blogPosts", params.slug); // `slug`をFirestoreのIDとして利用
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return <div>Post not found</div>; // データが見つからない場合
  }

  const post = snapshot.data();

  return (
    <>
      <div className={styles.blog}>
        <main className={styles.main}>
          <h1>Blog Single Page</h1>

          <section className={styles.list}>
            <h2>{post.title}</h2>
            <p>
              {post.content.split("\n").map((line: string, index: number) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
