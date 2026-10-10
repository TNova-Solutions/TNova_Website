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

function validateApplication(body, roleIds = []) {
    if (!body || typeof body !== 'object') {
        return { error: 'Invalid request.' };
    }

    if (body.website) {
        return { spam: true };
    }

    const role = clean(body.role);
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);
    const profileUrl = clean(body.profileUrl);
    const message = clean(body.message);

    if (!role || (role !== 'general' && !roleIds.includes(role))) {
        return { error: 'Please choose a valid role.' };
    }
    if (!name) return { error: 'Name is required.' };
    if (name.length > LIMITS.name) return { error: `Name must be ${LIMITS.name} characters or fewer.` };
    if (!email) return { error: 'Email is required.' };
    if (email.length > LIMITS.email || !EMAIL_PATTERN.test(email)) return { error: 'Please enter a valid email address.' };
    if (phone && (!/^[+\d()\s.-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.length > 20)) {
        return { error: 'Please enter a valid phone number.' };
    }
    if (profileUrl) {
        let parsedUrl;
        try {
            parsedUrl = new URL(profileUrl);
        } catch {
            return { error: 'Profile link must be a full URL such as https://github.com/you.' };
        }
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            return { error: 'Profile link must be a valid http(s) URL.' };
        }
    }
    if (!message) return { error: 'Please tell us a little about yourself.' };
    if (message.length > 3000) return { error: 'Message must be 3000 characters or fewer.' };

    return { value: { role, name, email, phone, profileUrl, message } };
}

module.exports = { validateContact, validateApplication, INTERESTS, LIMITS };
