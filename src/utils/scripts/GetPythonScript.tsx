import { Resources } from '../options/Resources'

type Props = {
	resources: typeof Resources
	time: number
}

export function GetPythonScript({ resources, time }: Props) {
	let cpu: string = ''
	let memory: string = ''
	let hardDrive: string = ''
	let network: string = ''

	resources.forEach((resource) => {
		if (resource.label === 'CPU') {
			cpu = `
			def teste_cpu():
				cpu_percent = psutil.cpu_percent(interval=1) #utilizacao da CPU em porcentagem
				cpu_count = psutil.cpu_count(logical=True) #número de CPUs lógicas no sistema 
				cpu_times = psutil.cpu_times(percpu=False)
				cpu_times_user = cpu_times.user #tempo gasto por processos normais executando no modo de usuário
				cpu_times_system = cpu_times.system #tempo gasto pelos processos em execução no modo kernel
				cpu_times_idle = cpu_times.idle # tempo gasto ocioso        
				data_atual = datetime.now().strftime('%d/%m/%Y')
				hora_atual = datetime.now().strftime('%H:%M')
		
				return cpu_percent, cpu_count, cpu_times_user, cpu_times_system, cpu_times_idle, data_atual, hora_atual
			`
		} 

		if (resource.label === 'MEMORY') {
			memory = `
			def teste_memoria():
				mem = psutil.virtual_memory()
				mem_total = mem.total / (1024*1024*1024) #memoria total em GB
				mem_available = mem.available / (1024*1024*1024) #memoria disponivel em GB
				mem_used = mem.used / (1024*1024*1024) #memoria usada em GB
				mem_percent = mem.percent #percentual de memoria usada
				data_atual = datetime.now().strftime('%d/%m/%Y')
				hora_atual = datetime.now().strftime('%H:%M')

				return mem_total, mem_available, mem_used, mem_percent, data_atual, hora_atual    
			`
		}

		if (resource.label === 'HARD DRIVE') {
			hardDrive = `
			def teste_disco():
				disk_io_infos = psutil.disk_io_counters()
				disk_read_speed = 
					(disk_io_infos.read_bytes / (1024*1024)) / (disk_io_infos.read_time / 1000)
				disk_write_speed = 
					(disk_io_infos.write_bytes / (1024*1024)) / (disk_io_infos.write_time / 1000)
				disk = psutil.disk_usage('/')
				disk_used = disk.used / (1024*1024*1024)
				disk_total = disk.total / (1024*1024*1024)
				disk_percent = disk.percent
				data_atual = datetime.now().strftime('%d/%m/%Y')
				hora_atual = datetime.now().strftime('%H:%M')
		
				return disk_read_speed, disk_write_speed, disk_used, disk_total, disk_percent, data_atual, hora_atual
			`
		} 

		if (resource.label === 'NETWORK') {
			network = `
			def teste_internet():
				s = sp.Speedtest()
				s.get_servers()
				s.get_best_server()
				velocidade_download = round(s.download(threads=None)*(10**-6))
				velocidade_upload = round(s.upload(threads=None)*(10**-6))
				net_io_counters = psutil.net_io_counters()
				bytes_sent = net_io_counters.bytes_sent
				bytes_recv = net_io_counters.bytes_recv
				err_sent = net_io_counters.errout
				err_recv = net_io_counters.errin 
				data_atual = datetime.now().strftime('%d/%m/%Y')
				hora_atual = datetime.now().strftime('%H:%M')

    		return data_atual, hora_atual, velocidade_download, velocidade_upload, bytes_sent, bytes_recv, err_sent, err_recv
			`
		}
	})

	return `
	import psutil
	import datetime
	from time import sleep
	from datetime import datetime

	quantidade_testes = 10
	intervalo_minutos = 1 
	segundos = 60

	for q in range(${time}):
		${cpu}
		${memory}
		${hardDrive}
		${network}
	`
}
