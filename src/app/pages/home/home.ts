import { Page, PageDecorator } from "@decorators";
import { Hero } from "@app/shared";

import './home.scss';

@PageDecorator
export class Home extends Page {
    protected async init() {
        const hero = new Hero(this.pageState, {
            header: 'welcome to home page!',
            subHeader: 'this is the sub header...',
            img: 'hero.jpeg'
        });
        this.append(hero);
        super.init();
        this.showPage();
    }
}