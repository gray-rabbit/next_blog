import Link from "next/link";
import { useRouter } from "next/router";
const { CONTENT_API_KEY, BLOG_URL } = process.env;

async function getPost(slug: string) {
  const res = await fetch(
    `${BLOG_URL}/ghost/api/v3/content/posts/slug/${slug}?key=${CONTENT_API_KEY}&fields=title,html,created_at,`
  ).then((r) => r.json());
  const rest = res.posts;
  return rest[0];
}

export const getStaticProps = async ({ params }) => {
  const post = await getPost(params.slug);
  return {
    props: { post },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};
export default function Post(props) {
  const { post } = props;
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading....</h1>;
  }
  return (
    <div>
      <Link href="/">
        <a>Go Back</a>
      </Link>
      <div className="">
        <p>{post.title}</p>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </div>
    </div>
  );
}
