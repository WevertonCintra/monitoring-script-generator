import { Resources } from '../options/Resources'

type Props = {
	resources: typeof Resources
	time: number
}

export function GetNodeScript({ resources, time }: Props) {
	let cpu: string = ''
	let memory: string = ''
	let hardDrive: string = ''
	let network: string = ''

	resources.forEach((resource) => {
		if (resource.label === 'CPU') {
			cpu = `
				// CPU
				os.cpus()
			`.trimStart()
		} 

		if (resource.label === 'MEMORY') {
			memory = `
				// MEMÓRIA RAM
				os.totalmem - os.freemem
				os.freemem()
				os.totalmem()
			`.trimStart()
		}

		if (resource.label === 'HARD DRIVE') {
			hardDrive = `
				// HARD DRIVE
				const disk = require('check-disk-space').default
				disk('/').then(space => space.size)
				disk('/').then(space => space.free)
				disk('/').then(space => space.size-space.free)
			`.trimStart()
		} 

		if (resource.label === 'NETWORK') {
			network = `
			// NETWORK
			os.networkInterface()
			`.trimStart()
		}
	})

	return `
		const os = require('node:os')

		for (let i = 0; i <= ${time}; i++) {
			${cpu}
			${memory}
			${hardDrive}
			${network}
		}
	`
}
