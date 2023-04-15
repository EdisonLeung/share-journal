
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

export default async function handle(req, res) {
    const {content, mood, email } = JSON.parse(req.body);
  
    // const session = await getSession();
    // console.log("emailszd: " + content);
    const result = await prisma.post.create({
      data: {
        content: content,
        mood: mood,
        published: true,
        author: { connect: { email: email } },
      },
    });
    res.json("result");
}