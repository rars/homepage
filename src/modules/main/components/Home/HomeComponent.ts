import {HomeController} from './HomeController';
import './Home.scss';

export class HomeComponent implements ng.IComponentOptions {
  public controllerAs = 'vm';
  public controller = HomeController;
  public template: string = require('./Home.html');
}
