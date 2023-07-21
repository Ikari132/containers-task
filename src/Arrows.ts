import { Application, Sprite, Container, Texture } from 'pixi.js';
import { EventBus } from './EventBus';
import { IStageItem } from './types';

export class Arrows implements IStageItem {
    public container: Container;
    public items: Sprite[];

    private _app: Application;
    private _eventBus: EventBus;
    private _texture: Texture;

    constructor(app: Application, eventBus: EventBus, texture: Texture) {
        this._app = app;
        this._eventBus = eventBus;
        this._texture = texture;
        this.items = [];

        this._init();
    }
    destroy() {
        this.container.removeChildren();
        this._app.stage.removeChild(this.container);
    }

    private _init() {
        this.container = new Container();

        const GAP = 50;

        const leftArrow = new Sprite(this._texture);
        leftArrow.anchor.x = 0.5;
        leftArrow.anchor.y = 0.5;
        leftArrow.angle = 180;
        leftArrow.position.set(0, this._app.renderer.height - GAP);
        this.container.addChild(leftArrow);

        const rightArrow = new Sprite(this._texture);
        rightArrow.anchor.x = 0.5;
        rightArrow.anchor.y = 0.5;
        rightArrow.angle = 0;
        rightArrow.scale.y = -1
        rightArrow.position.set(300, this._app.renderer.height - GAP);
        this.container.addChild(rightArrow);

        this._app.stage.addChild(this.container);

        this.container.x = this._app.renderer.width / 2 - this.container.width / 2;
        this.container.y = 0;

        leftArrow.eventMode = "static";
        leftArrow.on('click', () => {
            this._eventBus.dispatch("left-arrow:click")
        });

        rightArrow.eventMode = "static";
        rightArrow.on('click', () => {
            this._eventBus.dispatch("right-arrow:click")
        });

        this.items.push(leftArrow, rightArrow);
    }
}  
