import * as THREE from "../build/three.module.js";

export class Controller {
    constructor(model, camera, powerFireElement, bulletManager) {
        this.model = model;
        this.camera = camera;
        this.model.add(this.camera);
        this.powerFireElement = powerFireElement;
        this.keys = { a: false, d: false, w: false, s: false, q: false, e: false, shift: false, space: false };
        this.cameraGroups = {
            default: new THREE.Object3D(),
            a: new THREE.Object3D(),
            d: new THREE.Object3D(),
            w: new THREE.Object3D(),
            s: new THREE.Object3D(),
            q: new THREE.Object3D(),
            e: new THREE.Object3D(),
            shift: new THREE.Object3D(),
        };
        this.cameraGroups.default.position.set(0, 1.5, 5);
        this.cameraGroups.a.position.set(-5, 1.5, 5);
        this.cameraGroups.d.position.set(5, 1.5, 5);
        this.cameraGroups.w.position.set(0, 5, 5);
        this.cameraGroups.s.position.set(0, -1.5, 5);
        this.cameraGroups.q.position.set(1, 1, 5);
        this.cameraGroups.e.position.set(-1, 1, 5);
        this.cameraGroups.shift.position.set(0, 1.5, 7);

        this.bulletManager = bulletManager;

        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
    }

    handleKeyDown(event) {
        switch (event.key.toLowerCase()) {
            case "a" || "A":
                this.keys.a = true;
                break;
            case "d" || "D":
                this.keys.d = true;
                break;
            case "w" || "W":
                this.keys.w = true;
                break;
            case "s" || "S":
                this.keys.s = true;
                break;
            case "q" || "Q":
                this.keys.q = true;
                break;
            case "e" || "E":
                this.keys.e = true;
                break;
            case "shift":
                this.keys.shift = true;
                break;
            case " ":
                this.shoot();
                this.keys.space = true;
                break;
        }
    }

    handleKeyUp(event) {
        switch (event.key.toLowerCase()) {
            case "a" || "A":
                this.keys.a = false;
                break;
            case "d" || "D":
                this.keys.d = false;
                break;
            case "w" || "W":
                this.keys.w = false;
                break;
            case "s" || "S":
                this.keys.s = false;
                break;
            case "q" || "Q":
                this.keys.q = false;
                break;
            case "e" || "E":
                this.keys.e = false;
                break;
            case "shift":
                this.keys.shift = false;
                break;
            case " ":
                this.keys.space = false;
                
                break;
        }
    }

    shoot() {
        if (!this.bulletManager) return; // Kiểm tra nếu chưa có BulletManager

        let position = this.model.position.clone(); // Lấy vị trí nhân vật
        let direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction); // Lấy hướng mà camera đang nhìn

        this.bulletManager.shootBullet(position, direction);
    }

    update() {
        if (this.keys.a) {
            this.model.rotateY(toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.a.position, 0.02);
        } else if (this.keys.d) {
            this.model.rotateY(-toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.d.position, 0.02);
        }
        if (this.keys.q) {
            this.model.rotateZ(toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.q.position, 0.02);
        } else if (this.keys.e) {
            this.model.rotateZ(-toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.e.position, 0.02);
        }
        if (this.keys.w) {
            this.model.rotateX(toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.w.position, 0.02);
        } else if (this.keys.s) {
            this.model.rotateX(-toRadians(1 / 6));
            this.camera.position.lerp(this.cameraGroups.s.position, 0.02);
        }
        if (this.keys.shift) {
            this.model.translateZ(-0.02);
            this.camera.position.lerp(this.cameraGroups.shift.position, 0.02);
        }
        if (this.keys.space) {
            this.shoot();
            this.powerFireElement.style.transform = "scale(0.7)";
        } else {
            this.powerFireElement.style.transform = "scale(1)";
        }

        if (this.model) {
            this.model.translateZ(-0.01);
            this.camera.position.lerp(this.cameraGroups.default.position, 0.04);
        }
    }

}