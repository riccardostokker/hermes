import {createError, defineEventHandler, sendError} from 'h3';
import {getChapter} from '~/modules/book';

export default defineEventHandler(async (event) => {
    try {
        return await getChapter(event.context.params.book, event.context.params.chapter);
    } catch(e){
        return sendError(event, createError({statusCode: 404, statusMessage: 'Chapter Not Found'}));
    }
});
