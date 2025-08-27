import { Sprite, Texture } from "pixi.js";

export async function getSprite(textureName: string): Promise<Sprite> {
    const sprite = new Sprite(Texture.from(textureName));

    return sprite;
}
