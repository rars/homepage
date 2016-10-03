import 'angular';
import 'angular-ui-router';

import {Config} from './common/Config.ts';
import {MainComponent} from './components/Main/MainComponent';
import {HomeComponent} from './components/Home/HomeComponent';
import {LineCanvasComponent} from './components/LineCanvas/LineCanvasComponent';

angular.module('rars.homepage.main', ['ui.router'])
  .config(Config)
  .component('rarsMain', new MainComponent())
  .component('home', new HomeComponent())
  .component('rarsLineCanvas', new LineCanvasComponent());
