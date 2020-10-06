import { GetStaticProps } from "next";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = await fetch(
    `https://raw.githubusercontent.com/gray-rabbit/next_blog/main/markdown/${encodeURIComponent(
      params.id as string
    )}.md`
  )
    .then((r) => r.text())
    .catch((e) => {
      console.log(e);
      return null;
    });
  console.log(data);
  return {
    props: { data: data },
  };
};

export function getStaticPaths(context) {
  return {
    paths: [],
    fallback: true,
  };
}

export default function Classroom(props) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>로딩중</div>;
  }
  console.log(props);
  return (
    <div>
      <p>클래스룸</p>
      <p>{props.data}</p>
    </div>
  );
}
