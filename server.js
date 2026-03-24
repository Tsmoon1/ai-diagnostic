const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');
const PASSWORD = process.env.DASHBOARD_PASSWORD || 'criticalai2026';

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadResponses() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading responses:', e);
  }
  return [];
}

function saveResponses(responses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(responses, null, 2));
}

// Submit a response
app.post('/api/responses', (req, res) => {
  try {
    const responses = loadResponses();
    const response = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...req.body,
    };
    responses.push(response);
    saveResponses(responses);
    res.json({ success: true });
  } catch (e) {
    console.error('Error saving response:', e);
    res.status(500).json({ error: 'Failed to save response' });
  }
});

// Get all responses (password protected)
app.get('/api/responses', (req, res) => {
  if (req.query.password !== PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json(loadResponses());
});

// Download CSV
app.get('/api/responses/csv', (req, res) => {
  if (req.query.password !== PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const responses = loadResponses();
  if (responses.length === 0) {
    return res.send('No responses yet.');
  }

  const headers = [
    'Timestamp', 'First Name', 'Role', 'Field',
    'AI Tools Used', 'Usage Frequency', 'Used For',
    'Comfort Scale', 'Feelings', 'Biggest Concern',
    'Career Goal', 'AI Career Importance', 'Want to Learn',
    'Most Valuable For You',
  ];

  const escape = (val) => {
    if (val === undefined || val === null) return '';
    const s = Array.isArray(val) ? val.join('; ') : String(val);
    return '"' + s.replace(/"/g, '""') + '"';
  };

  const rows = responses.map((r) => [
    escape(r.timestamp),
    escape(r.firstName),
    escape(r.role),
    escape(r.field),
    escape(r.aiToolsUsed),
    escape(r.usageFrequency),
    escape(r.usedFor),
    escape(r.comfortScale),
    escape(r.feelings),
    escape(r.biggestConcern),
    escape(r.careerGoal),
    escape(r.aiCareerImportance),
    escape(r.wantToLearn),
    escape(r.mostValuable),
  ].join(','));

  const csv = [headers.join(','), ...rows].join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=ai-diagnostic-responses.csv');
  res.send(csv);
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Diagnostic server running on port ${PORT}`);
});
