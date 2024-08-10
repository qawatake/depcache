// // some modifications were made to https://github.com/actions/setup-go/tree/v5.0.2/src
import * as core from "@actions/core";
import * as cache from "@actions/cache";
import { State } from "./constants";

export const cachePackages = async (cachePaths: string[]): Promise<void> => {
	const state = core.getState(State.CacheMatchedKey);
	const primaryKey = core.getState(State.CachePrimaryKey);

	if (!primaryKey) {
		core.info(
			"Primary key was not generated. Please check the log messages above for more errors or information",
		);
		return;
	}

	const cacheHit = primaryKey === state;
	if (cacheHit) {
		core.info(
			`Cache hit occurred on the primary key ${primaryKey}, not saving cache.`,
		);
		return;
	}

	const cacheId = await cache.saveCache(cachePaths, primaryKey);
	if (cacheId === -1) {
		return;
	}
	core.info(`Cache saved with the key: ${primaryKey}`);
};
