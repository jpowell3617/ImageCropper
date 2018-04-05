import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})

export class ImageCropperComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number = 50;
  y: number = 50;
  img = new Image();

  constructor() {
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg";
    this.ctx.drawImage(this.img, 0, 0);
    this.img.onload = () => {
      this.gameLoop();
    }
  }

  gameLoop(): void {
    document.addEventListener('keydown', ($evnt : KeyboardEvent) => {
      console.log($evnt.key);
      if($evnt.key == 'a' || $evnt.key == 'ArrowLeft') this.x -= 1;
      if($evnt.key == 'w' || $evnt.key == 'ArrowUp') this.y += 1;
      if($evnt.key == 'd' || $evnt.key == 'ArrowRight') this.x += 1;
      if($evnt.key == 's' || $evnt.key == 'ArrowDown') this.y -= 1;
      this.ctx.drawImage(this.img, this.x, this.y);
      setTimeout(() => {},100)
    });

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 1280, 720);

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
  }
}
