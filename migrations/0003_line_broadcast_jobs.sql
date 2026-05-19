CREATE TABLE IF NOT EXISTS line_broadcast_jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  message_json TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'queued', 'running', 'paused', 'completed', 'failed', 'cancelled')),
  total_recipients INTEGER NOT NULL DEFAULT 0,
  sent_count INTEGER NOT NULL DEFAULT 0,
  failed_count INTEGER NOT NULL DEFAULT 0,
  batch_size INTEGER NOT NULL DEFAULT 200,
  interval_seconds INTEGER NOT NULL DEFAULT 60,
  next_run_at TEXT NOT NULL DEFAULT '',
  created_by TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT NOT NULL DEFAULT '',
  last_error TEXT NOT NULL DEFAULT ''
);

CREATE INDEX IF NOT EXISTS idx_line_broadcast_jobs_status_next_run
  ON line_broadcast_jobs(status, next_run_at);

CREATE TABLE IF NOT EXISTS line_broadcast_recipients (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  line_user_id TEXT NOT NULL,
  display_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'sending', 'sent', 'failed', 'skipped')),
  attempt_count INTEGER NOT NULL DEFAULT 0,
  sent_at TEXT NOT NULL DEFAULT '',
  last_error TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (job_id) REFERENCES line_broadcast_jobs(id)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_line_broadcast_recipients_job_user
  ON line_broadcast_recipients(job_id, line_user_id);
CREATE INDEX IF NOT EXISTS idx_line_broadcast_recipients_job_status
  ON line_broadcast_recipients(job_id, status, updated_at);
