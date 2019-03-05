import { ArcRotateCamera, Color4, Engine, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3 } from '@babylonjs/core';
import { IRenderTarget } from './renderTarget';

export class BabylonRenderTarget implements IRenderTarget {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;

    private meshes: Map<number, Mesh> = new Map<number, Mesh>();

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(canvas, true);
        this.scene = new Scene(this.engine);

        // Needed?
        this.beginScene();

        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    public resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.engine.resize();
    }

    public beginFrame(): void {
        // No-op; taken care of in runRenderLoop
    }

    public beginScene(): void {
        this.scene = new Scene(this.engine);
        this.meshes = new Map<number, Mesh>();

        this.scene.clearColor = new Color4(0, 0, 0, 1);
        this.scene.useRightHandedSystem = true;

        const camera = new ArcRotateCamera(
            'mainCamera',
            Math.PI / 2,
            Math.PI / 2,
            1.5,
            new Vector3(0.5, 0.5, 0),
            this.scene);

        // camera.attachControl(this.canvas);

        this.scene.activeCamera = camera;

        // tslint:disable-next-line: no-unused-expression
        new HemisphericLight('mainLight', new Vector3(1, 1, 1), this.scene);
    }

    public rect(id: number, x: number, y: number, width: number, height: number): void {
        // We want the center, but we're given the top left, so adjust accordingly
        x += width / 2;
        y += height / 2;

        if (!this.meshes.has(id)) {
            const createdMesh = MeshBuilder.CreateBox(id.toString(), {
                width,
                height,
                depth: 0.001,
            }, this.scene);

            this.meshes.set(id, createdMesh);
        }

        const mesh: Mesh = this.meshes.get(id) as Mesh;

        mesh.position.x = x;
        mesh.position.y = 1 - y;
    }

    public circle(id: number, x: number, y: number, r: number): void {
        if (!this.meshes.has(id)) {
            this.meshes.set(
                id,
                MeshBuilder.CreateSphere(
                    id.toString(),
                    {
                        diameter: 1,
                    },
                    this.scene));
        }

        const mesh: Mesh = this.meshes.get(id) as Mesh;

        mesh.position.x = x;
        mesh.position.y = 1 - y;
        mesh.scalingDeterminant = r * 2;
    }

    // tslint:disable-next-line: variable-name
    public text(_id: number, _s: string, _x: number, _y: number): void {
        // TODO: do
    }
}
