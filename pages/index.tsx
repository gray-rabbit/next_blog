import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "../styles/Home.module.css";

type IFiles = {
  name: string;
  path: string;
  download_url: string;
  date: string;
  title: string;
};

async function getPosts(): Promise<IFiles[]> {
  // curl "https://demo.ghost.io/ghost/api/v3/content/
  const res = await fetch(
    `https://api.github.com/repos/gray-rabbit/next_blog/contents/markdown`
  ).then((r) => r.json());
  return res;
}

export const getStaticProps = async ({ params }) => {
  const posts = await getPosts();
  posts.map(r => {
    try {
      const [date, title] = r.name.split('_')
      return {
        ...r,
      }
    } catch (e) {
      return r;
    }
  })
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
    <div className="container"  >
      <h1 className="title is-4">HelloBlog</h1>
      <button className="button is-danger">하하하</button>
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
