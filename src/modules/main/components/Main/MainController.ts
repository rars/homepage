export class MainController {
  public sideMenuVisible: boolean;

  static $inject = ['$state'];

  constructor(private $state: any) {
    this.sideMenuVisible = false;
  }

  public toggleMenu() {
    this.sideMenuVisible = !this.sideMenuVisible;
  }
}
