import {LineCanvasController} from './LineCanvasController';
import './LineCanvas.scss';

export class LineCanvasComponent implements ng.IComponentOptions {
  public controllerAs = 'vm';
  public controller = LineCanvasController;
  public template: string = require('./LineCanvas.html');
}