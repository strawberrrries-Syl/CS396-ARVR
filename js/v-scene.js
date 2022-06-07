let worldCamera = undefined
let musicStatus = true

AFRAME.registerComponent('rotation-reader', {
	// Track the camera's position 
	// and copy it into the user's head

	/**
	 * We use IIFE (immediately-invoked function expression) to only allocate one
	 * vector or euler and not re-create on every tick to save memory.
	 */
	init: function () {
		console.log('Begin tracking the camera');
		worldCamera = this.el
		console.log("CAMERA:", worldCamera)
		let r = Math.random() * 1 + 1
		let theta = 100 * Math.random() * 1 + 1
		worldCamera.object3D.position.set(r * Math.cos(theta), 1.5, r * Math.sin(theta))
		worldCamera.object3D.lookAt(0, .5, 0)
		console.log("****Start pos", worldCamera.object3D.position.toArray())
	},
	tick: (function () {

		return function () {
			if (room.userHead) {
				room.userHead.position.copy(this.el.object3D.position)
				room.userHead.rotation.copy(this.el.object3D.rotation)
				room.userHead.post()
			}

		};
	})()
});

Vue.component("room-scene", {
	template: `<a-scene>

		
		<!--------- ASSETS ---------->
		<a-assets>
			<img id="sky" src="img/textures/sky-night.png">
      		<a-asset-item id="valentines_day_confession_scene" src="model/scenes/valentines_day_confession_scene/scene.gltf" />
      		<a-asset-item id="psyduck_kfc_toy" src="model/scenes/psyduck_kfc_toy/scene.gltf" />
     		<a-asset-item id="cat_dispenser" src="model/scenes/cat_dispenser/scene.gltf" />
     		<a-asset-item id="takodachi_rigged_hololive" src="model/scenes/takodachi_rigged_hololive/scene.gltf" />
   		</a-assets>

		<!--------- CAMERA --------->

		<a-camera id="camera" rotation-reader>
			<a-cursor></a-cursor>

			<!-------- Output text ----->
			<a-entity>
				<a-text 
					v-if="room.userHead"
					width=".8"
					color="black"
					:value="room.userHead.position.toFixed(2)" 
					position="-.7 .7 -1">
				</a-text>
				
				<a-text 
					width="2"
					color="black"
				<a-text 
					width="1"
					color="black"
					:value="room.detailText" 
					position="-.7 .5 -1">
				</a-text>
			</a-entity>
			
		</a-camera>
		
		<obj-world :room="room"/>


		
				
		<a-entity position="0 0 0">
		<a-entity text="value:hello;font:/fonts/helvetica-sdf.fnt; fontImage:/fonts/hdolor:black" position="0 1 0"></a-entity>
			
		<!--------- ALL THE OBJECTS YOU'VE MADE --------->
		<live-object  v-for="obj in room.objects" :key="obj.uid" :obj="obj" />d
      
      	<a-gltf-model src="#valentines_day_confession_scene" scale="1.5 1.5 1.5" rotation="0 0 0" position="0 -4 0" ></a-gltf-model>
		<a-gltf-model id="music" src="#psyduck_kfc_toy" scale="0.1 0.1 0.1" rotation="0 0 0" position="5 0.2 5" @click="click" sound="src: url(music/BGM.wav); autoplay: true; loop: true"></a-gltf-model>
      	<a-gltf-model src="#cat_dispenser" scale="1 1 1" rotation="0 0 0" position="5 2.5 12"></a-gltf-model>

		
      	<a-gltf-model src="#takodachi_rigged_hololive" scale=".1 .1 .1" rotation="0 180 0" position="3 2 15" animation-mixer></a-gltf-model>
    </a-entity>
    
    

	</a-scene>`,

	methods: {
		camtick() {
			console.log("cam")
		},
		click() {
			musicStatus = ! musicStatus
			let music = document.querySelector('#music')
			musicStatus ? music.components.sound.pauseSound() : music.components.sound.playSound()
		}
	},
	mounted() {
		// Create 
	},

	data() {
		return {

		}
	},

	props: ["room"],
})