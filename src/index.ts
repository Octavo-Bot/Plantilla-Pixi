import { Application, Container, Loader, Point, Sprite } from "pixi.js";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x6495ed,
  width: 1280,
  height: 720,
});

window.addEventListener("resize", () => {
  const scaleX = window.innerWidth / app.screen.width; //1280 / 640 => 2 (Osea si tu pantalla es 1280 tu juego se muestra al doble de su tamaño)
  const scaleY = window.innerHeight / app.screen.height;
  const scale = Math.min(scaleX, scaleY);

  const gameWidth = Math.round(app.screen.width * scale);
  const gameHeight = Math.round(app.screen.height * scale);

  const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
  const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

  app.view.style.width = gameWidth + "px";
  app.view.style.height = gameHeight + "px";

  app.view.style.marginLeft = marginHorizontal + "px";
  app.view.style.marginRight = marginHorizontal + "px";

  app.view.style.marginTop = marginVertical + "px";
  app.view.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));

Loader.shared.add({ url: "./PerroGaucho.jpg", name: "Gaucho" });
Loader.shared.add({ url: "./GafasG.png", name: "Gafas" });

Loader.shared.onComplete.add(() => {
  const clampy: Sprite = Sprite.from("Gaucho");
  const gafas: Sprite = Sprite.from("Gafas");

  console.log("Hola Perro Tomando Mate!", clampy.width, clampy.height);

  gafas.scale.x = 0.233;
  gafas.scale.y = 0.233;
  gafas.position.set(50, 22);

  const clampyWithgafas: Container = new Container();

  clampyWithgafas.addChild(clampy);
  clampyWithgafas.addChild(gafas);

  clampyWithgafas.scale.set(2);
  clampyWithgafas.x = 350;
  clampyWithgafas.y = 100;

  console.log(gafas.toGlobal(new Point()));
  console.log(gafas.parent.toGlobal(gafas.position));

  //640 x 360 (Esto seria el medio de la pantalla de 1280 x 720)

  //const aux = gafas.parent.toLocal(new Point(640,360));
  //gafas.position.x = aux.x;
  //gafas.position.y = aux.y;

  // Colocar gafas en el centro de la pantalla

  app.stage.addChild(clampyWithgafas);
});

Loader.shared.load();
