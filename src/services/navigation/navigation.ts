import { Loader } from "@app/shared";
import { Page } from "@decorators";
import { State } from "@services/state/state";

export interface IPages {
    [k: string]: typeof Page | IPages;
}

export class Navigation<IState = Record<string, any>> {
    loader = new Loader();
    loadingPage: Page;

    constructor(private state: State<IState>, private ref: HTMLElement, public pages: IPages, private basePath = '') {
        window.addEventListener("popstate", _ => {
            const crumbs = Navigation.crumbs();
            this.loading(`/${crumbs.join('/')}`);
        });
    }
    
    public fisrtLoad(path: string): void {
        this.ref.append(this.loader);
        this.prepareNav(path);
    }

    public loading(path: string): void {
        if (location.pathname === path) return;
        this.ref.replaceChild(this.loader, this.loadingPage);
        this.prepareNav(path);
    }

    public showPage(): void {
        this.ref.replaceChild(this.loadingPage, this.loader);
    }

    private prepareNav(path: string): void {
        window.history.pushState(null, '', `${location.origin}${this.basePath}${path}`);
        const Page = this.getPage(path);
        this.loadingPage = new Page(this.state);
    }

    private getPage<T extends Page>(path: string): new (appState: State<IState>) => T {
        const Page = this.pages[path] ?? this.pages['/'] ?? this.pages['/home'] ?? this.pages['/landing'];
        document.title = `Vanilla | ${(Page.name as string).addSpaces('uppercase')}`;
        return Page as new (appState: State<IState>) => T;
    }

    static crumbs(): string[] {
        return location.pathname.slice(1).split('/');
    }
}