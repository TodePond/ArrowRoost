import { SVG, glue } from "../../../libraries/habitat-import.js"
import { Thing } from "../thing.js"

export const Polyline = class extends Thing {
	targets = this.use([], { store: false })

	constructor(points = []) {
		super()
		glue(this)
		for (const point of points) {
			const target = new Thing()
			this.add(target)
			target.transform.position = point
			this.targets.push(target)
		}
		this.targets = this.targets
	}

	addPoint(point) {
		const target = new Thing()
		this.add(target)
		target.transform.position = point
		this.targets.push(target)
		this.targets = this.targets
	}

	render() {
		const { parent } = this
		if (parent === undefined) return

		const polyline = SVG(`<polyline />`)

		this.use(() => {
			polyline.setAttribute(
				"points",
				this.targets.map((target) => target.transform.position).join(" "),
			)
		})

		return polyline
	}
}
