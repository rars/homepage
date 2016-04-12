import 'angular';

import {MainComponent} from './components/Main/MainComponent';

angular.module('rars.homepage.main', [])
  .component('rarsMain', new MainComponent());
