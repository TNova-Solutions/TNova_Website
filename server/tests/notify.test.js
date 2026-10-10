import { createRequire } from 'node:module';

import { describe, expect, it, vi } from 'vitest';

const require = createRequire(import.meta.url);

describe('notify', () => {
  it('does nothing when SMTP is not configured', async () => {
    delete process.env.SMTP_URL;
    delete process.env.NOTIFY_EMAIL_TO;
    const { notify } = require('../src/notify');
    expect(await notify({ subject: 's', lines: ['x'] })).toBe(false);
  });

  it('sends a plain-text email with reply-to when configured, and survives SMTP failure', async () => {
    process.env.SMTP_URL = 'smtp://localhost:2525';
    process.env.NOTIFY_EMAIL_TO = 'info@tnovasolutions.com';
    const nodemailer = require('nodemailer');
    const sendMail = vi.fn().mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('boom'));
    vi.spyOn(nodemailer, 'createTransport').mockReturnValue({ sendMail });
    const { notify } = require('../src/notify');

    expect(await notify({ subject: 'Hi', lines: ['a', 'b'], replyTo: 'x@y.co' })).toBe(true);
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      to: 'info@tnovasolutions.com', replyTo: 'x@y.co', subject: 'Hi', text: 'a\nb',
    }));

    // A failing mail server must never break the visitor's submission.
    expect(await notify({ subject: 'Hi', lines: ['a'] })).toBe(false);
  });
});
