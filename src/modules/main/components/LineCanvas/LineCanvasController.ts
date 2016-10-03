import * as THREE from 'three';

const TWOPI = Math.PI * 2.0;

export class LineCanvasController {
  private static WIDTH = 512;
  private static HEIGHT = 256;

  private static VIEW_ANGLE = 45;
  private static ASPECT = LineCanvasController.WIDTH / LineCanvasController.HEIGHT;
  private static NEAR = 0.1;
  private static FAR = 10000;

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private scene: THREE.Scene;
  private points: Array<THREE.Sprite>;
  private lineGeometry: THREE.Geometry;
  private t: number = 0;
  private frequency: number = 0.01;
  private lastAnimationFrameTime: Date;

  public static $inject: Array<string> = [];

  public constructor() {
    const canvas = this.getCanvas();

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    this.camera = new THREE.PerspectiveCamera(
      LineCanvasController.VIEW_ANGLE,
      canvas.clientWidth / canvas.clientHeight,
      LineCanvasController.NEAR,
      LineCanvasController.FAR);

    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);
    this.points = [];
    this.scene.add(this.drawLine(this.scene));

    // this.renderer.setSize(LineCanvasController.WIDTH, LineCanvasController.HEIGHT);

    this.renderer.render(this.scene, this.camera);

    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize, false);
    this.animate();
  }

  public animate = (): void => {
    requestAnimationFrame(this.animate);
    this.render();
  }

  public onWindowResize = (): void => {
    const canvas = this.getCanvas();

    canvas.width = window.innerWidth;

    this.camera.aspect = canvas.width / canvas.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(canvas.width, canvas.clientHeight);
  }

  public drawLine(
        scene: THREE.Scene): THREE.Line {
    const material = new THREE.LineBasicMaterial({
      color: 0xad8cff
    });

    const pointMaterial = LineCanvasController.createSpriteMaterial();

    this.lineGeometry = new THREE.Geometry();

    for (let i = 0; i < 2000; i++) {
      const pointOne = LineCanvasController.createPoint(
        pointMaterial);
      scene.add(pointOne);
      // this.lineGeometry.vertices.push(pointOne.position);
      this.points.push(pointOne);
    }

    return new THREE.Line(this.lineGeometry, material);
  }

  private static createPoint(
      material: THREE.Material): THREE.Sprite {
    const point = new THREE.Sprite(material);
    point.scale.x = point.scale.y = 1;
    return point;
  }

  private setPointPosition(
      point: THREE.Sprite,
      t: number): void {
    const length = 500.0;

    const pos = this.gaborPosition(
      -(length / 2.0) + (length * t));

    point.position.x = pos.x;
    point.position.y = pos.y;
    point.position.z = pos.z;
  }

  private gaborPosition(
      t: number): THREE.Vector3 {
    const p = TWOPI * this.frequency * t;
    const alpha = 30.0 * Math.exp(-(0.01 * p * p));
    return new THREE.Vector3(
      t,
      alpha * Math.cos(p),
      alpha * Math.sin(p));
  }

  private static createSpriteMaterial(): THREE.SpriteMaterial {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');

    console.log(canvas.width);
    console.log(canvas.height);

    context.beginPath();
    context.arc(canvas.width / 2.0, canvas.height / 2.0, 70, 0, TWOPI, false);
    context.fillStyle = 'rgba(135, 149, 232, 0.95)';
    context.fill();

    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    texture.anisotropy = 0;
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;

    return new THREE.SpriteMaterial({
      color: 0xffffff,
      map: texture
    });
  }

  private static randNormal() {
    const u = 1 - Math.random();
    const v = 1 - Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(TWOPI * v);
  }

  private getCanvas = (): HTMLCanvasElement => {
    return <HTMLCanvasElement>document.getElementById('rars-line-canvas-container');
  }

  private render(): void {
    const nowTime = new Date();
    const frequencyPerSecond = 10.0;
    if (!this.lastAnimationFrameTime) {
      this.t = 0;
    }
    else {
      const millisecondsElapsed = nowTime.valueOf() - this.lastAnimationFrameTime.valueOf();
      this.t += frequencyPerSecond * (millisecondsElapsed / 1000.0);
    }
    this.frequency = 0.04 + (0.04 * Math.cos(Math.PI + (this.t / 50.0)));

    for (let i = 0; i < this.points.length; i++) {
      this.setPointPosition(this.points[i], i / this.points.length);
    }
    this.lineGeometry.verticesNeedUpdate = true;

    // this.camera.position.x += 1 * Math.sin(this.t);
    // this.camera.position.y += 1 * Math.cos(this.t);

    this.renderer.render(this.scene, this.camera);
    this.lastAnimationFrameTime = nowTime;
  }
}
