class TypeChecker {

	public static getTypeString(input: any): any {

		if (!isNaN(input)) {

			return "number";

		} else if (typeof input === "boolean") {

			return "boolean";

		} else {

			return "string";

		}

	}

	public static getType(input: any): any {

		if (!isNaN(input)) {

			return Number;

		} else if (typeof input === "boolean") {

			return Boolean;

		} else {

			return String;

		}

	}

	public static validateDataTypes(requiredParams: Record<string, any>, input: Record<string, any>): string[] {

		let final: string[] = [];

		for (let param in requiredParams) {

			if (TypeChecker.getType(input[param]) != requiredParams[param]) {

				final.push(param);

			}

		}

		return final;

	}

} export { TypeChecker }