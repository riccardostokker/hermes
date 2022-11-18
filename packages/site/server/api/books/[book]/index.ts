import {createError, defineEventHandler, sendError} from 'h3';
import {getBook} from '~/modules/book';

export default defineEventHandler(async (event) => {
    try {
        return await getBook(event.context.params.book);
    } catch (e) {
        return sendError(event, createError({statusCode: 404, statusMessage: 'Book Not Found'}));
    }
});
