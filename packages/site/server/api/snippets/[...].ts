import {createError, defineEventHandler, sendError} from 'h3';
import {promises as fs} from 'node:fs';
import * as path from 'path';

export default defineEventHandler(async (event) => {
    try {
        return await getSnippet(event.context.params._);
    } catch(e){
        return sendError(event, createError({statusCode: 404, statusMessage: 'Section Not Found'}));
    }
});

async function getSnippet(snippet: string) {
    const filePath = path.resolve('markdown/snippets', snippet + '.md');
    const stat = await fs.stat(filePath);
    const data = await fs.readFile(filePath, 'utf8');

    return {
        data: data,
        created: stat.birthtime,
        updated: stat.mtime
    };

}
