import { useState, useEffect } from 'react';

// ─── Styles ───────────────────────────────────────────────────────────────────
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f6f2 0%, #eef0f5 100%)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '680px',
  },
  accent: '#4a6fa5',
  accentLight: '#e8eef7',
  h1: { fontSize: '1.9rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' },
  h2: { fontSize: '1.4rem', fontWeight: '600', color: '#1a1a2e', marginBottom: '1rem' },
  subtitle: { color: '#666', fontSize: '1rem', lineHeight: '1.5', marginBottom: '1.5rem' },
  label: { display: 'block', fontWeight: '600', marginBottom: '0.4rem', color: '#333' },
  input: {
    width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #ddd',
    borderRadius: '8px', fontSize: '1rem', outline: 'none',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #ddd',
    borderRadius: '8px', fontSize: '1rem', outline: 'none', minHeight: '90px',
    resize: 'vertical', transition: 'border-color 0.2s', fontFamily: 'inherit',
  },
  optionRow: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    padding: '0.6rem 0.9rem', borderRadius: '8px', cursor: 'pointer',
    marginBottom: '0.4rem', border: '1.5px solid #ddd', transition: 'all 0.15s',
    userSelect: 'none',
  },
  optionSelected: {
    background: '#e8eef7', borderColor: '#4a6fa5',
  },
  optionDot: {
    width: '18px', height: '18px', borderRadius: '50%',
    border: '2px solid #ccc', flexShrink: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
  },
  optionDotSelected: { background: '#4a6fa5', borderColor: '#4a6fa5' },
  optionCheck: {
    width: '18px', height: '18px', borderRadius: '4px',
    border: '2px solid #ccc', flexShrink: 0, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem',
    transition: 'all 0.15s',
  },
  optionCheckSelected: { background: '#4a6fa5', borderColor: '#4a6fa5', color: '#fff' },
  btn: {
    background: '#4a6fa5', color: '#fff', border: 'none',
    padding: '0.8rem 2rem', borderRadius: '8px', fontSize: '1rem',
    fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s',
  },
  btnSecondary: {
    background: 'transparent', color: '#4a6fa5', border: '1.5px solid #4a6fa5',
    padding: '0.8rem 2rem', borderRadius: '8px', fontSize: '1rem',
    fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s',
  },
  btnDisabled: { background: '#aaa', cursor: 'not-allowed' },
  progress: {
    height: '6px', background: '#eee', borderRadius: '3px',
    marginBottom: '1.5rem', overflow: 'hidden',
  },
  progressBar: { height: '100%', background: '#4a6fa5', borderRadius: '3px', transition: 'width 0.4s' },
  scaleRow: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap', margin: '0.5rem 0' },
  scaleTile: {
    width: '44px', height: '44px', borderRadius: '8px', border: '1.5px solid #ddd',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontWeight: '600', fontSize: '0.95rem', transition: 'all 0.15s',
    userSelect: 'none',
  },
  scaleTileSelected: { background: '#4a6fa5', borderColor: '#4a6fa5', color: '#fff' },
  sectionTag: {
    display: 'inline-block', background: '#e8eef7', color: '#4a6fa5',
    fontSize: '0.78rem', fontWeight: '700', padding: '0.25rem 0.75rem',
    borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.05em',
    marginBottom: '1rem',
  },
  fieldGroup: { marginBottom: '1.4rem' },
  row: { display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1.5rem' },
  hint: { color: '#e07b00', fontSize: '0.85rem', marginTop: '0.5rem' },
  // Dashboard
  dashCard: {
    background: '#f8f9fc', border: '1px solid #e0e4ed', borderRadius: '12px',
    padding: '1.2rem 1.5rem', marginBottom: '1rem',
  },
  statVal: { fontSize: '2.4rem', fontWeight: '700', color: '#4a6fa5' },
  statLabel: { color: '#666', fontSize: '0.9rem' },
  barWrap: { margin: '0.3rem 0 0.6rem' },
  barLabel: { display: 'flex', justifyContent: 'space-between', marginBottom: '2px', fontSize: '0.88rem', color: '#444' },
  barOuter: { background: '#e8eef7', borderRadius: '4px', height: '20px', overflow: 'hidden' },
  barInner: { height: '100%', background: '#4a6fa5', borderRadius: '4px', transition: 'width 0.5s' },
  tab: {
    padding: '0.5rem 1.1rem', border: 'none', background: 'transparent',
    cursor: 'pointer', fontWeight: '600', color: '#777', borderBottom: '2px solid transparent',
    transition: 'all 0.2s', fontSize: '0.95rem',
  },
  tabActive: { color: '#4a6fa5', borderBottom: '2px solid #4a6fa5' },
};

// ─── Data definitions ──────────────────────────────────────────────────────────
const ROLES = ['Current student', 'Working professional', 'Both — student and working', 'Other'];
const AI_TOOLS = ['ChatGPT', 'Claude (Anthropic)', 'Google Gemini', 'Microsoft Copilot', 'Midjourney / DALL·E', 'Perplexity', 'GitHub Copilot', "I haven't used any AI tools"];
const FREQUENCIES = ['Never', 'I tried it once or twice', 'A few times a month', 'Weekly', 'Daily or almost daily'];
const USED_FOR = ['Writing and editing', 'Research and summarizing', 'Coding or technical work', 'Brainstorming ideas', 'Learning new concepts', 'Creating images or media', 'Organizing or planning', 'Other'];
const FEELINGS = ['Excited', 'Curious', 'Hopeful', 'Confident', 'Anxious', 'Overwhelmed', 'Skeptical', 'Confused'];
const CAREER_GOALS = ['Stay in my current field and grow', 'Transition to a new field', 'Start my own business', 'Advance into leadership', "I'm still figuring it out", 'Other'];
const WANT_TO_LEARN = [
  'How AI tools actually work (the basics)',
  'Practical skills for specific AI tools',
  'Ethical issues and critical thinking about AI',
  'How AI is changing my specific field',
  'How to stay competitive as AI grows',
  'How to evaluate AI-generated content',
  'How organizations are using AI right now',
];

// ─── Helper components ─────────────────────────────────────────────────────────
function RadioGroup({ options, value, onChange }) {
  return (
    <div>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <div
            key={opt}
            style={{ ...s.optionRow, ...(selected ? s.optionSelected : {}) }}
            onClick={() => onChange(opt)}
          >
            <div style={{ ...s.optionDot, ...(selected ? s.optionDotSelected : {}) }}>
              {selected && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
            </div>
            <span style={{ fontSize: '0.95rem' }}>{opt}</span>
          </div>
        );
      })}
    </div>
  );
}

function CheckGroup({ options, value = [], onChange }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div>
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <div
            key={opt}
            style={{ ...s.optionRow, ...(selected ? s.optionSelected : {}) }}
            onClick={() => toggle(opt)}
          >
            <div style={{ ...s.optionCheck, ...(selected ? s.optionCheckSelected : {}) }}>
              {selected && '✓'}
            </div>
            <span style={{ fontSize: '0.95rem' }}>{opt}</span>
          </div>
        );
      })}
    </div>
  );
}

function ScaleInput({ value, onChange, lowLabel, highLabel }) {
  return (
    <div>
      <div style={s.scaleRow}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <div
            key={n}
            style={{ ...s.scaleTile, ...(value === n ? s.scaleTileSelected : {}) }}
            onClick={() => onChange(n)}
          >
            {n}
          </div>
        ))}
      </div>
      {(lowLabel || highLabel) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#888', marginTop: '4px' }}>
          <span>1 = {lowLabel}</span>
          <span>10 = {highLabel}</span>
        </div>
      )}
    </div>
  );
}

// ─── Survey sections ───────────────────────────────────────────────────────────
const SECTIONS = [
  {
    tag: 'Section 1 of 4',
    title: 'A little about you',
    subtitle: "No grades, no wrong answers — just honest thoughts. This helps me tailor the course to where you actually are.",
    isValid: (d) => d.firstName?.trim() && d.role && d.field?.trim(),
  },
  {
    tag: 'Section 2 of 4',
    title: 'Your experience with AI',
    subtitle: "Let's get a clear picture of where you're starting from.",
    isValid: (d) => d.aiToolsUsed?.length > 0 && d.usageFrequency && d.usedFor?.length > 0,
  },
  {
    tag: 'Section 3 of 4',
    title: 'How you\'re feeling about AI',
    subtitle: "There are no wrong feelings here. I want to know what's real for you.",
    isValid: (d) => d.comfortScale && d.feelings?.length > 0,
  },
  {
    tag: 'Section 4 of 4',
    title: 'Where you\'re headed',
    subtitle: "Help me understand your goals so this course can actually serve them.",
    isValid: (d) => d.careerGoal && d.aiCareerImportance && d.wantToLearn?.length > 0,
  },
];

function SurveySection({ index, data, update }) {
  if (index === 0) return (
    <>
      <div style={s.fieldGroup}>
        <label style={s.label}>First name <span style={{ color: '#e07b00' }}>*</span></label>
        <input
          style={s.input}
          placeholder="What should I call you?"
          value={data.firstName || ''}
          onChange={(e) => update({ firstName: e.target.value })}
        />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>Which best describes you? <span style={{ color: '#e07b00' }}>*</span></label>
        <RadioGroup options={ROLES} value={data.role} onChange={(v) => update({ role: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>Field of study or work <span style={{ color: '#e07b00' }}>*</span></label>
        <input
          style={s.input}
          placeholder="e.g. Nursing, Business, Education, Criminal Justice…"
          value={data.field || ''}
          onChange={(e) => update({ field: e.target.value })}
        />
      </div>
    </>
  );

  if (index === 1) return (
    <>
      <div style={s.fieldGroup}>
        <label style={s.label}>Which AI tools have you used? (Select all that apply) <span style={{ color: '#e07b00' }}>*</span></label>
        <CheckGroup options={AI_TOOLS} value={data.aiToolsUsed} onChange={(v) => update({ aiToolsUsed: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>How often do you use AI tools right now? <span style={{ color: '#e07b00' }}>*</span></label>
        <RadioGroup options={FREQUENCIES} value={data.usageFrequency} onChange={(v) => update({ usageFrequency: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>What have you used AI tools for? (Select all that apply) <span style={{ color: '#e07b00' }}>*</span></label>
        <CheckGroup options={USED_FOR} value={data.usedFor} onChange={(v) => update({ usedFor: v })} />
      </div>
    </>
  );

  if (index === 2) return (
    <>
      <div style={s.fieldGroup}>
        <label style={s.label}>How comfortable do you feel using AI tools right now? <span style={{ color: '#e07b00' }}>*</span></label>
        <ScaleInput
          value={data.comfortScale}
          onChange={(v) => update({ comfortScale: v })}
          lowLabel="Not at all comfortable"
          highLabel="Very comfortable"
        />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>Which of these words describe how you feel about AI in your field? (Select all that apply) <span style={{ color: '#e07b00' }}>*</span></label>
        <CheckGroup options={FEELINGS} value={data.feelings} onChange={(v) => update({ feelings: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>What's your biggest concern about AI right now? <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span></label>
        <textarea
          style={s.textarea}
          placeholder="No judgment — just say what's on your mind."
          value={data.biggestConcern || ''}
          onChange={(e) => update({ biggestConcern: e.target.value })}
        />
      </div>
    </>
  );

  if (index === 3) return (
    <>
      <div style={s.fieldGroup}>
        <label style={s.label}>Which best describes your primary career goal? <span style={{ color: '#e07b00' }}>*</span></label>
        <RadioGroup options={CAREER_GOALS} value={data.careerGoal} onChange={(v) => update({ careerGoal: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>How important do you think AI will be to your career over the next five years? <span style={{ color: '#e07b00' }}>*</span></label>
        <ScaleInput
          value={data.aiCareerImportance}
          onChange={(v) => update({ aiCareerImportance: v })}
          lowLabel="Not important at all"
          highLabel="Absolutely essential"
        />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>What do you most want to learn in this course? (Select all that apply) <span style={{ color: '#e07b00' }}>*</span></label>
        <CheckGroup options={WANT_TO_LEARN} value={data.wantToLearn} onChange={(v) => update({ wantToLearn: v })} />
      </div>
      <div style={s.fieldGroup}>
        <label style={s.label}>What would make this course most valuable for you? <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span></label>
        <textarea
          style={s.textarea}
          placeholder="Be specific if you can. I actually read these."
          value={data.mostValuable || ''}
          onChange={(e) => update({ mostValuable: e.target.value })}
        />
      </div>
    </>
  );

  return null;
}

// ─── Bar chart for dashboard ───────────────────────────────────────────────────
function BarChart({ title, counts, total }) {
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return (
    <div style={{ ...s.dashCard, marginBottom: '1.2rem' }}>
      <div style={{ fontWeight: '600', marginBottom: '0.8rem', color: '#333' }}>{title}</div>
      {entries.map(([label, count]) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={label} style={s.barWrap}>
            <div style={s.barLabel}>
              <span>{label}</span>
              <span style={{ color: '#4a6fa5', fontWeight: '600' }}>{count} ({pct}%)</span>
            </div>
            <div style={s.barOuter}>
              <div style={{ ...s.barInner, width: `${pct}%` }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function tally(responses, field) {
  const counts = {};
  responses.forEach((r) => {
    const val = r[field];
    if (Array.isArray(val)) {
      val.forEach((v) => { counts[v] = (counts[v] || 0) + 1; });
    } else if (val !== undefined && val !== null && val !== '') {
      counts[val] = (counts[val] || 0) + 1;
    }
  });
  return counts;
}

function avg(responses, field) {
  const vals = responses.map((r) => r[field]).filter((v) => typeof v === 'number');
  if (!vals.length) return 0;
  return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
}

// ─── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ onBack }) {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [responses, setResponses] = useState([]);
  const [tab, setTab] = useState('overview');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/responses?password=${encodeURIComponent(password)}`);
      if (!res.ok) { setError('Wrong password. Try again.'); setLoading(false); return; }
      const data = await res.json();
      setResponses(data);
      setAuthed(true);
    } catch {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  };

  const downloadCSV = () => {
    window.location.href = `/api/responses/csv?password=${encodeURIComponent(password)}`;
  };

  if (!authed) return (
    <div style={s.page}>
      <div style={{ ...s.card, maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
          <h2 style={s.h2}>Instructor Dashboard</h2>
          <p style={s.subtitle}>Enter the dashboard password to view responses.</p>
        </div>
        <div style={s.fieldGroup}>
          <input
            style={s.input}
            type="password"
            placeholder="Dashboard password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
          />
          {error && <div style={s.hint}>{error}</div>}
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button style={s.btnSecondary} onClick={onBack}>← Back</button>
          <button style={{ ...s.btn, flex: 1 }} onClick={login} disabled={loading}>
            {loading ? 'Checking…' : 'Enter'}
          </button>
        </div>
      </div>
    </div>
  );

  const n = responses.length;
  const comfortAvg = avg(responses, 'comfortScale');
  const aiImportanceAvg = avg(responses, 'aiCareerImportance');

  const tabs = ['overview', 'charts', 'open-responses'];
  const tabLabels = { overview: 'Overview', charts: 'All Charts', 'open-responses': 'Open Responses' };

  return (
    <div style={{ ...s.page, alignItems: 'flex-start' }}>
      <div style={{ ...s.card, maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <h1 style={{ ...s.h1, fontSize: '1.5rem' }}>Instructor Dashboard</h1>
            <p style={{ color: '#888', fontSize: '0.88rem' }}>AI Needs Diagnostic — Professional Readiness in the Age of AI</p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button style={s.btnSecondary} onClick={onBack}>← Back</button>
            <button style={s.btn} onClick={downloadCSV}>⬇ CSV</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Total Responses', val: n },
            { label: 'Avg. Comfort (1–10)', val: n > 0 ? comfortAvg : '—' },
            { label: 'Avg. AI Career Importance', val: n > 0 ? aiImportanceAvg : '—' },
          ].map((stat) => (
            <div key={stat.label} style={{ ...s.dashCard, flex: 1, minWidth: '140px', textAlign: 'center', marginBottom: 0 }}>
              <div style={s.statVal}>{stat.val}</div>
              <div style={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {n === 0 && (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem', background: '#f8f9fc', borderRadius: '12px' }}>
            No responses yet. Share the link with your students!
          </div>
        )}

        {n > 0 && (
          <>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e0e4ed', marginBottom: '1.5rem' }}>
              {tabs.map((t) => (
                <button
                  key={t}
                  style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }}
                  onClick={() => setTab(t)}
                >
                  {tabLabels[t]}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {tab === 'overview' && (
              <>
                <BarChart title="Current Role" counts={tally(responses, 'role')} total={n} />
                <BarChart title="AI Tools Used" counts={tally(responses, 'aiToolsUsed')} total={n} />
                <BarChart title="Usage Frequency" counts={tally(responses, 'usageFrequency')} total={n} />
                <BarChart title="Comfort Scale (1–10)" counts={tally(responses, 'comfortScale')} total={n} />
                <BarChart title="AI Career Importance (1–10)" counts={tally(responses, 'aiCareerImportance')} total={n} />
              </>
            )}

            {/* All charts tab */}
            {tab === 'charts' && (
              <>
                <BarChart title="Current Role" counts={tally(responses, 'role')} total={n} />
                <BarChart title="AI Tools Used" counts={tally(responses, 'aiToolsUsed')} total={n} />
                <BarChart title="Usage Frequency" counts={tally(responses, 'usageFrequency')} total={n} />
                <BarChart title="Used AI For" counts={tally(responses, 'usedFor')} total={n} />
                <BarChart title="Comfort Scale (1–10)" counts={tally(responses, 'comfortScale')} total={n} />
                <BarChart title="Feelings About AI" counts={tally(responses, 'feelings')} total={n} />
                <BarChart title="Primary Career Goal" counts={tally(responses, 'careerGoal')} total={n} />
                <BarChart title="AI Career Importance (1–10)" counts={tally(responses, 'aiCareerImportance')} total={n} />
                <BarChart title="Want to Learn" counts={tally(responses, 'wantToLearn')} total={n} />
              </>
            )}

            {/* Open responses tab */}
            {tab === 'open-responses' && (
              <>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontWeight: '700', marginBottom: '0.8rem', color: '#333', fontSize: '1rem' }}>Biggest Concern About AI</div>
                  {responses.filter((r) => r.biggestConcern?.trim()).length === 0 && (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>No responses yet.</p>
                  )}
                  {responses.filter((r) => r.biggestConcern?.trim()).map((r) => (
                    <div key={r.id} style={{ ...s.dashCard, marginBottom: '0.7rem' }}>
                      <div style={{ fontWeight: '600', color: '#4a6fa5', marginBottom: '0.3rem', fontSize: '0.88rem' }}>{r.firstName} · {r.field}</div>
                      <div style={{ color: '#333', lineHeight: '1.5' }}>{r.biggestConcern}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight: '700', marginBottom: '0.8rem', color: '#333', fontSize: '1rem' }}>What Would Make This Course Most Valuable</div>
                  {responses.filter((r) => r.mostValuable?.trim()).length === 0 && (
                    <p style={{ color: '#999', fontStyle: 'italic' }}>No responses yet.</p>
                  )}
                  {responses.filter((r) => r.mostValuable?.trim()).map((r) => (
                    <div key={r.id} style={{ ...s.dashCard, marginBottom: '0.7rem' }}>
                      <div style={{ fontWeight: '600', color: '#4a6fa5', marginBottom: '0.3rem', fontSize: '0.88rem' }}>{r.firstName} · {r.field}</div>
                      <div style={{ color: '#333', lineHeight: '1.5' }}>{r.mostValuable}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('landing'); // landing | survey | thanks | dashboard
  const [section, setSection] = useState(0);
  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const currentSection = SECTIONS[section];
  const canContinue = currentSection?.isValid(data);

  const next = () => {
    if (section < SECTIONS.length - 1) {
      setSection((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const back = () => {
    if (section > 0) {
      setSection((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const submit = async () => {
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Server error');
      setScreen('thanks');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setSubmitError('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (screen === 'dashboard') return <Dashboard onBack={() => setScreen('landing')} />;

  if (screen === 'thanks') return (
    <div style={s.page}>
      <div style={{ ...s.card, textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={s.h1}>Thank you, {data.firstName}!</h1>
        <p style={{ ...s.subtitle, marginTop: '0.5rem' }}>
          Your responses are in. I'll use what you shared to make this course genuinely useful — not just another box to check. See you in class.
        </p>
        <button style={s.btn} onClick={() => { setScreen('landing'); setSection(0); setData({}); }}>
          Start Over
        </button>
      </div>
    </div>
  );

  if (screen === 'landing') return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🤖</div>
          <h1 style={s.h1}>AI Needs Diagnostic</h1>
          <p style={{ ...s.subtitle, fontSize: '1.05rem' }}>
            <em>Professional Readiness in the Age of AI</em>
          </p>
          <p style={s.subtitle}>
            Before we get started, I want to know where you're coming from — what you've tried, how you're feeling about it, and what you actually need from this course.
          </p>
          <p style={s.subtitle}>
            This takes about 5–7 minutes. Your answers are confidential and go directly to your instructor. No grades attached to this.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <button style={{ ...s.btn, flex: 1 }} onClick={() => setScreen('survey')}>
            Let's go →
          </button>
          <button style={s.btnSecondary} onClick={() => setScreen('dashboard')}>
            View dashboard
          </button>
        </div>
      </div>
    </div>
  );

  // Survey screen
  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* Progress bar */}
        <div style={s.progress}>
          <div style={{ ...s.progressBar, width: `${((section + 1) / SECTIONS.length) * 100}%` }} />
        </div>

        <div style={s.sectionTag}>{currentSection.tag}</div>
        <h2 style={s.h2}>{currentSection.title}</h2>
        <p style={s.subtitle}>{currentSection.subtitle}</p>

        <SurveySection index={section} data={data} update={update} />

        {submitError && <div style={s.hint}>{submitError}</div>}
        {!canContinue && (
          <p style={{ ...s.hint, marginTop: '0.25rem' }}>Please answer the required questions to continue.</p>
        )}

        <div style={s.row}>
          {section > 0 && (
            <button style={s.btnSecondary} onClick={back}>← Back</button>
          )}
          {section < SECTIONS.length - 1 ? (
            <button
              style={{ ...s.btn, ...(canContinue ? {} : s.btnDisabled) }}
              onClick={canContinue ? next : undefined}
            >
              Continue →
            </button>
          ) : (
            <button
              style={{ ...s.btn, ...(canContinue && !submitting ? {} : s.btnDisabled) }}
              onClick={canContinue && !submitting ? submit : undefined}
            >
              {submitting ? 'Submitting…' : 'Submit →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
