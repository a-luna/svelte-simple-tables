import type { BrooksDiffTeamID, PitchTypeAbbrev } from '../types/literals';
import { BROOKS_DIFF_TEAM_IDS, PITCH_TYPE_ABBREV } from './constants';

export const isPitchTypeAbbrev = (pitchType: string): pitchType is PitchTypeAbbrev =>
	PITCH_TYPE_ABBREV.includes(pitchType as PitchTypeAbbrev);

export const isBrooksDiffTeamID = (teamID: string): teamID is BrooksDiffTeamID =>
	BROOKS_DIFF_TEAM_IDS.includes(teamID as BrooksDiffTeamID);
