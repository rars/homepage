export class MainController {
  public sideMenuVisible: boolean;

  public static $inject: Array<string> = [
    '$state'
  ];

  public constructor(
      private $state: any) {
    this.sideMenuVisible = false;
  }

  public toggleMenu(): void {
    this.sideMenuVisible = !this.sideMenuVisible;
  }
}
