import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import "./style.css";
import { getSprite } from "./utils/sprite-example";
import { Group } from "@tweenjs/tween.js";

declare global {
    // eslint-disable-next-line no-var
    var __PIXI_APP__: Application | undefined;
}

const gameWidth = 1280;
const gameHeight = 720;

console.log(
    `%cPixiJS V8\nTypescript Boilerplate%c ${VERSION} %chttp://www.pixijs.com ❤️`,
    "background: #ff66a1; color: #FFFFFF; padding: 2px 4px; border-radius: 2px; font-weight: bold;",
    "color: #D81B60; font-weight: bold;",
    "color: #C2185B; font-weight: bold; text-decoration: underline;",
    //     "color: #ff66a1;",
);

(async () => {
    const app = new Application();

    globalThis.__PIXI_APP__ = app;

    //await window load
    await new Promise((resolve) => {
        window.addEventListener("load", resolve);
    });

    await app.init({ backgroundColor: 0xd3d3d3, width: gameWidth, height: gameHeight });

    const group = new Group();

    app.ticker.add((delta) => {
        group.update(); // updates all tweens in this group
    });

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [
                {
                    name: "images",
                    assets: [
                        { alias: "H01", src: "./assets/images/H01.png" },
                        { alias: "H02", src: "./assets/images/H02.png" },
                        { alias: "H03", src: "./assets/images/H03.png" },
                        { alias: "M01", src: "./assets/images/M01.png" },
                        { alias: "M02", src: "./assets/images/M02.png" },
                        { alias: "M03", src: "./assets/images/M03.png" },
                        { alias: "L01", src: "./assets/images/L01.png" },
                        { alias: "L02", src: "./assets/images/L02.png" },
                        { alias: "L03", src: "./assets/images/L03.png" },
                        { alias: "L04", src: "./assets/images/L04.png" },
                    ],
                },
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["images"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const sprite = await getSprite("H01");
        sprite.anchor.set(0.5, 0.5);
        sprite.position.set(gameWidth / 2, gameHeight / 2);

        app.stage.addChild(sprite);
    }

    function resizeCanvas(): void {
        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            app.stage.scale.x = window.innerWidth / gameWidth;
            app.stage.scale.y = window.innerHeight / gameHeight;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
