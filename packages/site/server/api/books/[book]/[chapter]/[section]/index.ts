import {createError, defineEventHandler, sendError} from 'h3';
import {getSection} from '~/modules/book';

export default defineEventHandler(async (event) => {
    try {
        return await getSection(event.context.params.book, event.context.params.chapter, event.context.params.section);
    } catch(e){
        return sendError(event, createError({statusCode: 404, statusMessage: 'Section Not Found'}));
    }
});
