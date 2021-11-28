import Link from "next/link";

export default function Post({ post, prevPageHref, nextPageHref }) {
  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <ul>
        <li>
          <Link href="/">Top</Link>
        </li>
        {prevPageHref && (
          <li>
            <Link href={prevPageHref}>Previous</Link>
          </li>
        )}
        {nextPageHref && (
          <li>
            <Link href={nextPageHref}>Next</Link>
          </li>
        )}
      </ul>
    </main>
  );
}

export async function getStaticPaths() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  const paths = posts.map((post) => {
    return { params: { id: `${post.id}` } };
  });
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const paramId = +context.params.id;
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  let prevPageHref, nextPageHref, post;
  posts.forEach((current, i) => {
    prevPageHref = paramId === 1 ? null : `/posts/${paramId - 1}`;
    nextPageHref = paramId === posts.length ? null : `/posts/${paramId + 1}`;
    if (current.id === paramId) {
      post = current;
    }
  });
  return {
    props: { post, prevPageHref, nextPageHref },
  };
}
