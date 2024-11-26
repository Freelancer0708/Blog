import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase/config'; // Firebaseの設定
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, isPublished } = body;

    // バリデーション
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title or content' },
        { status: 400 }
      );
    }

    // FirestoreのblogPostsコレクションにデータを保存
    const postsCollection = collection(db, 'blogPosts');
    await addDoc(postsCollection, {
      title,
      content,
      isPublished: isPublished || false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
