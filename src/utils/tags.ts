import { getCollection } from 'astro:content';
import { PAGES } from '../config';

const taggedCollections = [
    { name: 'publications', active: PAGES.publications.isActive !== false },
    { name: 'talks', active: PAGES.talks.isActive !== false },
    { name: 'projects', active: PAGES.projects.isActive !== false },
    { name: 'posts', active: PAGES.blog.isActive !== false },
    { name: 'teaching', active: PAGES.teaching.isActive !== false },
] as const;

async function getActiveEntries() {
    const activeCollections = taggedCollections.filter(({ active }) => active);
    const entries = await Promise.all(
        activeCollections.map(async ({ name }) => ({
            name,
            entries: await getCollection(name),
        })),
    );

    return entries.flatMap(({ name, entries }) =>
        entries.map((entry) => ({ ...entry, collection: name })),
    );
}

export async function getAllTags() {
    const allEntries = await getActiveEntries();
    const tags: Record<string, number> = {};

    allEntries.forEach(entry => {
        const entryTags = (entry.data as any).tags || [];
        entryTags.forEach((tag: string) => {
            const normalizedTag = tag.trim().toLowerCase();
            if (normalizedTag) {
                tags[normalizedTag] = (tags[normalizedTag] || 0) + 1;
            }
        });
    });

    return Object.entries(tags)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getContentByTag(tag: string) {
    const normalizedSearchTag = tag.toLowerCase();
    const allEntries = await getActiveEntries();

    const filterFn = (entry: any) => {
        const entryTags = (entry.data as any).tags || [];
        return entryTags.some((t: string) => t.toLowerCase() === normalizedSearchTag);
    };

    return allEntries.filter(filterFn).sort((a, b) => {
        const dateA = new Date((a.data as any).date || 0);
        const dateB = new Date((b.data as any).date || 0);
        return dateB.getTime() - dateA.getTime();
    });
}
