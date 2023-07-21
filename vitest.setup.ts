import 'vitest-canvas-mock';
import { afterAll, vi } from 'vitest'
import 'jest-webgl-canvas-mock';
global.jest = vi
// eslint-disable-next-line import/first
import getCanvasWindow from 'jest-canvas-mock/lib/window'

const apis = [
    'Path2D',
    'CanvasGradient',
    'CanvasPattern',
    'CanvasRenderingContext2D',
    'DOMMatrix',
    'ImageData',
    'TextMetrics',
    'ImageBitmap',
    'createImageBitmap',
] as const

const canvasWindow = getCanvasWindow({ document: window.document })

apis.forEach((api) => {
    global[api] = canvasWindow[api]
    global.window[api] = canvasWindow[api]
})

afterAll(() => {
    delete global.jest
    delete global.window.jest
})