ALTER TABLE line_survey_profiles
  ADD COLUMN gender TEXT NOT NULL DEFAULT '';

ALTER TABLE line_survey_profiles
  ADD COLUMN residence_area TEXT NOT NULL DEFAULT '';

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_gender
  ON line_survey_profiles(gender);

CREATE INDEX IF NOT EXISTS idx_line_survey_profiles_residence_area
  ON line_survey_profiles(residence_area);

UPDATE line_survey_profiles
SET residence_area = COALESCE(json_extract(answers_json, '$.residence_area'), '')
WHERE residence_area = '';

UPDATE line_survey_profiles
SET gender = COALESCE(json_extract(answers_json, '$.gender'), '')
WHERE gender = '';
