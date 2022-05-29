import * as si from "systeminformation";

class Info {

	private apiData;
	private cpuData;
	private gpuData;
	private memData;
	private dockerData;

	constructor() {


	}

	async getAllInfo(): Promise<Record<string, any>> {

		this.getApiInfo();
		await this.getSystemInfo();

		return this.processData();

	}

	async getSystemInfo() {

		await this.getCpuInfo();
		await this.getMemInfo();
		await this.getGpuInfo();
		await this.getDockerInfo();

	}

	private getApiInfo() {

		this.apiData = {

			"version": process.env.npm_package_version,
			"author": process.env.npm_package_author_name

		}

	}

	private async getDockerInfo() {

		let dockerData = await si.dockerInfo();
		this.dockerData = dockerData;

	}

	private async getCpuInfo() {

		let cpuData = await si.cpu();
		this.cpuData = cpuData;

	}

	private async getGpuInfo() {

		let gpuData = await si.graphics();
		this.gpuData = gpuData;

	}

	private async getMemInfo() {

		let memData = await si.mem();
		this.memData = memData;

	}

	private processData(): Record<string, any> {

		let data = {
			"apiData": this.apiData,
			"systemData": {
				"cpuData": this.cpuData,
				"memData": this.memData,
				"gpuData": this.gpuData,
				"dockerData": this.dockerData
			}
		}

		return data;

	}

}

export { Info };
