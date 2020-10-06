import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "../styles/Home.module.css";

const { CONTENT_API_KEY, BLOG_URL } = process.env;

type Post = {
  title: string;
  slug: string;
  excerpt: string;
};

async function getPosts(): Promise<Post[]> {
  // curl "https://demo.ghost.io/ghost/api/v3/content/
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/?key=${CONTENT_API_KEY}&fields=title,slug,excerpt`
  ).then((r) => r.json());
  const rest = res.posts;
  console.log(rest);
  return rest;
}

export const getStaticProps = async ({ params }) => {
  console.log(params);
  const posts = await getPosts();
  return {
    props: { posts },
  };
};

export default function Home({
  posts,
  children,
}: {
  posts: Post[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h1>HelloBlog</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link href="/post/[slug]" as={`/post/${post.slug}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <p>되냐?</p>
    </div>
  );
}
