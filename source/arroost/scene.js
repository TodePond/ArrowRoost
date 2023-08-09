import { shared } from "../main.js"
import { Transform } from "./components/transform.js"
import { Entity } from "./entities/entity.js"
import { Ellipse } from "./entities/shapes/ellipse.js"
import { Dom } from "./components/dom.js"
import { Dummy } from "../old/arrows/dummy.js"

// const ZOOM_FRICTION = 0.75

export class Scene extends Entity {
	constructor() {
		super()
		this.transform = this.attach(new Transform())
		this.dom = this.attach(new Dom({ transform: this.transform, type: "div" }))
	}

	start({ html }) {
		const container = this.dom.getContainer()
		html.append(container)

		// const ellipse = new Dummy()
		// this.dom.append(ellipse.dom)
		// ellipse.transform.position.set([100, 100])

		addEventListener("pointerdown", (e) => {
			if (e.target !== html) return
			const ellipse = new Dummy()
			this.dom.append(ellipse.dom)
			const position = shared.pointer.transform.absolutePosition.get()
			ellipse.transform.position.set(position)
		})
	}

	tick() {
		shared.pointer.tick()
	}

	// zoomSpeed = this.use(0.0)

	// tick() {
	// 	const { pointer } = shared

	// 	if (pointer.position.x === undefined || pointer.position.y === undefined) {
	// 		return
	// 	}

	// 	pointer.tick()

	// 	const { movement } = this
	// 	const { velocity } = movement

	// 	movement.update()
	// 	if (!equals(movement.velocity, [0, 0])) {
	// 		fireEvent(
	// 			"pointermove",
	// 			{
	// 				clientX: pointer.position.x,
	// 				clientY: pointer.position.y,
	// 				target: shared.machine.state.input.entity.svg.element,
	// 			},
	// 			PointerEvent,
	// 		)
	// 	}
	// 	movement.applyFriction()

	// 	this.zoom(this.zoomSpeed)
	// 	this.zoomSpeed *= ZOOM_FRICTION
	// 	// if (Math.abs(this.zoomSpeed).d < 0.5) {
	// 	// 	this.zoomSpeed = 0
	// 	// }
	// }

	// zoom(delta) {
	// 	const { pointer } = shared
	// 	const { transform } = this
	// 	const oldZoom = transform.scale.x
	// 	const newZoom = oldZoom * (1 - delta)
	// 	transform.scale = [newZoom, newZoom]

	// 	const pointerOffset = subtract(pointer.position, transform.position)
	// 	const scaleRatio = newZoom / oldZoom
	// 	const scaledPointerOffset = scale(pointerOffset, scaleRatio)
	// 	transform.position = subtract(pointer.position, scaledPointerOffset)
	// }

	// onHoveringEnter() {
	// 	setCursor("default")
	// }

	// onHoveringPointerDown() {
	// 	return Dragging
	// }

	// onDraggingEnter(previous, state) {
	// 	this.movement.velocity = [0, 0]
	// 	setCursor("move")
	// }

	// onDraggingPointerUp() {
	// 	this.movement.velocity = [...shared.pointer.velocity]
	// }

	// onDraggingPointerMove(event, state) {
	// 	const pointerDisplacement = subtract(shared.pointer.absolutePosition, state.pointerStart)
	// 	this.transform.position = add(state.inputStart, pointerDisplacement)
	// }
}
