import { SceneManager } from "./sceneManager.js";
import { ModelLoader } from "./modelLoader.js";
import { Controller } from "./controller.js";
import { Background } from "./background.js";
import { BulletManager } from "./bulletManager.js";

const container = document.getElementById("container3D");
const powerFireElement = document.getElementById('centerpowerId');

const sceneManager = new SceneManager(container);
Background.setSpaceBackground(sceneManager.scene);

const modelLoader = new ModelLoader(sceneManager.scene);
modelLoader.loadModel("./models/xwing-2.glb", (model) => {
    const bulletManager = new BulletManager(sceneManager.scene);

    const controller = new Controller(model, sceneManager.camera, powerFireElement, bulletManager);

    function animate() {
        requestAnimationFrame(animate);
        controller.update();
        bulletManager.update();
        sceneManager.render();
    }

    animate();
});

window.addEventListener("resize", () => sceneManager.onResize());
