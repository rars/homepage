export class Config {
  static $inject = ['$stateProvider', '$urlRouterProvider'];

  constructor($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        template: '<home></home>'
      })
      .state('game', {
        url: '/game',
        template: '<hex-tiles></hex-tiles>'
      });
  }
}
