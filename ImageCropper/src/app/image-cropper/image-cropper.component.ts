import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})

export class ImageCropperComponent implements OnInit {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  x: number = 0;
  y: number = 0;
  img = new Image();
  w: number = 1000;
  h: number = 500;

  constructor() {
    document.addEventListener('keydown', (event) => {
      //Move img up if 'w' or up arrow is pressed
      if (event.keyCode == 38 || event.keyCode == 87)
      {
        this.y -= 2;
        //this.w += 20;
      }
      //Move img down if 's' or down arrow is pressed
      else if (event.keyCode == 40 || event.keyCode == 83)
      {
        this.y += 2;
      }
      //Move img left if 'a' or left arrow is pressed
      else if (event.keyCode == 37 || event.keyCode == 65)
      {
        this.x -= 2;
      }
      //Move img right if 'd' or right arrow is pressed
      else if (event.keyCode == 39 || event.keyCode == 68)
      {
        this.x += 2;
      }
    });
  }



  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg";
    this.ctx.fillStyle = "#000000";

    this.ctx.drawImage(this.img, 0, 0);
   

    this.img.onload = () => {

      this.gameLoop();

      
    }

  }

  

  gameLoop(): void {
    requestAnimationFrame(this.gameLoop.bind(this));
    //this.keyInput.inputLoop();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 1280, 720);

    

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    this.ctx.restore();

    this.drawBoundingBox();

  }


  drawBoundingBox(): void {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = "White";
    this.ctx.rect(400, 100, 250, 250);
    this.ctx.stroke();
  }
}
