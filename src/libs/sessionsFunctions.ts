import { encode, decode, TAlgorithm } from "jwt-simple";
import { UserModel } from '../models/user.model';

class Session {

	id: number;
	user: UserModel;
	dateCreated: number;
	issued: number;
	expires: number;

}

class EncodeResult {

	token: string;
	expires: number;
	issued: number;

}

type PartialSession = Omit<Session, "issued" | "expires">;

type DecodeResult =
	| {
		type: "valid";
		session: Session;
	}
	| {
		type: "integrity-error";
	}
	| {
		type: "invalid-token";
	};

type ExpirationStatus = "expired" | "active" | "grace";

function encodeSession(partialSession: PartialSession): EncodeResult {

	const algorithm: TAlgorithm = "HS512";

	const issued = Date.now();
	const expires = issued + Number(process.env.SESSION_LIFETIME_MS);

	const session: Session = {
		...partialSession,
		issued: issued,
		expires: expires
	};

	return {
		token: encode(session, process.env.SESSION_SECRET, algorithm),
		issued: issued,
		expires: expires
	};
}

function checkExpirationStatus(token: Session): ExpirationStatus {

	const now = Date.now();

	if (token.expires > now) return "active";

	const threeHoursAfterExpiration = token.expires + Number(process.env.SESSION_GRACE_MS);

	if (threeHoursAfterExpiration > now) return "grace";

	return "expired";

}

function decodeSession(tokenString: string): DecodeResult {

	const algorithm: TAlgorithm = "HS512";

	let result: Session;

	try {

		tokenString = tokenString.replace(/^Bearer\s/, "");
		result = decode(tokenString, process.env.SESSION_SECRET, false, algorithm);

	} catch (_e) {

		const e: Error = _e;

		if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
			return {
				type: "invalid-token"
			};
		}

		if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
			return {
				type: "integrity-error"
			};
		}

		if (e.message.indexOf("Unexpected token") === 0) {
			return {
				type: "invalid-token"
			};
		}

		throw e;

	}

	return {
		type: "valid",
		session: result
	}

}

export { encodeSession, decodeSession, checkExpirationStatus, Session, EncodeResult, DecodeResult, ExpirationStatus };