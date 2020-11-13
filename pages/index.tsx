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
  const newPosts = posts.map(r => {
    try {
      const [date, title] = r.name.split('_')

      return {
        ...r,
        date,
        title: title.split('.md')[0]
      }
    } catch (e) {
      return r;
    }
  }).sort((a, b) => {
    if (a > b) return 1
    else return -1
  })
  return {
    props: { posts: newPosts },
  };
};

export default function Home({
  posts,
  children,
}: {
  posts: IFiles[];
  children?: React.ReactNode;
}) {
  console.log(posts);
  return (
    <div className="container"  >
      <div className="section">
        <h1 className="title is-4">GrayRabbiT Dev Log 맨땅에 삽질은 이런것</h1>
      </div>
      <div className="m-5">
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index} className="my-3 has-text-left is-flex ">
                <Link
                  href="/classroom/[id]"
                  as={`/classroom/${post.name.split(".")[0]}`}
                >
                  <a className="button is-flex-grow-1 is-justify-content-space-between">
                    <span>
                      {post.title}
                    </span>
                    <span>
                      {post.date}
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
