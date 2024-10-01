import { PageBase, PageDecorator } from "@decorators";
import { Hero } from "@app/shared";

import './home.scss';

@PageDecorator
export class Home extends PageBase {
    hero: Hero;
    protected async init() {
        this.hero = new Hero(this.pageState);
        this.hero.texts = {
            header: 'welcome to home page!',
            subHeader: 'this is the sub header...',
            img: 'hero.jpeg'
        }
        this.append(this.hero);
        super.init();
        this.showPage();
    }
}