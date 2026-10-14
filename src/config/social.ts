import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
    {
        name: "Github",
        href: "https://github.com/jiaxin-09",
        linkTitle: `Follow Jiaxin Hou on Github`,
        isActive: false,
    },
    {
        name: "Mail",
        href: "mailto:jiaxinho@usc.edu",
        linkTitle: `Send an email to Jiaxin Hou`,
        isActive: true,
    },
    {
        name: "Google Scholar",
        href: "https://scholar.google.com/citations?user=9GZ_DEwAAAAJ&hl=en",
        linkTitle: `Jiaxin Hou on Google Scholar`,
        isActive: true,
    },
    {
        name: "ORCID",
        href: "https://orcid.org/0009-0003-0857-1385",
        linkTitle: `Jiaxin Hou on ORCID`,
        isActive: true,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/jiaxin-hou-178186191/",
        linkTitle: `Jiaxin Hou on LinkedIn`,
        isActive: true, // Assuming Jiaxin doesn't have a LinkedIn profile
    },
];

export const SOCIAL_ICONS: Record<string, string> = {
    Github: "Github",
    Mail: "Mail",
    LinkedIn: "LinkedIn",
    "Google Scholar": "GoogleScholar",
    ORCID: "ORCID",
    RSS: "RSS",
};