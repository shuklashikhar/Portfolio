// api/send-comment.js
// Hardened version: no risky top-level imports, safe OPTIONS handling, Mailjet used only when configured.

const OWNER_EMAIL ='shuklashikhar2004@gmail.com';
const MJ_API_KEY = process.env.MAILJET_API_KEY || null;
const MJ_SECRET = process.env.MAILJET_SECRET_KEY || null;
const PORTFOLIO_URL = process.env.PORTFOLIO_URL || null;

function escapeHtml(str = '') {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function setCorsHeaders(res) {
  // For dev/test allow all. In production replace '*' with your domain.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Type');
}

export default async function handler(req, res) {
  try {
    // Always set CORS headers first
    setCorsHeaders(res);

    // Preflight: respond quickly without any other work
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    }

    const { email, comment } = req.body || {};
    if (!comment || !String(comment).trim()) {
      return res.status(400).json({ ok: false, error: 'Missing comment body' });
    }

    // Build messages (always safe)
    const messages = [
      {
        From: { Email: OWNER_EMAIL || 'no-reply@example.com', Name: 'Portfolio Notification' },
        To: [{ Email: OWNER_EMAIL || 'no-reply@example.com' }],
        Subject: `New comment${email ? ` from ${email}` : ''}`,
        TextPart: `New comment from ${email || 'Guest'}:\n\n${comment}`,
        HTMLPart: `<p><strong>From:</strong> ${escapeHtml(email || 'Guest')}</p>
                   <div style="white-space: pre-wrap; border-left:3px solid #eee; padding-left:8px;">${escapeHtml(comment)}</div>`
      }
    ];

    // Add confirmation to commenter only if email provided and Mailjet keys are present
    if (MJ_API_KEY && MJ_SECRET && email) {
      messages.push({
        From: { Email: OWNER_EMAIL || 'no-reply@example.com', Name: 'Portfolio' },
        To: [{ Email: email }],
        Subject: 'Thanks for your comment',
        TextPart: `Thanks — we received your comment:\n\n${comment}`,
        HTMLPart: `<p>Thanks — we received your comment:</p><div style="white-space:pre-wrap">${escapeHtml(comment)}</div>
                   ${PORTFOLIO_URL ? `<p><a href="${PORTFOLIO_URL}">Visit portfolio</a></p>` : ''}`
      });
    }

    // If Mailjet keys present, dynamically import and send.
    if (MJ_API_KEY && MJ_SECRET) {
      let mailjet;
      try {
        // dynamic import prevents module-level failures for preflight requests
        mailjet = (await import('node-mailjet')).default;
      } catch (impErr) {
        console.error('Failed to import node-mailjet:', impErr);
        // Do not fail the request entirely; return success but log the issue
        return res.status(200).json({ ok: true, message: 'Comment received (mail disabled: import failed).' });
      }

      try {
        const client = mailjet.apiConnect(MJ_API_KEY, MJ_SECRET);
        const request = await client.post('send', { version: 'v3.1' }).request({ Messages: messages });
        console.log('Mailjet sent, messages:', request?.body?.Messages?.length ?? 0);
        return res.status(200).json({ ok: true, message: 'Comment received and email sent.' });
      } catch (mailErr) {
        console.error('Mailjet sending error:', mailErr && (mailErr.response?.body || mailErr.message || mailErr));
        // Return success to caller to avoid exposing internal mail errors (but include helpful text)
        return res.status(200).json({ ok: true, message: 'Comment received (mail failed).', mailError: String(mailErr?.message || mailErr) });
      }
    }

    // No mail provider configured — log and return success
    console.log('Mail skipped (no Mailjet). Comment:', { email, comment: comment.slice(0,200) });
    return res.status(200).json({ ok: true, message: 'Comment received (mail not sent).' });

  } catch (err) {
    // Catch-all — ensure CORS headers set and return JSON error
    try { setCorsHeaders(res); } catch(e) {}
    console.error('send-comment unexpected error:', err);
    return res.status(500).json({ ok: false, error: err?.message || 'Internal server error' });
  }
}
