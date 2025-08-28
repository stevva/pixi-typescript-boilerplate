import gsap from "gsap";

export function getGsapExample(displayObject: any): gsap.core.Tween {
    const tween = gsap.to(displayObject.scale, {
        x: 2,
        y: 2,
        duration: 1,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
    });

    return tween;
}
