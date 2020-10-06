import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "../styles/Home.module.css";

type IFiles = {
  name: string;
  path: string;
  download_url: string;
};

async function getPosts(): Promise<IFiles[]> {
  // curl "https://demo.ghost.io/ghost/api/v3/content/
  const res = await fetch(
    `https://api.github.com/repos/gray-rabbit/next_blog/contents/markdown`
  ).then((r) => r.json());
  console.log(res);
  return res;
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
  posts: IFiles[];
  children?: React.ReactNode;
}) {
  return (
    <div>
      <h1>HelloBlog</h1>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <Link
                href="/classroom/[id]"
                as={`/classroom/${post.name.split(".")[0]}`}
              >
                <a>{post.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
