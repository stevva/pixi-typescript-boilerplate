import { Group, Tween } from "@tweenjs/tween.js";

export function getTweenExample(group: Group, displayObject: any): Tween {
    const tween = new Tween(displayObject.scale)
        .to({ x: [1, 2, 1], y: [1, 2, 1] }, 500)
        .repeat(Infinity)
        .start();
    group.add(tween);

    return tween;
}
