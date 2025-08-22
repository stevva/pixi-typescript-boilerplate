import { Spine, TrackEntry } from "@esotericsoftware/spine-pixi-v8";
import { Sprite, Texture } from "pixi.js";

export async function get3dSymbol(): Promise<Spine> {
    const symbol3d = Spine.from({
        atlas: "symbolAtlas",
        skeleton: "symbolData",
        scale: 1,
    });

    const symbol = new Sprite(Texture.from("H01"));
    // symbol3d.addChild(symbol);
    // symbol3d.addSlotObject("Down_symbol", symbol);
    symbol3d.addSlotObject("Up_symbol", symbol);
    // symbol3d.getSlotObject("Up_symbol")?.addChild(symbol);

    symbol3d.state.addListener({
        start: (trackEntry: TrackEntry) => {
            console.log("Animation started", trackEntry.animation?.name);
        },
        complete: (trackEntry: TrackEntry) => {
            console.log("Animation completed", trackEntry.animation?.name);
        },
    });
    symbol3d.state.setAnimation(0, "symbol-start", false);
    symbol3d.state.addAnimation(0, "symbol-loop", true);

    setTimeout(
        () =>
            symbol3d.state.addListener({
                complete: () => {
                    symbol3d.state.setAnimation(0, "symbol-end", false);
                    symbol3d.state.clearListeners();
                },
            }),
        3000,
    );

    return symbol3d;
}
