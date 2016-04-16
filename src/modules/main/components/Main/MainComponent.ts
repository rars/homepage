import {MainController} from './MainController';
import './Main.scss';

export class MainComponent implements ng.IComponentOptions {
  public controllerAs = 'vm';
  public controller = MainController;
  public template: string = require('./Main.html');
}
