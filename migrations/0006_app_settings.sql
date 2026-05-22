CREATE TABLE IF NOT EXISTS app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO app_settings (key, value, updated_at)
VALUES ('points_survey_enabled', '0', datetime('now'))
ON CONFLICT(key) DO NOTHING;
