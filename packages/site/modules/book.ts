import {promises as fs} from 'node:fs';
import {resolve} from 'path';

export interface Section {
    slug: string,
    name: string,
    source?: string,
    created?: Date,
    updated?: Date
}

export interface Chapter {
    slug: string,
    name: string,
    sections?: Section[]
}

export interface Book {
    slug: string,
    name: string,
    chapters?: Chapter []
}

export async function getBook(book: string) {
    const filePath = resolve(`markdown/books/${book}/book.json`);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getChapter(book: string, chapter: string, fields?: string[]) {
    const iFields = fields ? fields : ['sections'];

    const bookData = await getBook(book);

    let bookChapters = bookData.chapters;
    bookChapters = bookChapters.filter((c: Record<string, unknown>) => c.slug === chapter);

    if(bookChapters.length === 0)
        throw new Error('The specified chapter is not part of the specified book.');

    const folderPath = resolve(`markdown/books/${book}/${chapter}`);
    let directories = await fs.readdir(folderPath, {withFileTypes: true});
    directories = directories.filter(entity => entity.isFile());
    directories = directories.filter(entity => entity.name.endsWith('.md'));

    const result: Chapter = {
        slug: chapter,
        name: bookChapters[0].name
    };

    const sectionNames = directories.map(entity => entity.name.replace('.md', ''));
    const sections: Section[] = [];

    for (const field of iFields) {
        switch (field) {
            case 'sections':
                for(const name of sectionNames)
                    sections.push(await getSection(book, chapter, name, ['created', 'updated']));
                result.sections = sections;
                break;
        }
    }

    return result;

}

export async function getSection(book: string, chapter: string, section: string, fields?: string[]) {
    const iFields = fields ? fields : ['source', 'created', 'updated'];

    const bookData = await getBook(book);

    let bookChapters = bookData.chapters;
    bookChapters = bookChapters.filter((c: Record<string, unknown>) => c.slug === chapter);

    if(bookChapters.length === 0)
        throw new Error('The specified chapter is not part of the specified book.');

    let bookSections = bookData.chapters[0].sections;
    bookSections = bookSections.filter((s: Record<string, unknown>) => s.slug === section);

    if(bookSections.length === 0)
        throw new Error('The specified section is not part of the specified chapter.');

    const filePath = resolve(`markdown/books/${book}/${chapter}/${section}.md`);
    const stat = await fs.stat(filePath);
    const data = await fs.readFile(filePath, 'utf-8');

    const result: Section = {
        slug: section,
        name: bookSections[0].name
    };

    for (const field of iFields) {
        switch (field) {
            case 'source':
                result.source = data;
                break;
            case 'created':
                result.created = stat.birthtime;
                break;
            case 'updated':
                result.updated = stat.mtime;
                break;
        }
    }

    return result;

}
