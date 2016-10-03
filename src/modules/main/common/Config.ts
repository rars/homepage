export class Config {
  public static $inject: Array<string> = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  public constructor(
      $stateProvider,
      $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        template: '<home></home>'
      });
  }
}
