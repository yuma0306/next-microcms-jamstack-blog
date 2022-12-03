import {client} from '../../libs/client';
import styles from '../../styles/Home.module.scss';
import Head from 'next/head';

// SSG
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id });
  console.log(data);
  return {
    props: {
      blog: data,
    }
  }
}

export const getStaticPaths = async () => {
  const data = await client.get({endpoint: 'blog'});
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false,
  }
};

export default function BlogId({blog}) {
  return (
    <>
      <Head>
        <title>{blog.title} | code-holy</title>
        <meta name="description" content={blog.description} />
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
      <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <div>
          <img src={blog.thumbnail.url} alt={blog.title} />
        </div>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <div dangerouslySetInnerHTML={{__html: `${blog.body}`}} className={styles.post}></div>
      </main>
    </>
  );
}