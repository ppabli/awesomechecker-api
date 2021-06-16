function diff(array1: any[], array2: any[]): any[] {

	let a: boolean[] = [];

	let final: any[] = [];

	for (let i = 0; i < array1.length; i++) {

		a[array1[i]] = true;

	}

	for (let i = 0; i < array2.length; i++) {

		if (a[array2[i]]) {

			delete a[array2[i]];

		} else {

			a[array2[i]] = true;

		}

	}

	for (let k in a) {

		final.push(k);

	}

	return final;

}

export { diff }