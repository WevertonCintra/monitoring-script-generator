import { Resources } from '../options/Resources'
import { Techs } from '../options/Techs'
import { Intervals } from '../options/Intervals'

type Props = {
	intervalId?: number
	resourceId: number
	techId?: number
}

export function GetNodeScript({ intervalId, resourceId, techId }: Props) {
	const resources = Resources.filter((resource) => resource.value === resourceId)
	const interval = Intervals.find((interval) => interval.value === intervalId)
	const tech = Techs.find((tech) => tech.value === techId)

	console.log(resourceId)
	console.log(resources)

	resources.map((resource) => {
		if (resource?.label === 'CPU') {
			const cpuTotalKernel = `cpus().length`

			console.log('cpuTotalKernel', cpuTotalKernel)

			return cpuTotalKernel
		} 
		// else if (resource?.title === 'MEMORY') {

		// } else if (resource?.title === 'HARD DRIVE') {

		// } else if (resource?.title === 'NETWORK') {

		// }
	})
}
