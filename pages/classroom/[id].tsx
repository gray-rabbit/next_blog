import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import ReactMarkdown from 'react-markdown';

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
    return <div className="is-flex is-justify-content-center" style={{ height: '100vh' }}>
      로딩중
      </div>;
  }
  console.log(props);
  return (
    <div className="container">
      <div className="box mt-3">
        <ReactMarkdown children={props.data}></ReactMarkdown>
      </div>

      <button className="mt-3 button is-danger is-fullwidth">뒤로</button>
    </div>
  );
}
