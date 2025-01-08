'use server'

import { TCommentValidatorErrors, commentValidator } from "@/validators/comment-validator";
import { TCommentInsert } from "../db/schemas";
import { EkinoError, SessionError, getError } from "../helpers/error-helper";
import { auth } from "../providers/auth";
import CommentRepository from "../db/repositories/comment-repository";
import { typeToLink } from "@/utils/translations";
import { revalidatePath } from "next/cache";
import { TMediaTypes } from "@/types/types";

export async function getComments(mediaId: number, mediaType: TMediaTypes) {
    try {
        const comments = await CommentRepository.many(mediaId, mediaType);

        return {
            success: true as const,
            data: comments,
        }
    } catch (error) {
        console.log(error);

        return getError(error);
    }
}

export async function sendComment(data: Omit<TCommentInsert, 'userId'>) {
    try {
        const session = await auth();

        if(!session?.user.id) {
            throw new SessionError();
        }

        const comment = commentValidator.parse({...data, userId: session.user.id});

        const isCommentExist = await CommentRepository.isExist(comment.mediaId, comment.mediaType, comment.userId);

        if(isCommentExist) {
            throw new EkinoError('Już komentowałeś ten film lub serial');
        }

        await CommentRepository.insert(comment);

        const mediaLink = typeToLink(comment.mediaType);

        revalidatePath(`/filmy-i-seriale/${mediaLink}/${comment.mediaId}`);

        return {
            success: true as const,
            message: 'Komentarz dodany'
        }

    } catch (error) {
        console.log(error);
        return getError<TCommentValidatorErrors>(error);
    }
}
