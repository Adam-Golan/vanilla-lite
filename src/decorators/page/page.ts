import { Enlist } from "@decorators/utils/listing";
import { Base } from "@decorators/base";
import { State } from "@services";
import { StateKeys } from "@services/state/config";
import { LayoutType } from "@decorators/types/types";
import { Footer } from "@app/shared";

export function PageDecorator(target: CustomElementConstructor) {
    Enlist('page', target);
}

export abstract class PageBase<IText = any> extends Base<IText> {
    // Creating a page's state.
    pageState = new State();
    // Creating a footer.
    footer: Footer;
    // Creating component list to build easily.
    subPageList: string[];
    // Declatring layout type.
    layout: LayoutType = 'single_column';

    constructor(protected appState: State) {
        super();
        // Create id for the page by constructor name.
        this.id = this.constructor.name.toLowerCase();
        // Setting data-type as page.
        this.dataset.type = 'page';
        // Setting data-layout.
        this.dataset.layout = this.layout;
    }

    // Useful with super.init().
    protected async init(): Promise<void> {
        // Creating footer.
        this.createFooter();
        // Subscribe page navigation.
        this.pageState.subscribe(StateKeys.stateNavigate, (href: string) => this.appState.publish(StateKeys.stateNavigate, href));
        // Erase if upsetting.
        if (import.meta.env.DEV) console.log('Don\'t forget to use showPage function, or you\'ll be stuck with the loader element.');
    }

    private createFooter(): void {
        // this.footer = new Footer(this.appState);
        // this.footer.texts = this.texts.FOOTER;
        // this.append(this.footer);
    }

    // End loader utility.
    protected showPage(seconds = 0): void {
        setTimeout(() => this.appState.publish(StateKeys.pageContentLoaded), seconds);
    }
}