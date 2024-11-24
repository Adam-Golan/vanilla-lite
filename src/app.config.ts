import { Home } from "@app/pages"
import type { IPages, IMetaTags, OGCard} from "@services"

export const appConfig: AppConfig = {
    siteURL: 'https://your-site.com', // Replace with your site's actual URL
    routes: {
        '/': Home,
        '/home': Home,
    },
    meta: {
        description: "Welcome to Vanilla, a fast and reliable web development frame.",
        keywords: "Vanilla, framework, fast development",
        author: "Adam Golan"
    }
}

interface AppConfig {
    siteURL: string;
    routes: IPages,
    meta: IMetaTags,
    OGCard?: OGCard
}