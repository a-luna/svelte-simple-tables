export function getHomeTeamIdFromBrooksGameId(game_id: string): string {
	const BB_GAME_ID_REGEX =
		/gid_(?<year>\d{4,4})_(?<month>\d{2,2})_(?<day>\d{2,2})_(?<away_team>[a-z]+)mlb_(?<home_team>[a-z]+)mlb_(?<game_num>\d)/;
	const match = BB_GAME_ID_REGEX.exec(game_id);
	return match?.groups?.home_team ?? '';
}

export function resizeWindow(x: number, y: number): void {
	Object.defineProperty(window, 'innerWidth', {
		writable: true,
		configurable: true,
		value: x,
	});
	Object.defineProperty(window, 'innerHeight', {
		writable: true,
		configurable: true,
		value: y,
	});
	window.dispatchEvent(new Event('resize'));
}
