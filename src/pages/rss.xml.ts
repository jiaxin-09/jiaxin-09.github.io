import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE, PAGES } from "../config";
import { withBase } from "../utils/paths";

export async function GET() {
    const posts = PAGES.blog.isActive !== false ? await getCollection("posts") : [];
    const publications = PAGES.publications.isActive !== false ? await getCollection("publications") : [];

    const items = [
        ...posts.map((post: any) => ({
            title: post.data.title,
            pubDate: post.data.date,
            description: post.data.description,
            link: withBase(`/posts/${post.id}/`),
        })),
        ...publications.map((pub: any) => ({
            title: `[Publication] ${pub.data.title}`,
            pubDate: pub.data.date,
            description: pub.data.description || `Published in ${pub.data.journal || 'Journal'}`,
            link: withBase(`/publications/${pub.id}/`),
        })),
    ].sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return rss({
        title: SITE.title,
        description: SITE.desc,
        site: SITE.website,
        items,
    });
}
