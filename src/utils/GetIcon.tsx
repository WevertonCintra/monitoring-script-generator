import { MdNetworkWifi } from 'react-icons/md'
import { GrMemory } from 'react-icons/gr'
import { FiHardDrive, FiCpu } from 'react-icons/fi'

export function GetIcon(resourceTitle: string) {
	switch (resourceTitle) {
		case 'CPU':
			return <FiCpu size={20} color='black' />
		case 'HARD DRIVE':
			return <FiHardDrive size={20} color='black' />
		case 'MEMORY':
			return <GrMemory size={20} color='black' />
		case 'NETWORK':
			return <MdNetworkWifi size={20} color='black' />
	}
}
