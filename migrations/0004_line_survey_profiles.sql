CREATE TABLE IF NOT EXISTS line_survey_profiles (
  line_user_id TEXT PRIMARY KEY,
  thread_id TEXT NOT NULL DEFAULT '',
  display_name TEXT NOT NULL DEFAULT '',
  picture_url TEXT NOT NULL DEFAULT '',
  trigger_keyword TEXT NOT NULL DEFAULT '',
  current_step TEXT NOT NULL DEFAULT '',
  completed INTEGER NOT NULL DEFAULT 0,
  area TEXT NOT NULL DEFAULT '',
  travel_time TEXT NOT NULL DEFAULT '',
  party_type TEXT NOT NULL DEFAULT '',
  lodging_type TEXT NOT NULL DEFAULT '',
  budget TEXT NOT NULL DEFAULT '',
  opt_in INTEGER NOT NULL DEFAULT 0,
  source_url TEXT NOT NULL DEFAULT '',
  last_answer TEXT NOT NULL DEFAULT '',
  answers_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_completed
  ON line_survey_profiles(completed);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_area
  ON line_survey_profiles(area);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_travel_time
  ON line_survey_profiles(travel_time);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_party_type
  ON line_survey_profiles(party_type);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_lodging_type
  ON line_survey_profiles(lodging_type);

CREATE TABLE IF NOT EXISTS line_survey_events (
  id TEXT PRIMARY KEY,
  line_user_id TEXT NOT NULL,
  thread_id TEXT NOT NULL DEFAULT '',
  step TEXT NOT NULL DEFAULT '',
  answer TEXT NOT NULL DEFAULT '',
  raw_json TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_line_survey_events_user
  ON line_survey_events(line_user_id, created_at);
