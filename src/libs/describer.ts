class Describer {

	static describeClass(typeOfClass: any, allowPrivate: boolean) {

		let a = new typeOfClass();
		let array = Object.getOwnPropertyNames(a);

		if (!allowPrivate) {

			array = array.filter(p => !p.includes("_"))

		}

		return array.map(p => p.replace(/_/g, ""));

	}

}

export { Describer }