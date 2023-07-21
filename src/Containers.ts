import { Application, Container, Sprite, Texture } from "pixi.js";
import { EventBus } from "./EventBus";
import { decreaseAngle, increaseAngle, toRadians } from "./helpers";
import { IStageItem } from "./types";

export class Containers implements IStageItem {
    public container: Container;
    public items: Sprite[];
    public positions: number[];

    private _app: Application;
    //@ts-ignore
    private _eventBus: EventBus;
    private _texture: Texture;

    private _centerX: number;
    private _centerY: number;
    private _totalItems: number;

    private _xRadius: number;
    private _yRadius: number;

    private _itemWidth: number;
    private _itemHeight: number;

    constructor(app: Application, eventBus: EventBus, texture: Texture) {
        this._app = app;
        this._eventBus = eventBus;

        this._texture = texture;
        this.items = [];

        this._itemWidth = 100;
        this._itemHeight = 200;

        this._init();
    }
    destroy() {
        this.container.removeChildren();
        this._app.stage.removeChild(this.container);
    }
    update() {
        this.items.forEach((container, index) => {
            const angle = this.positions[index];
            const angleInRadians = toRadians(angle);

            const scaleBy = 0.8;
            const angleFromMidpoint = Math.abs(Math.max(angleInRadians, Math.PI - angleInRadians) - (3 * Math.PI / 2));
            const scaleFactor = 1 + scaleBy * angleFromMidpoint / Math.PI;

            container.width = this._itemWidth * scaleFactor;
            container.height = this._itemHeight * scaleFactor;

            container.zIndex = scaleFactor;

            const x = this._centerX + this._xRadius * Math.cos(angleInRadians);
            const y = this._centerY + this._yRadius * Math.sin(angleInRadians);

            container.x = x;
            container.y = y;
        })
    }
    rotateLeft(angleInDegrees: number) {
        this.positions = this.positions.map(angle => increaseAngle(angle, angleInDegrees));
    }
    rotateRight(angleInDegrees: number) {
        this.positions = this.positions.map(angle => decreaseAngle(angle, angleInDegrees));
    }
    rotateTo(index: number) {
        const frontElementAngle = 90;
        const sectorAngle = Math.round(360 / this._totalItems);
        const itemAngle = this.positions[index];

        const steps = Math.round((frontElementAngle - itemAngle) / sectorAngle);

        this.positions = this.positions.map(angle => increaseAngle(angle, sectorAngle * steps));
    }

    private _init() {
        this.positions = [];
        this._totalItems = 12;

        const rendererWidth = this._app.renderer.width;
        const rendererHeight = this._app.renderer.height;
        const GAP = 100;

        this._centerX = rendererWidth / 2;
        this._centerY = rendererHeight / 2 - GAP;

        this._xRadius = rendererWidth / 2 - GAP;
        this._yRadius = 50;

        this.container = new Container();
        this.container.sortableChildren = true;

        for (let index = 0; index < this._totalItems; index++) {
            const container = new Sprite(this._texture);

            container.width = this._itemWidth;
            container.height = this._itemHeight;

            container.anchor.x = 0.5;
            container.anchor.y = 0.5;

            const angle = (360 * index) / this._totalItems;
            this.positions.push(angle);

            this.items.push(container);


            this.container.addChild(container);
        }

        this._app.stage.addChild(this.container);
        this.update();
    }
}