import { Container, Sprite } from "pixi.js";

export type TEvents = {
    "left-arrow:click": null;
    "right-arrow:click": null;
}
export type EventCallback<T extends keyof TEvents> = (data?: TEvents[T]) => void;


export interface IStageItem {
    destroy(): void;
    items: Sprite[];
    container: Container;
}

export interface IAppConfig {
    totalItems: number;
    rotationSpeed: number;
}
export interface IContainersConfig {
    itemWidth: number;
    itemHeight: number;
    totalItems: number;
}