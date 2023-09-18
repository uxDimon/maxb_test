const getApi = async <T>(api: string) => {
	try {
		const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + api, {
			method: "GET",
		});

		return response.json() as Promise<T>;
	} catch (error) {
		console.error("GET error", error);
	}
};

export { getApi };
