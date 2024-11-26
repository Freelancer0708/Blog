import { collection, getDocs } from 'firebase/firestore';
import { db } from './config';

// ブログ記事を取得する関数
export async function fetchBlogPosts() {
  const postsCollection = collection(db, 'blogPosts');
  const snapshot = await getDocs(postsCollection);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}
