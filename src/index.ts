import { Application, Assets, AssetsManifest, Container, ContainerChild, Text } from "pixi.js";
import "@esotericsoftware/spine-pixi-v8";
import "./style.css";
import { getSprite } from "./utils/sprite-example";
import { Group } from "@tweenjs/tween.js";
import gsap from "gsap";

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

        const grid = new Container();

        let rows = 3;
        let columns = 4;
        const textures = ["H01", "H02", "H03", "M01", "M02", "M03", "L01", "L02", "L03", "L04"];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const randomIndex = 0//Math.floor((Math.random() * 10) % textures.length)
                const texture = textures[randomIndex]
                const cell = await getSprite(texture);
                cell.label = texture;
                cell.width = 200;
                cell.height = 250;
                cell.anchor.set(0.5);

                const startX = -200;
                const startY = -250;
                const x = startX + j * 200;
                const y = startY + i * 250;
                cell.position.set(x, y);
                grid.addChild(cell);
            }
        }

        grid.position.set(gameWidth / 2, gameHeight / 2);
        grid.setSize(200 * 4, 250 * 3)
        grid.pivot.set(100, 0)

        app.stage.addChild(grid);

        gsap.to(grid, {
            scale: 0.8,
            delay: 2,
            ease: "power1.inOut",
            onComplete: () => {
                checkWin(grid, columns, rows);
            }
        });

        const checkWin = (grid: Container<ContainerChild>, columns: number, rows: number) => {
            let arr = [];
            for (let i = 0; i < columns; i++)
                arr.push(grid.children[i]);
            if (arr[0].label === arr[1].label && arr[0].label === arr[2].label && arr[1].label === arr[2].label)
                win(arr[0], arr[1], arr[2])
            else
                lose(grid, rows, columns)
        }

        const win = (sym1: ContainerChild, sym2: ContainerChild, sym3: ContainerChild) => {
            gsap.to([sym1, sym2, sym3], {
                scale: 1.2,
                alpha: 0.8,
                delay: 1,
                duration: 2000,
                yoyo: true,
            });
        }

        const lose = (grid: Container<ContainerChild>, rows: number, columns: number) => {
            alert("lose")
            const topLeftSym = grid.getChildAt(0);
            const bottomRightSym = grid.getChildAt(rows * columns - 1)
            // gsap.to(topLeftSym, {
            //     x: bottomRightSym.x,
            //     y: bottomRightSym.y,
            //     duration: 1000,
            // });
        }
    }

    function resizeCanvas(): void {
        const resize = () => {
            app.renderer.resize(window.innerWidth, window.innerHeight);
            if (window.innerWidth > window.innerHeight) {
                app.stage.scale.x = window.innerWidth / gameWidth;
                app.stage.scale.y = app.stage.scale.x;
            } else {
                app.stage.scale.x = window.innerWidth / gameWidth;
                app.stage.scale.y = app.stage.scale.x;
            }
        };

        resize();

        window.addEventListener("resize", resize);
    }
})();
