import prisma from '@/lib/prisma';
import { GetServerSideProps } from 'next';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;

    const post = await prisma.post.findUnique({
        where: {
            id: String(id)
        },
        include: {
            author: {
                select: { name: true },
            }
        }
    });

    if (!post) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            post
        }
    };
};

function Details({ post }) {
    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>Author: {post.author.name}</p>
            <p>{post.content}</p>
        </div>
    );
}

export default Details;
