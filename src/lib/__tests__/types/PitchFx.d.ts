export interface PitchFx {
	bb_game_id: string;
	bbref_game_id: string;
	pitch_app_id: string;
	inning_id: string;
	at_bat_id: string;
	pitcher_id_mlb: number;
	batter_id_mlb: number;
	pitcher_id_bbref: string;
	batter_id_bbref: string;
	pitcher_team_id_bb: string;
	opponent_team_id_bb: string;
	p_throws: string;
	stand: string;
	pitch_id: number;
	inning: number;
	ab_total: number;
	ab_count: number;
	ab_id: number;
	des: string;
	strikes: number;
	balls: number;
	basic_type: string;
	pdes: string;
	mlbam_pitch_name: string;
	start_speed?: number;
	zone_location?: number;
	sz_top?: number;
	sz_bot?: number;
	pfx_x?: number;
	pfx_z?: number;
	x0: number;
	y0: number;
	z0: number;
	vx0: number;
	vy0: number;
	vz0: number;
	ax: number;
	ay: number;
	az: number;
	px?: number;
	pz?: number;
	park_sv_id: string;
	plate_time: number;
	extension: number;
	break_angle: number;
	break_length: number;
	break_y: number;
	spin_rate: number;
	spin_direction: number;
	launch_speed: number;
	launch_angle: number;
	total_distance: number;
	trajectory: string;
	hardness: string;
	location: number;
	coord_x: number;
	coord_y: number;
	game_start_time_utc: string;
	time_pitch_thrown_utc: string;
	game_start_time_est: string;
	time_pitch_thrown_est: Date;
	seconds_since_game_start: number;
	has_zone_location: number;
	batter_did_swing: number;
	batter_made_contact: number;
	called_strike: number;
	swinging_strike: number;
	inside_strike_zone: number;
	outside_strike_zone: number;
	swing_inside_zone: number;
	swing_outside_zone: number;
	contact_inside_zone: number;
	contact_outside_zone: number;
	is_in_play: number;
	is_ground_ball: number;
	is_fly_ball: number;
	is_line_drive: number;
	is_popup: number;
	is_hard_hit: number;
	is_medium_hit: number;
	is_soft_hit: number;
	is_barreled: number;
	is_final_pitch_of_ab: number;
	ab_result_out: number;
	ab_result_hit: number;
	ab_result_single: number;
	ab_result_double: number;
	ab_result_triple: number;
	ab_result_homerun: number;
	ab_result_bb: number;
	ab_result_ibb: number;
	ab_result_k: number;
	ab_result_hbp: number;
	ab_result_error: number;
	ab_result_sac_hit: number;
	ab_result_sac_fly: number;
	ab_result_unclear: number;
	pitch_type_int: number;
	pbp_play_result: string;
	pbp_runs_outs_result: string;
	is_sp: number;
	is_rp: number;
	is_patched: number;
	is_invalid_ibb: number;
	is_out_of_sequence: number;
	is_out_of_boundary?: boolean;
	pitcher_name?: string;
	batter_name?: string;
	runs_outs_result?: string;
	runs_scored?: number;
	count?: string;
	two_strike_count?: boolean;
	pitch_sequence?: string;
	outs_before_play?: number;
	ab_outcome?: string;
}
