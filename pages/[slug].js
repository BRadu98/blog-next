import Link from "next/link"

export default function Post({post}) {
  return (
    <div>
      <Link href="/"><a>Go Home</a></Link>
      <h2>{post.Title}</h2>
    </div>
  )
}

//!tell nextjs how many pages
export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/posts")
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { slug: post.Slug },
  }))

  return {
    paths,
    fallback: true, //! static vs incremental/ssr
  }
}


//!for each page, get data for it
export async function getStaticProps({ params }) {
  const { slug } = params;
  const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`)
  const data = await res.json()
  const post = data[0]

  return {
    props: {post},
  }
}

//! fallback: false
//? static:
  //build all files at once 
  //build all when 1 changes
//! fallback: true
//? incremental static ssr and static gen:
  // when 1st visit - generate page
  // when 2nd+ visits happen: serve static page