import Link from 'next/link';
import { client } from '../libs/client';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';

//SSG
export const getStaticProps = async() => {
  const data = await client.get({endpoint: 'blog',});
  console.log(data);
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default function Home({blog}) {
  return (
    <>
      <Head>
        <title>code-holy | 社内エンジニアの備忘録ブログ</title>
        <meta name="description" content="社内エンジニアのフロントエンド・バックエンド・web制作についての技術ブログです。" />
        <script type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: `
          {
            "@context" : "http://schema.org",
            "@type" : "WebSite",
            "name" : "code-holy"
          }`
          }}
        />
      </Head>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
