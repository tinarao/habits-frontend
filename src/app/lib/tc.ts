type Ok<T> = {
	data: T;
	error: null;
};

type Fail<E> = {
	data: null;
	error: E;
};

type Result<T, E = Error> = Ok<T> | Fail<E>;

export async function tc<T, E = Error>(
	promise: Promise<T>,
): Promise<Result<T, E>> {
	try {
		const value = await promise;
		return { data: value, error: null };
	} catch (e) {
		return { data: null, error: e as E };
	}
}
