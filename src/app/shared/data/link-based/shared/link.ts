import { ComponentData, ComponentDecorator } from "@decorators";
import { ILink } from "../intefaces";

@ComponentDecorator
export class Link extends ComponentData<ILink> {
    constructor(protected texts: ILink, private navigate: (path: string) => void) {
        super(texts);
    }
    protected init(): void {
        this.innerHTML = this.texts.text.replace(/\-/g, ' ');
        this.dataset.href = this.texts.href;
        this.onclick = () => { this.navigate(this.texts.href); this.classList.add('active'); }
        if (this.texts.title) this.title = this.texts.title;
        if (this.texts.img?.length) {
            const img = this.cElem('img');
            img.alt = this.texts.img.slice(this.texts.img.lastIndexOf('/') + 1);
            img.src = this.texts.img;
            this.append(img);
        }
    }
}