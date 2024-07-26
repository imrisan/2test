/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");


class ThreeJSContainer {
    scene;
    light;
    constructor() {
    }
    // 画面部分の作成(表示する枠ごとに)*
    createRendererDOM = (width, height, cameraPos) => {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer();
        renderer.setSize(width, height);
        renderer.setClearColor(new three__WEBPACK_IMPORTED_MODULE_1__.Color(0x495ed));
        renderer.shadowMap.enabled = true; //シャドウマップを有効にする
        //カメラの設定
        const camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.copy(cameraPos);
        camera.position.x = -25;
        camera.position.y = 20;
        camera.position.z = 20;
        camera.up.set(0, 1, 0);
        camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-25, 0.5, -5));
        const orbitControls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_0__.OrbitControls(camera, renderer.domElement);
        orbitControls.target.set(-25, 0.5, -5);
        orbitControls.update();
        this.createScene();
        // 毎フレームのupdateを呼んで，render
        // reqestAnimationFrame により次フレームを呼ぶ
        const render = (time) => {
            orbitControls.update();
            renderer.render(this.scene, camera);
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);
        renderer.domElement.style.cssFloat = "left";
        renderer.domElement.style.margin = "10px";
        return renderer.domElement;
    };
    // シーンの作成(全体で1回)
    createScene = () => {
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
        const axesBarLength = 10.0;
        this.scene.add(new three__WEBPACK_IMPORTED_MODULE_1__.AxesHelper(axesBarLength));
        //ball生成
        const ballGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.SphereGeometry(0.5);
        const ballMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0xffd900 });
        const ball = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(ballGeometry, ballMaterial);
        ball.position.z = -5;
        ball.position.y = 0.5;
        this.scene.add(ball);
        //goal
        const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(0.5, 10);
        const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ color: 0xffffff, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide });
        const goal = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material);
        goal.rotateY(Math.PI / 2);
        goal.rotateZ(Math.PI / 2);
        goal.position.x = -45;
        goal.position.y = 0.5;
        goal.position.z = -5;
        this.scene.add(goal);
        //床生成
        let makeFloor1 = () => {
            let floorShape1 = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            floorShape1.moveTo(1, 0);
            floorShape1.lineTo(-5, 0);
            floorShape1.lineTo(-10, 2);
            floorShape1.lineTo(-15, 0);
            floorShape1.lineTo(-20, 0);
            floorShape1.lineTo(-20, -1);
            floorShape1.lineTo(1, -1);
            return floorShape1;
        };
        let makeFloor2 = () => {
            let floorShape2 = new three__WEBPACK_IMPORTED_MODULE_1__.Shape();
            floorShape2.moveTo(-30, 0);
            floorShape2.lineTo(-50, 0);
            floorShape2.lineTo(-50, -1);
            floorShape2.lineTo(-30, -1);
            return floorShape2;
        };
        let extrudeSettings = {
            steps: 1,
            depth: -10,
            bevelEnabled: false,
            bevelThickness: 4,
            bevelSize: 2,
            bevelSegments: 3
        };
        let floorGeometry1 = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(makeFloor1(), extrudeSettings);
        let floorGeometry2 = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(makeFloor2(), extrudeSettings);
        let meshMaterial1 = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0x84331f, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
        let meshMaterial2 = new three__WEBPACK_IMPORTED_MODULE_1__.MeshPhongMaterial({ color: 0x84331f, side: three__WEBPACK_IMPORTED_MODULE_1__.DoubleSide, flatShading: true });
        let floorGroup = new three__WEBPACK_IMPORTED_MODULE_1__.Group();
        floorGroup.add(new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(floorGeometry1, meshMaterial1));
        floorGroup.add(new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(floorGeometry2, meshMaterial2));
        this.scene.add(floorGroup);
        let mesh1 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(floorGeometry1, meshMaterial1);
        let mesh2 = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(floorGeometry2, meshMaterial2);
        floorGroup.add(mesh1);
        floorGroup.add(mesh2);
        //壁生成
        //頂点座標
        const vertices = new Float32Array([
            -50, 10, -10,
            -50, 0, -10,
            0, 0, -10,
            0, 10, -10, //3
        ]);
        // 頂点インデックス
        const indices = [
            0, 1, 2,
            0, 2, 3,
        ];
        const uvs = new Float32Array([
            0, 1,
            0, 0,
            1, 0,
            1, 1,
        ]);
        const wallLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
        const wallTexture = wallLoader.load('background5.png');
        const wallGeometry = new three__WEBPACK_IMPORTED_MODULE_1__.BufferGeometry();
        wallGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(vertices, 3));
        wallGeometry.setAttribute('uv', new three__WEBPACK_IMPORTED_MODULE_1__.BufferAttribute(uvs, 2));
        wallGeometry.computeVertexNormals();
        wallGeometry.setIndex(indices);
        const wallMaterial = new three__WEBPACK_IMPORTED_MODULE_1__.MeshBasicMaterial({ map: wallTexture });
        const wallMesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(wallGeometry, wallMaterial);
        this.scene.add(wallMesh);
        //ライトの設定
        this.light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff);
        const lvec = new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1, 1, 1).clone().normalize();
        this.light.position.set(lvec.x, lvec.y, lvec.z);
        this.scene.add(this.light);
        const clock = new three__WEBPACK_IMPORTED_MODULE_1__.Clock();
        let t = 0;
        // 毎フレームのupdateを呼んで，更新
        // reqestAnimationFrame により次フレームを呼ぶ
        let ay = 0;
        let vy = 0;
        let vx = 0;
        let tmp;
        let update = (time) => {
            if (0 >= ball.position.x && ball.position.x > -5) {
                vx = 1 / 20;
            }
            else if (-5 >= ball.position.x && ball.position.x > -10) {
                vx = 1 / 30;
                ball.position.y += vx * 2 / 5;
            }
            else if (-10 >= ball.position.x && ball.position.x > -15) {
                if (vy == 0) {
                    ay = -1 / 30;
                }
                vy = -1 / 30 + ay;
                vx = vy * -1 * 2.5;
            }
            else if (-15 >= ball.position.x && ball.position.x > -20) {
                vy = 0;
            }
            else if (-20 >= ball.position.x && ball.position.x > -30) {
                if (vy == 0) {
                    vy = 1.2;
                }
                ay = -1 / 30;
                vy = vy + ay;
            }
            else if (-30 > ball.position.x && ball.position.x > -45) {
                if (ball.position.y <= 0.5) {
                    vy = -0.8 * vy;
                    ball.position.y = 0.5;
                }
                vy += ay;
                vx = 1 / 20;
                tmp = vy;
            }
            else if (-45.5 > ball.position.x) {
                vy = 0;
                vx = 0;
            }
            ball.position.x -= vx;
            ball.position.y += vy;
            requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };
}
async function readFile(path) {
    return new Promise((resolve => {
        const loader = new three__WEBPACK_IMPORTED_MODULE_1__.FileLoader();
        loader.load(path, (data) => {
            if (typeof data === "string") {
                resolve(data);
            }
            else {
                const decoder = new TextDecoder('utf-8');
                const decodedString = decoder.decode(data);
                resolve(decodedString);
            }
        });
    }));
}
window.addEventListener("DOMContentLoaded", init);
function init() {
    let container = new ThreeJSContainer();
    let viewport = container.createRendererDOM(640, 480, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 3));
    document.body.appendChild(viewport);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcgprendering"] = self["webpackChunkcgprendering"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three_examples_jsm_controls_OrbitControls_js"], () => (__webpack_require__("./src/app.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFaERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvLi9zcmMvYXBwLnRzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9jZ3ByZW5kZXJpbmcvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2NncHJlbmRlcmluZy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiQHR3ZWVuanMvdHdlZW4uanNcIjtcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuaW1wb3J0IHsgT3JiaXRDb250cm9scyB9IGZyb20gXCJ0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9sc1wiO1xuaW1wb3J0IHsgY29sbGFwc2VUZXh0Q2hhbmdlUmFuZ2VzQWNyb3NzTXVsdGlwbGVWZXJzaW9ucywgY29udmVydFRvT2JqZWN0IH0gZnJvbSBcInR5cGVzY3JpcHRcIjtcblxuY2xhc3MgVGhyZWVKU0NvbnRhaW5lciB7XG4gICAgcHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG4gICAgcHJpdmF0ZSBsaWdodDogVEhSRUUuTGlnaHQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIC8vIOeUu+mdoumDqOWIhuOBruS9nOaIkCjooajnpLrjgZnjgovmnqDjgZTjgajjgaspKlxuICAgIHB1YmxpYyBjcmVhdGVSZW5kZXJlckRPTSA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgY2FtZXJhUG9zOiBUSFJFRS5WZWN0b3IzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgcmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHg0OTVlZCkpO1xuICAgICAgICByZW5kZXJlci5zaGFkb3dNYXAuZW5hYmxlZCA9IHRydWU7IC8v44K344Oj44OJ44Km44Oe44OD44OX44KS5pyJ5Yq544Gr44GZ44KLXG5cbiAgICAgICAgLy/jgqvjg6Hjg6njga7oqK3lrppcbiAgICAgICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDc1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmNvcHkoY2FtZXJhUG9zKTtcblxuXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0tMjU7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi55ID0yMDtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPTIwO1xuICAgICAgICBjYW1lcmEudXAuc2V0KDAsIDEsIDApO1xuICAgICAgICBjYW1lcmEubG9va0F0KG5ldyBUSFJFRS5WZWN0b3IzKC0yNSwgMC41LCAtNSkpO1xuXG4gICAgICAgIGNvbnN0IG9yYml0Q29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgICAgICBvcmJpdENvbnRyb2xzLnRhcmdldC5zZXQoLTI1LDAuNSwtNSk7XG4gICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlU2NlbmUoKTtcbiAgICAgICAgLy8g5q+O44OV44Os44O844Og44GudXBkYXRl44KS5ZG844KT44Gn77yMcmVuZGVyXG4gICAgICAgIC8vIHJlcWVzdEFuaW1hdGlvbkZyYW1lIOOBq+OCiOOCiuasoeODleODrOODvOODoOOCkuWRvOOBtlxuICAgICAgICBjb25zdCByZW5kZXI6IEZyYW1lUmVxdWVzdENhbGxiYWNrID0gKHRpbWUpID0+IHtcbiAgICAgICAgICAgIG9yYml0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICByZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgY2FtZXJhKTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG4gICAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuc3R5bGUuY3NzRmxvYXQgPSBcImxlZnRcIjtcbiAgICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS5tYXJnaW4gPSBcIjEwcHhcIjtcbiAgICAgICAgcmV0dXJuIHJlbmRlcmVyLmRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8g44K344O844Oz44Gu5L2c5oiQKOWFqOS9k+OBpzHlm54pXG4gICAgcHJpdmF0ZSBjcmVhdGVTY2VuZSA9ICgpID0+IHtcbiAgICAgICAgdGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgICAgICBjb25zdCBheGVzQmFyTGVuZ3RoID0gMTAuMDtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQobmV3IFRIUkVFLkF4ZXNIZWxwZXIoYXhlc0Jhckxlbmd0aCkpO1xuXG4gICAgICAgIC8vYmFsbOeUn+aIkFxuICAgICAgICBjb25zdCBiYWxsR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41KTtcbiAgICAgICAgY29uc3QgYmFsbE1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hQaG9uZ01hdGVyaWFsKHtjb2xvcjoweGZmZDkwMH0pO1xuICAgICAgICBjb25zdCBiYWxsID0gbmV3ICBUSFJFRS5NZXNoKGJhbGxHZW9tZXRyeSxiYWxsTWF0ZXJpYWwpO1xuICAgICAgICBiYWxsLnBvc2l0aW9uLnogPSAtNTtcbiAgICAgICAgYmFsbC5wb3NpdGlvbi55ID0gMC41O1xuXG5cbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoYmFsbCk7XG5cbiAgICAgICAgLy9nb2FsXG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoIDAuNSwgMTAsKTtcbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHtjb2xvcjogMHhmZmZmZmYsIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGV9ICk7XG4gICAgICAgIGNvbnN0IGdvYWwgPSBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gICAgICAgIGdvYWwucm90YXRlWShNYXRoLlBJLzIpO1xuICAgICAgICBnb2FsLnJvdGF0ZVooTWF0aC5QSS8yKTtcbiAgICAgICAgZ29hbC5wb3NpdGlvbi54ID0gLTQ1O1xuICAgICAgICBnb2FsLnBvc2l0aW9uLnkgPSAwLjU7XG4gICAgICAgIGdvYWwucG9zaXRpb24ueiA9IC01O1xuXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKCBnb2FsICk7XG4gICAgICAgIC8v5bqK55Sf5oiQXG4gICAgICAgIGxldCBtYWtlRmxvb3IxID0gKCk9PntcbiAgICAgICAgICAgIGxldCBmbG9vclNoYXBlMSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuXG4gICAgICAgICAgICBmbG9vclNoYXBlMS5tb3ZlVG8oMSwwKTtcbiAgICAgICAgICAgIGZsb29yU2hhcGUxLmxpbmVUbygtNSwwKTtcbiAgICAgICAgICAgIGZsb29yU2hhcGUxLmxpbmVUbygtMTAsMik7XG4gICAgICAgICAgICBmbG9vclNoYXBlMS5saW5lVG8oLTE1LDApO1xuICAgICAgICAgICAgZmxvb3JTaGFwZTEubGluZVRvKC0yMCwwKTtcbiAgICAgICAgICAgIGZsb29yU2hhcGUxLmxpbmVUbygtMjAsLTEpO1xuICAgICAgICAgICAgZmxvb3JTaGFwZTEubGluZVRvKDEsLTEpO1xuXG4gICAgICAgICAgICByZXR1cm4gZmxvb3JTaGFwZTE7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG1ha2VGbG9vcjIgPSAoKT0+e1xuICAgICAgICAgICAgbGV0IGZsb29yU2hhcGUyID0gbmV3IFRIUkVFLlNoYXBlKCk7XG4gICAgICAgICAgICBmbG9vclNoYXBlMi5tb3ZlVG8oLTMwLDApO1xuICAgICAgICAgICAgZmxvb3JTaGFwZTIubGluZVRvKC01MCwwKTtcbiAgICAgICAgICAgIGZsb29yU2hhcGUyLmxpbmVUbygtNTAsLTEpO1xuICAgICAgICAgICAgZmxvb3JTaGFwZTIubGluZVRvKC0zMCwtMSk7XG4gICAgICAgICAgICByZXR1cm4gZmxvb3JTaGFwZTI7XG5cbiAgICAgICAgfVxuICAgICAgICBsZXQgZXh0cnVkZVNldHRpbmdzID0ge1xuICAgICAgICAgICAgc3RlcHM6IDEsXG4gICAgICAgICAgICBkZXB0aDogLTEwLFxuICAgICAgICAgICAgYmV2ZWxFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJldmVsVGhpY2tuZXNzOiA0LFxuICAgICAgICAgICAgYmV2ZWxTaXplOiAyLFxuICAgICAgICAgICAgYmV2ZWxTZWdtZW50czogM1xuICAgICAgICB9O1xuXG5cbiAgICAgICAgbGV0IGZsb29yR2VvbWV0cnkxID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShtYWtlRmxvb3IxKCksIGV4dHJ1ZGVTZXR0aW5ncylcbiAgICAgICAgbGV0IGZsb29yR2VvbWV0cnkyID0gbmV3IFRIUkVFLkV4dHJ1ZGVHZW9tZXRyeShtYWtlRmxvb3IyKCksIGV4dHJ1ZGVTZXR0aW5ncylcblxuICAgICAgICBsZXQgbWVzaE1hdGVyaWFsMSA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7Y29sb3I6MHg4NDMzMWYsc2lkZTpUSFJFRS5Eb3VibGVTaWRlLGZsYXRTaGFkaW5nOnRydWV9KTtcbiAgICAgICAgbGV0IG1lc2hNYXRlcmlhbDIgPSBuZXcgVEhSRUUuTWVzaFBob25nTWF0ZXJpYWwoe2NvbG9yOjB4ODQzMzFmLCBzaWRlOlRIUkVFLkRvdWJsZVNpZGUsZmxhdFNoYWRpbmc6dHJ1ZX0pO1xuXG4gICAgICAgIGxldCBmbG9vckdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG5cbiAgICAgICAgZmxvb3JHcm91cC5hZGQobmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeTEsIG1lc2hNYXRlcmlhbDEpKTtcbiAgICAgICAgZmxvb3JHcm91cC5hZGQobmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeTIsIG1lc2hNYXRlcmlhbDIpKTtcblxuICAgICAgICB0aGlzLnNjZW5lLmFkZChmbG9vckdyb3VwKTtcblxuICAgICAgICBsZXQgbWVzaDEgPSBuZXcgVEhSRUUuTWVzaChmbG9vckdlb21ldHJ5MSxtZXNoTWF0ZXJpYWwxKTtcbiAgICAgICAgbGV0IG1lc2gyID0gbmV3IFRIUkVFLk1lc2goZmxvb3JHZW9tZXRyeTIsbWVzaE1hdGVyaWFsMik7XG5cbiAgICAgICAgZmxvb3JHcm91cC5hZGQobWVzaDEpO1xuICAgICAgICBmbG9vckdyb3VwLmFkZChtZXNoMik7XG5cbiAgICAgICAgLy/lo4HnlJ/miJBcbiAgICAgICAgLy/poILngrnluqfmqJlcbiAgICAgICAgY29uc3QgdmVydGljZXMgPSBuZXcgRmxvYXQzMkFycmF5KFtcbiAgICAgICAgICAgIC01MCwgMTAsIC0xMCwgLy8x44Gk55uu44Gu6aCC54K55bqn5qiZMFxuICAgICAgICAgICAgLTUwLCAwLCAtMTAsLy8y44Gk55uu44Gu6aCC54K55bqn5qiZMVxuICAgICAgICAgICAgMCwgMCwgLTEwLCAvLzPjgaTnm67jga7poILngrnluqfmqJkyXG4gICAgICAgICAgICAwLCAxMCwgLTEwLCAgLy8zXG5cbiAgICAgICAgXSk7XG4gICAgICAgIC8vIOmggueCueOCpOODs+ODh+ODg+OCr+OCuVxuICAgICAgICBjb25zdCBpbmRpY2VzID0gW1xuICAgICAgICAgICAgMCwgMSwgMixcbiAgICAgICAgICAgIDAsMiwzLFxuXG4gICAgICAgIF07XG4gICAgICAgIGNvbnN0IHV2cyA9IG5ldyBGbG9hdDMyQXJyYXkoW1xuICAgICAgICAgICAgMCwgMSxcbiAgICAgICAgICAgIDAsIDAsXG4gICAgICAgICAgICAxLCAwLFxuICAgICAgICAgICAgMSwxLFxuICAgICAgICBdKTtcblxuXG5cbiAgICAgICAgY29uc3Qgd2FsbExvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHdhbGxUZXh0dXJlID0gd2FsbExvYWRlci5sb2FkKCdiYWNrZ3JvdW5kNS5wbmcnKTtcblxuICAgICAgICBjb25zdCB3YWxsR2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgICAgd2FsbEdlb21ldHJ5LnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggdmVydGljZXMsIDMgKSApO1xuICAgICAgICB3YWxsR2VvbWV0cnkuc2V0QXR0cmlidXRlKCAndXYnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCB1dnMsIDIpKTtcbiAgICAgICAgd2FsbEdlb21ldHJ5LmNvbXB1dGVWZXJ0ZXhOb3JtYWxzKCk7XG4gICAgICAgIHdhbGxHZW9tZXRyeS5zZXRJbmRleChpbmRpY2VzKTtcblxuICAgICAgICBjb25zdCB3YWxsTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoIHsgbWFwOiB3YWxsVGV4dHVyZX0gKTtcbiAgICAgICAgY29uc3Qgd2FsbE1lc2ggPSBuZXcgVEhSRUUuTWVzaCggd2FsbEdlb21ldHJ5LCB3YWxsTWF0ZXJpYWwgKTtcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQod2FsbE1lc2gpO1xuXG4gICAgICAgIC8v44Op44Kk44OI44Gu6Kit5a6aXG4gICAgICAgIHRoaXMubGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweGZmZmZmZik7XG4gICAgICAgIGNvbnN0IGx2ZWMgPSBuZXcgVEhSRUUuVmVjdG9yMygxLCAxLCAxKS5ub3JtYWxpemUoKTtcbiAgICAgICAgdGhpcy5saWdodC5wb3NpdGlvbi5zZXQobHZlYy54LCBsdmVjLnksIGx2ZWMueik7XG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubGlnaHQpO1xuXG4gICAgICAgIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG4gICAgICAgIGxldCB0ID0gMDtcblxuICAgICAgICAvLyDmr47jg5Xjg6zjg7zjg6Djga51cGRhdGXjgpLlkbzjgpPjgafvvIzmm7TmlrBcbiAgICAgICAgLy8gcmVxZXN0QW5pbWF0aW9uRnJhbWUg44Gr44KI44KK5qyh44OV44Os44O844Og44KS5ZG844G2XG4gICAgICAgIGxldCBheSA9IDA7XG4gICAgICAgIGxldCB2eSA9IDA7XG4gICAgICAgIGxldCB2eD0wO1xuICAgICAgICBsZXQgdG1wO1xuICAgICAgICBsZXQgdXBkYXRlOiBGcmFtZVJlcXVlc3RDYWxsYmFjayA9ICh0aW1lKSA9PiB7XG5cblxuICAgICAgICAgICAgaWYoMD49YmFsbC5wb3NpdGlvbi54ICYmIGJhbGwucG9zaXRpb24ueD4tNSl7XG4gICAgICAgICAgICAgICAgdng9MS8yMDtcbiAgICAgICAgICAgIH1lbHNlIGlmKC01Pj1iYWxsLnBvc2l0aW9uLnggJiYgYmFsbC5wb3NpdGlvbi54Pi0xMCl7XG4gICAgICAgICAgICAgICAgdnggPTEvMzA7XG4gICAgICAgICAgICAgICAgYmFsbC5wb3NpdGlvbi55ICs9dnggKjIvNTtcbiAgICAgICAgICAgIH1lbHNlIGlmKC0xMD49YmFsbC5wb3NpdGlvbi54ICYmIGJhbGwucG9zaXRpb24ueD4tMTUpe1xuICAgICAgICAgICAgICAgIGlmKHZ5PT0wKXtcbiAgICAgICAgICAgICAgICAgICAgYXkgPSAtMS8zMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2eSA9IC0xLzMwK2F5O1xuICAgICAgICAgICAgICAgIHZ4ID12eSAqLTEqMi41O1xuICAgICAgICAgICAgfWVsc2UgaWYoLTE1Pj1iYWxsLnBvc2l0aW9uLnggJiYgYmFsbC5wb3NpdGlvbi54Pi0yMCl7XG4gICAgICAgICAgICAgICAgdnk9MDtcblxuICAgICAgICAgICAgfWVsc2UgaWYoLTIwPj1iYWxsLnBvc2l0aW9uLnggJiYgYmFsbC5wb3NpdGlvbi54ID4tMzAgKXtcbiAgICAgICAgICAgICAgICBpZih2eT09MCl7XG4gICAgICAgICAgICAgICAgICAgIHZ5ID0gMS4yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBheSA9IC0xLzMwO1xuICAgICAgICAgICAgICAgIHZ5ID12eSArYXk7XG4gICAgICAgICAgICB9ZWxzZSBpZigtMzA+YmFsbC5wb3NpdGlvbi54ICYmIGJhbGwucG9zaXRpb24ueCA+IC00NSl7XG4gICAgICAgICAgICAgICAgaWYoYmFsbC5wb3NpdGlvbi55PD0wLjUpe1xuICAgICAgICAgICAgICAgICAgICB2eSA9IC0wLjgqdnk7XG4gICAgICAgICAgICAgICAgICAgIGJhbGwucG9zaXRpb24ueT0wLjU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZ5Kz1heTtcbiAgICAgICAgICAgICAgICB2eCA9IDEvMjA7XG4gICAgICAgICAgICAgICAgdG1wID0gdnk7XG4gICAgICAgICAgICB9ZWxzZSBpZigtNDUuNT5iYWxsLnBvc2l0aW9uLngpe1xuICAgICAgICAgICAgICAgIHZ5PTA7XG4gICAgICAgICAgICAgICAgdnggPTA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiYWxsLnBvc2l0aW9uLngtPXZ4O1xuICAgICAgICAgICAgYmFsbC5wb3NpdGlvbi55ICs9dnk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblxuICAgICAgICB9XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuICAgIH1cblxufVxuXG5hc3luYyBmdW5jdGlvbiByZWFkRmlsZShwYXRoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUgPT4ge1xuICAgICAgICBjb25zdCBsb2FkZXIgPSBuZXcgVEhSRUUuRmlsZUxvYWRlcigpO1xuICAgICAgICBsb2FkZXIubG9hZChwYXRoLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigndXRmLTgnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZFN0cmluZyA9IGRlY29kZXIuZGVjb2RlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRlY29kZWRTdHJpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgfSkpO1xufVxuXG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBsZXQgY29udGFpbmVyID0gbmV3IFRocmVlSlNDb250YWluZXIoKTtcblxuICAgIGxldCB2aWV3cG9ydCA9IGNvbnRhaW5lci5jcmVhdGVSZW5kZXJlckRPTSg2NDAsIDQ4MCwgbmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMykpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodmlld3BvcnQpO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtjZ3ByZW5kZXJpbmdcIl0gPSBzZWxmW1wid2VicGFja0NodW5rY2dwcmVuZGVyaW5nXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJ2ZW5kb3JzLW5vZGVfbW9kdWxlc190aHJlZV9leGFtcGxlc19qc21fY29udHJvbHNfT3JiaXRDb250cm9sc19qc1wiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==