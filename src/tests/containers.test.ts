import { expect, it, describe, beforeEach, afterEach } from 'vitest';
import { Application, Texture } from 'pixi.js';
import { Containers } from './../Containers';
import { EventBus } from './../EventBus';
import { CanvasRenderer } from '@pixi/canvas-renderer';

describe('Arrows', () => {
    let app: Application;
    let eventBus: EventBus;
    let texture: Texture;
    let containers: Containers;

    beforeEach(() => {
        new CanvasRenderer();
        app = new Application();
        eventBus = new EventBus();
        texture = Texture.WHITE;
        containers = new Containers(app, eventBus, texture);
    });

    afterEach(() => {
        containers.destroy();
        app.destroy(true);
    });

    it('should add container to the stage', () => {
        expect(app.stage.children).toContain(containers.container);
    });
    it('should create 12 items', () => {
        expect(containers.items.length).toEqual(12);
    });
    it('should rotate items left by 30 degrees', () => {
        containers.rotateLeft(30);
        expect(containers.positions[0]).toEqual(30);
    });
    it('should rotate items right by 30 degrees', () => {
        containers.rotateRight(30);
        expect(containers.positions[0]).toEqual(330);
    });
    it('should rotate item with index 5 to 90 degrees position', () => {
        containers.rotateTo(5);
        expect(containers.positions[5]).toEqual(90);
    });
});