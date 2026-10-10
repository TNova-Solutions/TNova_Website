const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = { name: 100, email: 254, message: 4000 };

const INTERESTS = [
    'project',
    'training',
    'trainer',
    'internal-hub',
    'interview-platform',
    'other',
];

// Strips control characters (keeps \n and \t) and trims.
function clean(value) {
    // eslint-disable-next-line no-control-regex
    return String(value ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
}

/**
 * Validates and normalises a contact-form payload.
 * Returns { value } on success or { error } with a user-safe message.
 */
function validateContact(body) {
    if (!body || typeof body !== 'object') {
        return { error: 'Invalid request.' };
    }

    // Honeypot: real users never fill this hidden field.
    if (body.website) {
        return { spam: true };
    }

    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const message = clean(body.message);
    const interest = body.interest ? clean(body.interest) : 'project';

    if (!name) return { error: 'Name is required.' };
    if (!email) return { error: 'Email is required.' };
    if (!message) return { error: 'Message is required.' };

    if (name.length > LIMITS.name) return { error: `Name must be ${LIMITS.name} characters or fewer.` };
    if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) return { error: 'Please enter a valid email address.' };
    if (message.length > LIMITS.message) return { error: `Message must be ${LIMITS.message} characters or fewer.` };
    if (!INTERESTS.includes(interest)) return { error: 'Please choose a valid enquiry type.' };

    return { value: { name, email, message, interest } };
}

module.exports = { validateContact, INTERESTS, LIMITS };
