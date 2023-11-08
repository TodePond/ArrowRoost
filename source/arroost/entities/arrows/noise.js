import { Dom } from "../../components/dom.js"
import { Entity } from "../entity.js"
import { Carry } from "../../components/carry.js"
import { Input } from "../../components/input.js"
import { setCellStyles } from "./shared.js"
import { ArrowOfRecording } from "./recording.js"
import { RectangleHtml } from "../shapes/rectangle-html.js"
import { GREY_SILVER } from "../../../main.js"
import { GREY } from "../../../../libraries/habitat-import.js"
import { FULL, HALF } from "../../unit.js"

export class ArrowOfNoise extends Entity {
	duration = this.use(0)

	/**
	 * @param {ArrowOfRecording} recording
	 */
	constructor(recording) {
		super()

		this.recording = recording

		// Attach components
		this.input = this.attach(new Input(this))
		this.dom = this.attach(
			new Dom({
				id: "noise",
				type: "html",
				input: this.input,
				// TODO: add cull bounds
			}),
		)

		// TODO: constrain to x axis
		this.carry = this.attach(new Carry({ input: this.input, dom: this.dom }))

		// Render elements
		this.stem = this.attach(new RectangleHtml({ input: this.input }))
		this.dom.append(this.stem.dom)

		// Style elements
		setCellStyles({
			back: this.stem.dom,
			front: null,
			input: this.input,
			tunnel: null,
		})

		this.stem.height.set(HALF)

		this.use(() => {
			this.stem.width.set(this.duration.get() * FULL)
		}, [this.duration])
	}
}