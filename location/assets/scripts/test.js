const color = new THREE.Color('white'),
intensity = 3760,
distance = 0,
angle = 0.46,
penumbra = 0.6,
decay = 2;
focus = 1;
const wallSpotLight = new THREE.SpotLight(color, intensity, distance, angle, penumbra, decay);
wallSpotLight.position.set(-45, 36, 8);
wallSpotLight.rotation.set(0,5,2);
scene.add(wallSpotLight);
const spotTarget = new THREE.Object3D();
spotTarget.position.set(-50,18, 8);
scene.add(spotTarget);
wallSpotLight.target = spotTarget;
const wallSpotLightHelper = new THREE.SpotLightHelper(wallSpotLight);
scene.add(wallSpotLightHelper);
scene.add( new THREE.AmbientLight(0xffffff, 0.02));


// Dat GUI for controlling the wallwallSpotLight
const gui = new dat.GUI();
const wallSpotLightFolder = gui.addFolder('wallSpotLight');
wallSpotLightFolder.add(wallSpotLight.position, 'x', -5000, 5000).name('X Position');
wallSpotLightFolder.add(wallSpotLight.position, 'y', 0, 5000).name('Y Position');
wallSpotLightFolder.add(wallSpotLight.position, 'z', -5000, 5000).name('Z Position');
wallSpotLightFolder.add(wallSpotLight, 'intensity', 0, 10000).name('Intensity');
wallSpotLightFolder.add(wallSpotLight, 'distance', 0, 200).name('Distance');
wallSpotLightFolder.add(wallSpotLight, 'angle', 0, Math.PI / 3).name('Angle');
wallSpotLightFolder.add(wallSpotLight, 'penumbra', 0, 1).name('Penumbra');
wallSpotLightFolder.add(wallSpotLight, 'decay', 1, 2).name('Decay');
wallSpotLightFolder.open();
