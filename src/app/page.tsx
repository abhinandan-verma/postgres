
import MyCard from "@/components/Card";
import prisma from "@/lib/prisma";
import { GetStaticProps } from "next";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";


async function getPost() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      }
    }
  })

  return posts;
}

async function getStaticProps() {
  const post = await getPost();
  return {
    props: { post },
  };
}

export default async function Home() {

  //const router = useRouter();

  const post = await getPost();
  if(!post) {
    return {
      notFound: true
    }
  }

  const staticProps = await getStaticProps();
  console.log("staticProps: ", staticProps.props.post) // { post: [] }
  console.log("db connected successfully :) ")
  console.log(" posts: ", post)
  //console.log(" posts: ", JSON.stringify(post))

  return (
   <main>
    <h1>Feed</h1>

    <p>
      posts: {JSON.stringify(post)}
    </p>

    <div className="">
      {post.map((p) => (
        <div 
          key={p.id} 
        >
          <MyCard
            id={p.id}
            title={p.title}
            auther={p?.author?.name || "unknown"}
            published={p?.published}
            authorId={p?.authorId?.toString() || "unknown"}
            description={p?.content?.toString() || "unknown"}
          />
        </div>
      ))}


    </div>
   </main>
  );
}
