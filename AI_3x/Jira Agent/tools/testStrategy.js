// Layer 3 Tool — Test Strategy: build prompt, call GROQ, render deterministic Markdown.
// Boundary rule (BLAST): GROQ produces CONTENT (JSON); Markdown rendering is deterministic code.
// NEW — based on the Test Strategy for Ecommerce Website template.
import { groqChat } from './groqClient.js';

const SCHEMA_HINT = `Return ONLY a JSON object with EXACTLY these keys:
{
  "strategyId": string,                   // e.g. "TS-<KEY>"
  "sourceIssue": string,                  // the Jira key
  "title": string,                        // "Test Strategy — <summary>"
  "objective": string,                    // what this strategy aims to achieve
  "scope": {
    "inScope": string[],                  // what is covered
    "outOfScope": string[]                // what is NOT covered
  },
  "focusAreas": [
    { "area": string, "details": string } // e.g. "Functional", "Performance", "Security"
  ],
  "approach": [
    { "technique": string, "description": string }  // e.g. "Black box testing", "Automated regression"
  ],
  "deliverables": string[],              // test reports, scripts, etc.
  "teamAndSchedule": {
    "teamSize": string,
    "duration": string,
    "phases": [
      { "phase": string, "timeline": string, "activities": string }
    ]
  },
  "entryCriteria": string[],
  "exitCriteria": string[],
  "risks": [
    { "risk": string, "mitigation": string }
  ]
}`;

export function buildMessages(issue) {
  const system = [
    'You are a senior QA Strategist writing a FORMAL Test Strategy document.',
    'A Test Strategy is a HIGH-LEVEL document that defines the testing approach, scope, focus areas, and methodology.',
    'It is different from a Test Plan: a strategy defines WHAT and WHY, while a plan defines WHEN and HOW.',
    'Base everything strictly on the provided Jira issue context.',
    'If information is missing, use "TBD" — never invent specific facts (names, dates, versions).',
    'Be concrete, professional, and concise. Output strictly valid JSON.',
  ].join(' ');

  const user = [
    'Create a formal Test Strategy for the following Jira issue.',
    '',
    `Key: ${issue.key}`,
    `Summary: ${issue.summary}`,
    `Type: ${issue.issueType} | Status: ${issue.status} | Priority: ${issue.priority}`,
    `Components: ${issue.components.join(', ') || 'none'}`,
    `Labels: ${issue.labels.join(', ') || 'none'}`,
    `Fix Versions: ${issue.fixVersions.join(', ') || 'none'}`,
    `Reporter: ${issue.reporter} | Assignee: ${issue.assignee || 'Unassigned'}`,
    '',
    'Description / Acceptance Criteria:',
    issue.description || '(no description provided)',
    '',
    SCHEMA_HINT,
  ].join('\n');

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ];
}

/**
 * Call GROQ to generate the test strategy JSON, then parse it.
 * Strips markdown code fences in case the model wraps output.
 */
export async function generateTestStrategy(config, issue) {
  const messages = buildMessages(issue);
  const raw = await groqChat(config, messages);
  const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    throw new Error('GROQ returned invalid JSON for the Test Strategy. Raw output:\n' + raw.slice(0, 500));
  }
}

/**
 * Deterministic Markdown rendering from the structured strategy JSON.
 */
export function renderMarkdown(strategy) {
  const lines = [];
  const ln = (s = '') => lines.push(s);
  const list = (arr) => (arr || []).forEach((i) => ln(`- ${i}`));
  const table = (cols, rows, cells) => {
    ln(`| ${cols.join(' | ')} |`);
    ln(`| ${cols.map(() => '---').join(' | ')} |`);
    (rows || []).forEach((r) => ln(`| ${cells(r).join(' | ')} |`));
  };

  ln(`# ${strategy.title || 'Test Strategy'}`);
  ln();
  ln(`**Strategy ID:** ${strategy.strategyId || 'TBD'}  `);
  ln(`**Source Issue:** ${strategy.sourceIssue || 'TBD'}`);
  ln();

  ln('## 1. Objective');
  ln(strategy.objective || 'TBD');
  ln();

  ln('## 2. Scope');
  ln('### In Scope');
  list(strategy.scope?.inScope);
  ln('### Out of Scope');
  list(strategy.scope?.outOfScope);
  ln();

  ln('## 3. Focus Areas');
  table(
    ['Area', 'Details'],
    strategy.focusAreas,
    (r) => [r.area, r.details],
  );
  ln();

  ln('## 4. Testing Approach');
  table(
    ['Technique', 'Description'],
    strategy.approach,
    (r) => [r.technique, r.description],
  );
  ln();

  ln('## 5. Deliverables');
  list(strategy.deliverables);
  ln();

  ln('## 6. Team & Schedule');
  if (strategy.teamAndSchedule) {
    ln(`**Team Size:** ${strategy.teamAndSchedule.teamSize || 'TBD'}  `);
    ln(`**Duration:** ${strategy.teamAndSchedule.duration || 'TBD'}`);
    ln();
    table(
      ['Phase', 'Timeline', 'Activities'],
      strategy.teamAndSchedule.phases,
      (r) => [r.phase, r.timeline, r.activities],
    );
  } else {
    ln('TBD');
  }
  ln();

  ln('## 7. Entry Criteria');
  list(strategy.entryCriteria);
  ln();

  ln('## 8. Exit Criteria');
  list(strategy.exitCriteria);
  ln();

  ln('## 9. Risks & Mitigations');
  table(['Risk', 'Mitigation'], strategy.risks, (r) => [r.risk, r.mitigation]);
  ln();

  ln('---');
  ln(`*Generated by JIRA Agent — Test Strategy Buddy (B.L.A.S.T.) on ${new Date().toISOString().slice(0, 10)}*`);

  return lines.join('\n');
}
