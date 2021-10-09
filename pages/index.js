import Link from 'next/link'

export default function Home({ posts }) {
  // console.log(posts)
  return (
    <div>
    {posts && posts.map((post) => (
      <Link href={`/${post.Slug}`} key={post.id}>
        <a>
        <h2>{post.Title}</h2>
        <div>{post.User.username}</div>
        </a>
        </Link>
    ))}
   </div>
  )}

export async function getStaticProps() {
  //get posts from api
  const res = await fetch("http://localhost:1337/posts")
  const posts = await res.json()

  console.log("node next server")
  return {
    props: {posts},
  }
}