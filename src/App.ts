import { Application, Texture } from "pixi.js";
import { EventBus } from "./EventBus";
import { Arrows } from "./Arrows";
import { Containers } from "./Containers";
import { IStageItem } from "./types";
import ContainerImg from './assets/Ghost_Container_Full.png';
import ArrowImg from './assets/NavArrow_Flip.png';

export class App {
    private _app: Application;
    private _eventBus: EventBus;
    private _contanier: HTMLElement;

    private _textures: Record<string, Texture>;

    private _rotateDegrees: number;
    private _rotationSpeed: number;
    private _totalItems: number;

    private _items: IStageItem[];

    constructor(containerId?: string) {
        this._rotateDegrees = 0;
        this._totalItems = 12;
        this._rotationSpeed = 0.5;
        this._items = [];

        this._eventBus = new EventBus();
        this._textures = {
            container: Texture.from(ContainerImg),
            arrow: Texture.from(ArrowImg)
        }

        this._contanier = document.querySelector(`#${containerId}`) || document.body;

        this.init();
    }
    destroy() {
        this._app.destroy();
    }

    init() {
        this._app = new Application({
            width: 1000,
            height: 600,
            backgroundColor: 0x1099bb,
        });

        const arrows = new Arrows(this._app, this._eventBus, this._textures['arrow']);
        const containers = new Containers(this._app, this._eventBus, this._textures['container']);

        this._items.push(arrows, containers);

        containers.rotateTo(0);
        containers.update();

        this._contanier.appendChild(this._app.view as HTMLCanvasElement);

        this._app.ticker.add(() => {
            if (this._rotateDegrees > 0) {
                const angle = this._rotateDegrees > this._rotationSpeed
                    ? this._rotationSpeed : this._rotateDegrees;

                containers.rotateLeft(angle);
                this._rotateDegrees -= angle;
                containers.update();
            }

            if (this._rotateDegrees < 0) {
                const angle = Math.abs(this._rotateDegrees) > this._rotationSpeed
                    ? this._rotationSpeed : Math.abs(this._rotateDegrees);

                containers.rotateRight(angle);
                this._rotateDegrees += angle;
                containers.update();
            }
        });
        this._initEventHandlers();

    }

    private _initEventHandlers() {
        const sectorAngle = Math.round(360 / this._totalItems);

        this._eventBus.on("right-arrow:click", () => {
            if (this._rotateDegrees !== 0) {
                return;
            }
            this._rotateDegrees = -Math.round(sectorAngle);
        })
        this._eventBus.on("left-arrow:click", () => {
            if (this._rotateDegrees !== 0) {
                return;
            }
            this._rotateDegrees = Math.round(sectorAngle);
        })
    }
}