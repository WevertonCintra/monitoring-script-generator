import { Resources } from '../options/Resources'

type Props = {
	resources: typeof Resources
	time: number
}

export function GetBashScript({ resources, time }: Props) {
	let cpu: string = ''
	let memory: string = ''
	let hardDrive: string = ''
	let network: string = ''

	resources.forEach((resource) => {
		if (resource.label === 'CPU') {
			cpu = `
			`
		} 

		if (resource.label === 'MEMORY') {
			memory = `
			
			`
		}

		if (resource.label === 'HARD DRIVE') {
			hardDrive = `

			`
		} 

		if (resource.label === 'NETWORK') {
			network = `
			`
		}
	})

	return `
		num=0
		while [ $num -lt 5 ]
		do
			ramTotal ; echo "Total:" $? "GB"
			ramEmUso ; echo "Em Uso:" $? "MB"
			ramFree ; echo "Livre:" $? "MB"
			ramBuffCache ; echo "Buff/Cache:" $? "MB"
			echo ""

			sleep 5
			num=$(($num+1))
		done
				${cpu}
				${memory}
				${hardDrive}
				${network}
	
	`
}
