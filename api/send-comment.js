// api/send-comment.js
import mailjet from 'node-mailjet';

const OWNER_EMAIL = "shuklashikhar2004@gmail.com";
const MJ_API_KEY = process.env.MAILJET_API_KEY || null;
const MJ_SECRET = process.env.MAILJET_SECRET_KEY || null;
const PORTFOLIO_URL = process.env.PORTFOLIO_URL || null;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

export default async function handler(req, res) {
  // CORS preflight (optional if frontend served from same domain)
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  try {
    const { email, comment } = req.body || {};
    if (!comment || !String(comment).trim()) {
      return res.status(400).json({ ok: false, error: 'Missing comment body' });
    }

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

    // If Mailjet configured and commenter email exists, add confirmation message
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

    // If Mailjet keys present, send via Mailjet; otherwise just log & return success.
    if (MJ_API_KEY && MJ_SECRET) {
      const client = mailjet.apiConnect(MJ_API_KEY, MJ_SECRET);
      const request = await client.post('send', { version: 'v3.1' }).request({ Messages: messages });
      console.log('Mailjet response:', request?.body ?? request);
      return res.status(200).json({ ok: true, message: 'Comment received and email sent.' });
    } else {
      // No mail provider configured — log and return success.
      console.log('Mail skipped (no Mailjet). Comment:', { email, comment });
      return res.status(200).json({ ok: true, message: 'Comment received (mail not sent).' });
    }
  } catch (err) {
    console.error('send-comment error:', err);
    return res.status(500).json({ ok: false, error: err.message || 'Internal server error' });
  }
}
