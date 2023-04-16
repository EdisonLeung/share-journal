import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
    const postId = req.query.id;
    const {content, mood } = JSON.parse(req.body);
    const post = await prisma.post.update({
        where: {id: postId},
        data: {content: content, mood: mood}
    });
    res.json(post);
}