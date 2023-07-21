import { expect, it, describe, beforeEach, afterEach, vi } from 'vitest';
import { Application, Texture } from 'pixi.js';
import { Arrows } from './../Arrows';
import { EventBus } from './../EventBus';
import { CanvasRenderer } from '@pixi/canvas-renderer';

describe('Arrows', () => {
    let app: Application;
    let eventBus: EventBus;
    let texture: Texture;
    let arrows: Arrows;

    beforeEach(() => {
        new CanvasRenderer();
        app = new Application();
        eventBus = new EventBus();
        texture = Texture.WHITE;
        arrows = new Arrows(app, eventBus, texture);
    });

    afterEach(() => {
        arrows.destroy();
        app.destroy(true);
    });

    it('should add container to the stage', () => {
        expect(app.stage.children).toContain(arrows['container']);
    });
    it('should add left arrow to the stage', () => {
        expect(arrows.container.children).toContain(arrows.items[0]);
    });
    it('should add right arrow to the stage', () => {
        expect(arrows.container.children).toContain(arrows.items[1]);
    });

    it('should add right arrow to the stage', () => {
        expect(arrows.container.children).toContain(arrows.items[1]);
    });

    it('left arrow click dispatches event', () => {
        const spy = vi.spyOn(eventBus, 'dispatch');
        const leftArrow = arrows.items[0];

        leftArrow.emit('click', null as never);
        expect(spy).toHaveBeenCalledWith('left-arrow:click');
    });
    it('right arrow click dispatches event', () => {
        const spy = vi.spyOn(eventBus, 'dispatch');
        const rightArrow = arrows.items[1];

        rightArrow.emit('click', null as never);
        expect(spy).toHaveBeenCalledWith('right-arrow:click');
    });
});