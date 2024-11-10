import './style/dist/style.css';
import './utils/stringExtensions';

import { Device, Language, Navigation, setMetaTags, State } from "@services";
import { Modal, Navbar } from "@app/shared";
import { StateKeys } from '@constants/stateKeys.constant';
import { appConfig } from 'app.config';

interface IApplicationState {}

class Main {
  // App element.
  app = document.getElementById('app') ?? this.createApp();
  // Services.
  navigator: Navigation;
  appState: State<IApplicationState>;

  // Elements.
  constructor() {
    setMetaTags(appConfig.meta);
    this.device = new Device();
    this.appState = new State();
    this.i18n = new Language();
    this.navigator = new Navigation(this.appState, this.app, appConfig.routes);
    this.setData();
    this.init();
  }

  private createApp(): HTMLDivElement {
    const app = document.createElement('div');
    app.id = 'app';
    document.body.replaceChildren(app);
    return app;
  }

  private setData(): void {
  }

  private init() {
    this.app.append(new Navbar(this.navigator.pages, this.appState));
    this.subscribes();
    this.navigator.fisrtLoad(location.pathname);
  }

  private navigation(page: string): void {
    this.navigator.loading(page);
  }

  private subscribes(): void {
    const modals: { [key: string]: Modal } = {};
    // Page Navigation.
    this.appState.subscribe(StateKeys.stateNavigate, this.navigation.bind(this));
    // Load Page.
    this.appState.subscribe(StateKeys.pageContentLoaded, _ => this.navigator.showPage());
    // Modals.
    this.appState.subscribe(StateKeys.openModal, (key: string, content) => modals[key] = new Modal(this.app.append, content));
    this.appState.subscribe(StateKeys.closeModal, (key: string) => { modals[key].closeModal(); delete modals[key]; });
  }
}

new Main();