import { db } from "@/server/providers/db";
import { TMediaTypes } from "@/types/types";
import { and, desc, eq } from "drizzle-orm";
import { TCommentInsert, commentsTable } from "../schemas";

const CommentRepository = {
    async isExist(mediaId: number, mediaType: TMediaTypes, userId: string) {
        const res = await db.query.commentsTable.findFirst({
            where: and(
                eq(commentsTable.mediaId, mediaId),
                eq(commentsTable.mediaType, mediaType),
                eq(commentsTable.userId, userId),
            )
        })

        return !!res;
    },
    async many(mediaId: number, mediaType: TMediaTypes) {
        const res = await db.query.commentsTable.findMany({
            where: and(
                eq(commentsTable.mediaId, mediaId),
                eq(commentsTable.mediaType, mediaType),
            ),
            with: {
                user: true
            },
            orderBy: [desc(commentsTable.dateCreated)]
        });

        return res;
    },
    async insert(comment: TCommentInsert) {
        await db.insert(commentsTable).values(comment);
    }
}

export default CommentRepository;

