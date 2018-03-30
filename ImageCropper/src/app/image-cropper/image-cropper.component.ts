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
  keyInput: cKeyboardInput;

  constructor() {
  }



  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Nicolas_Cage_2011_CC.jpg/220px-Nicolas_Cage_2011_CC.jpg";


    this.ctx.drawImage(this.img, 0, 0);
   

    this.img.onload = () => {
     /*
      this.ctx.drawImage(img, 0, 0);

      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.strokeStyle = "White";
      this.ctx.rect(25, 25, 100, 100);
      this.ctx.stroke();


      this.ctx.translate(200, 0);
      */

      this.keyInput = new cKeyboardInput();

      // PRESS LEFT ARROW OR 'A' KEY
      this.keyInput.addKeycodeCallback(37, this.imgLeft);
      this.keyInput.addKeycodeCallback(65, this.imgLeft);

      // PRESS UP ARROW OR 'W' KEY
      this.keyInput.addKeycodeCallback(38, this.imgUp);
      this.keyInput.addKeycodeCallback(87, this.imgUp);

      // PRESS RIGHT ARROW OR 'D' KEY
      this.keyInput.addKeycodeCallback(39, this.imgRight);
      this.keyInput.addKeycodeCallback(68, this.imgRight);

      // PRESS DOWN ARROW OR 'S' KEY
      this.keyInput.addKeycodeCallback(40, this.imgDown);
      this.keyInput.addKeycodeCallback(83, this.imgDown);

      this.gameLoop();
    }

  }

  

  gameLoop(): void {
    requestAnimationFrame(this.gameLoop.bind(this);
    this.keyInput.inputLoop();

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 1280, 720);

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
    this.ctx.restore();
  }

  keyboardInput(event: KeyboardEvent) {
    // PRESS LEFT ARROW
    if (event.keyCode == 37) {
      window.alert("Left Key Pressed");
    }
    // PRESS UP ARROW
    else if (event.keyCode == 38) {
      window.alert("Up Key Pressed");
    }
    // PRESS RIGHT ARROW
    else if (event.keyCode == 39) {
      window.alert("Right Key Pressed");
    }
    // PRESS DOWN ARROW
    else if (event.keyCode == 40) {
      window.alert("Down Key Pressed");
    }
    // PRESS SPACE BAR
    else if (event.keyCode == 32) {
      window.alert("Space Key Pressed");
    }
  }

  imgUp(): void {
    this.img.y -= 2;
  }

  imgDown(): void {
    this.y += 2;
  }

  imgLeft(): void {
    this.x -= 2;
  }

  imgRight(): void {
    this.x += 2;
  }

}
class cKeyboardInput {
  public keyCallback: { [keycode: number]: () => void; } = {};
  public keyDown: { [keycode: number]: boolean; } = {};
  constructor() {
    document.addEventListener('keydown', this.keyboardDown);
    document.addEventListener('keyup', this.keyboardUp);
  }

  public addKeycodeCallback = (keycode: number, f: () => void): void => {
    this.keyCallback[keycode] = f;
    this.keyDown[keycode] = false;
  }

  public keyboardDown = (event: KeyboardEvent): void => {
    if (this.keyCallback[event.keyCode] != null) {
      event.preventDefault();
    }
    this.keyDown[event.keyCode] = true;
  }

  public keyboardUp = (event: KeyboardEvent): void => {
    this.keyDown[event.keyCode] = false;
  }

  public inputLoop = (): void => {
    for (var key in this.keyDown) {
      var is_down: boolean = this.keyDown[key];

      if (is_down) {
        var callback: () => void = this.keyCallback[key];
        if (callback != null) {
          callback();
        }
      }
    }
  }
}
