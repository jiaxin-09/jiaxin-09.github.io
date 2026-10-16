import type { ListingItem, DetailItem } from "../types";

function formatDate(dateValue: string | Date | undefined): string | undefined {
    if (!dateValue) return undefined;
    let date: Date;

    if (typeof dateValue === 'string') {
        const calendarDate = dateValue.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/);
        date = calendarDate
            ? new Date(
                Number(calendarDate[1]),
                Number(calendarDate[2] ?? 1) - 1,
                Number(calendarDate[3] ?? 1),
            )
            : new Date(dateValue);
    } else {
        date = dateValue;
    }

    if (isNaN(date.getTime())) return undefined;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

export function getListingItem(entry: any, collection?: string): ListingItem {
    const d = entry.data;
    
    return {
        title: d.title,
        description: d.description,
        date: formatDate(d.date),
        authors: d.author,
        extraInput: d.journal || d.event || d.institution,
        tags: d.tags || [],
        externalUrl: d.external_url,
        image: d.image,
    };
}

export function getDetailItem(entry: any, collection: string): DetailItem {
    const listing = getListingItem(entry, collection);
    
    return {
        ...listing,
        backHref: collection === 'posts' ? '/posts' : `/${collection}`,
    };
}
