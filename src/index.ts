import { Application, Assets, AssetsManifest } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import "./style.css";
import { getSpine } from "./utils/spine-example";
import { get3dSymbol } from "./utils/symbol-example";
import { getAnimatedSprite } from "./utils/animated-sprite-example";

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

    await loadGameAssets();

    async function loadGameAssets(): Promise<void> {
        const manifest = {
            bundles: [
                {
                    name: "animated-sprites",
                    assets: [{ alias: "bird", src: "./assets/animated-sprite/simpleSpriteSheet.json" }],
                },
                {
                    name: "spines",
                    assets: [
                        { alias: "spineboyData", src: "./assets/spines/spineboy/spineboy-pro.skel" },
                        { alias: "spineboyAtlas", src: "./assets/spines/spineboy/spineboy-pma.atlas" },
                        { alias: "symbolData", src: "./assets/spines/symbols/skeleton.json" },
                        { alias: "symbolAtlas", src: "./assets/spines/symbols/3x3_v3.atlas" },
                    ],
                },
                {
                    name: "images",
                    assets: [
                        { alias: "H01", src: "./assets/images/H01.png" },
                        { alias: "H02", src: "./assets/images/H02.png" },
                        { alias: "M01", src: "./assets/images/M01.png" },
                        { alias: "M02", src: "./assets/images/M02.png" },
                        { alias: "L01", src: "./assets/images/L01.png" },
                        { alias: "L02", src: "./assets/images/L02.png" },
                    ],
                },
            ],
        } satisfies AssetsManifest;

        await Assets.init({ manifest });
        await Assets.loadBundle(["animated-sprites", "spines", "images"]);

        document.body.appendChild(app.canvas);

        resizeCanvas();

        const birdFromSprite = getAnimatedSprite();

        birdFromSprite.anchor.set(0.5, 0.5);
        birdFromSprite.position.set(gameWidth / 2, gameHeight / 4);

        const spineExample = await getSpine();

        spineExample.position.set(gameWidth / 2, gameHeight / 2 + spineExample.getBounds().height);

        const symbolExample = await get3dSymbol();

        symbolExample.position.set(gameWidth / 2, gameHeight / 2 + symbolExample.getBounds().height);

        app.stage.addChild(birdFromSprite);
        // app.stage.addChild(spineExample);
        app.stage.addChild(symbolExample);
    }

    function resizeCanvas(): void {
        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);

            // Resize: Maintain aspect ratio
            {
                const scale = Math.min(window.innerWidth / gameWidth, window.innerHeight / gameHeight);

                app.stage.scale.set(scale);
                app.stage.x = (window.innerWidth - gameWidth * scale) / 2;
                app.stage.y = (window.innerHeight - gameHeight * scale) / 2;
            }
            // Alternative resize: Stretch to fit
            // app.stage.scale.x = window.innerWidth / gameWidth;
            // app.stage.scale.y = window.innerHeight / gameHeight;
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
