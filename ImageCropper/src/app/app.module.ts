import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

const routes = [
  { path: '', component: ImageCropperComponent },
  { path: 'image-cropper', component: ImageCropperComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
