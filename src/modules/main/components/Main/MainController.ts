export class MainController {
  public sideMenuVisible: boolean;

  constructor() {
    this.sideMenuVisible = false;
  }

  public toggleMenu() {
    this.sideMenuVisible = !this.sideMenuVisible;
  }
}
