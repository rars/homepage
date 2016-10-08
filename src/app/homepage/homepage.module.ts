import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LineCanvasComponent } from './line-canvas/line-canvas.component';

@NgModule({
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
    LineCanvasComponent
  ]
})
export class HomepageModule {}
