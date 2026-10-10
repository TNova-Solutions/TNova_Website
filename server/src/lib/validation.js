// Input validation + sanitising for the public contact form.
const LIMITS = { name: 100, email: 254, message: 5000, minMessage: 5 };

// Pragmatic RFC-5322-ish check: one "@", a dotted domain, no whitespace.
const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value) {
    return typeof value === 'string' ? value.replace(CONTROL_CHARS, '').trim() : '';
}

function validateContact(body) {
    const input = body && typeof body === 'object' ? body : {};
    const name = clean(input.name);
    const email = clean(input.email).toLowerCase();
    const message = clean(input.message);

    if (!name) return { error: 'Name is required.' };
    if (name.length > LIMITS.name) return { error: `Name must be ${LIMITS.name} characters or fewer.` };
    if (/[\r\n]/.test(name)) return { error: 'Name contains invalid characters.' };

    if (!email) return { error: 'Email is required.' };
    if (email.length > LIMITS.email || !EMAIL_RE.test(email)) {
        return { error: 'Please enter a valid email address.' };
    }

    if (!message) return { error: 'Message is required.' };
    if (message.length < LIMITS.minMessage) return { error: 'Please add a few more details to your message.' };
    if (message.length > LIMITS.message) return { error: `Message must be ${LIMITS.message} characters or fewer.` };

    return { value: { name, email, message } };
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Strip CR/LF so user input can never inject extra mail headers.
function headerSafe(text) {
    return String(text).replace(/[\r\n]+/g, ' ').trim();
}

module.exports = { LIMITS, validateContact, escapeHtml, headerSafe };
