import type { ColumnSettings } from '$lib/types';
import { capitalize, formatNumber } from '$lib/util';
import { BROOKS_BBREF_TEAM_ID_MAP, PITCH_TYPE_ABBREV_TO_NAME_MAP } from '$lib/__tests__/data/constants';
import type { PitchFx } from '$lib/__tests__/types';

export function getHomeTeamIdFromBrooksGameId(game_id: string): string {
	const BB_GAME_ID_REGEX =
		/gid_(?<year>\d{4,4})_(?<month>\d{2,2})_(?<day>\d{2,2})_(?<away_team>[a-z]+)mlb_(?<home_team>[a-z]+)mlb_(?<game_num>\d)/;
	const match = BB_GAME_ID_REGEX.exec(game_id);
	return match?.groups?.home_team ?? '';
}

const batterNameLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/player/${pfx.batter_id_mlb}/batting">${pfx.batter_name} (${getBatterTeamId(pfx)})</a>`;

const pitcherTeamLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/game?id=${pfx.bbref_game_id}&show=box">${getPitcherTeamId(pfx)}</a>`;

const pitcherNameLink = (pfx: PitchFx): string =>
	`<a sveltekit:prefetch href="/player/${pfx.pitcher_id_mlb}/pitching">${pfx.pitcher_name}</a>`;

const formatLaunchSpeed = (pfx: PitchFx): string => formatNumber(pfx.launch_speed, 1);
const formatLaunchAngle = (pfx: PitchFx): string => `${formatNumber(pfx.launch_angle, 0)}&deg;`;
const formatLaunchDistance = (pfx: PitchFx): string => formatNumber(pfx.total_distance, 0);
const formatPitchType = (pfx: PitchFx): string => capitalize(PITCH_TYPE_ABBREV_TO_NAME_MAP[pfx.mlbam_pitch_name]);
const formatPitchSpeed = (pfx: PitchFx): string => formatNumber(pfx.start_speed, 1);
const formatInOutZone = (pfx: PitchFx): string => (pfx.inside_strike_zone === 1 ? 'Inside' : 'Outside');

const formatTimeStamp = (pfx: PitchFx): string => pfx.time_pitch_thrown_est.toLocaleTimeString();

function getBatterTeamId(pfx: PitchFx): string {
	const brooksTeamId = pfx.opponent_team_id_bb.toUpperCase();
	return BROOKS_BBREF_TEAM_ID_MAP[brooksTeamId] ?? brooksTeamId;
}

function getPitcherTeamId(pfx: PitchFx): string {
	const brooksTeamId = pfx.pitcher_team_id_bb.toUpperCase();
	const pitcherTeamId = BROOKS_BBREF_TEAM_ID_MAP?.[brooksTeamId] ?? brooksTeamId;
	return isHomeTeam(pfx) ? `vs${pitcherTeamId}` : `@${pitcherTeamId}`;
}

function isHomeTeam(pfx: PitchFx): boolean {
	const homeTeamId = getHomeTeamIdFromBrooksGameId(pfx.bb_game_id).toUpperCase();
	return pfx.opponent_team_id_bb === homeTeamId;
}

export const pfxBarrelColumnSettings: ColumnSettings<PitchFx>[] = [
	{
		propName: 'batter_name',
		propType: 'string',
		classList: ['text-left'],
		colValue: batterNameLink,
	},
	{
		propName: 'opponent_team_id_bb',
		propType: 'string',
		headerText: 'Opp',
		tooltip: 'Opponent',
		classList: ['text-center'],
		colValue: pitcherTeamLink,
		sortable: false,
	},
	{
		propName: 'launch_speed',
		propType: 'number',
		headerText: 'Speed',
		tooltip: 'Launch Speed (mph)',
		colValue: formatLaunchSpeed,
	},
	{
		propName: 'launch_angle',
		propType: 'number',
		headerText: 'Angle',
		tooltip: 'Launch Angle',
		colValue: formatLaunchAngle,
	},
	{
		propName: 'total_distance',
		propType: 'number',
		headerText: 'Distance',
		colValue: formatLaunchDistance,
	},
	{
		propName: 'ab_outcome',
		propType: 'string',
		headerText: 'Outcome',
		tooltip: 'Play Description',
	},
	{
		propName: 'pitcher_name',
		propType: 'string',
		headerText: 'Pitcher',
		colValue: pitcherNameLink,
	},
	{
		propName: 'mlbam_pitch_name',
		propType: 'string',
		headerText: 'Pitch Type',
		tooltip: 'Pitch Type',
		colValue: formatPitchType,
	},
	{
		propName: 'start_speed',
		propType: 'number',
		headerText: 'Speed',
		tooltip: 'Pitch Speed',
		colValue: formatPitchSpeed,
	},
	{
		propName: 'time_pitch_thrown_est',
		propType: 'date',
		headerText: 'Occurred',
		tooltip: 'Local time (EST) when batted-ball event occurred',
		colValue: formatTimeStamp,
	},
	{
		propName: 'inning',
		propType: 'number',
		headerText: 'Inn',
	},
	{
		propName: 'count',
		propType: 'string',
	},
	{
		propName: 'inside_strike_zone',
		propType: 'number',
		headerText: 'In/Out',
		tooltip: 'Inside/Outside Strike Zone',
		colValue: formatInOutZone,
	},
];
