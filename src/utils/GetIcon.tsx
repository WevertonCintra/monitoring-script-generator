import { FiCpu, FiHardDrive } from 'react-icons/fi'
import { GrMemory } from 'react-icons/gr'
import { MdNetworkWifi } from 'react-icons/md'
import { SiGnubash, SiPython } from 'react-icons/si'
import { FaNodeJs } from 'react-icons/fa'

export function GetIcon(icon: string) {
	switch (icon) {
		case 'CPU':
			return <FiCpu size={20} color='black' />
		case 'HARD DRIVE':
			return <FiHardDrive size={20} color='black' />
		case 'MEMORY':
			return <GrMemory size={20} color='black' />
		case 'NETWORK':
			return <MdNetworkWifi size={20} color='black' />
		case 'BASH':
			return <SiGnubash size={20} color='black' />
		case 'PYTHON':
			return <SiPython size={20} color='black' />
		case 'NODE':
			return <FaNodeJs size={20} color='black' />
	}
}
