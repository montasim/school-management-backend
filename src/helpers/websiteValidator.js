import JoiBase from 'joi';
import { promises as dns } from 'dns';
import sslChecker from 'ssl-checker';

// Custom Joi Extension for Website Validation
const Joi = JoiBase.extend((joi) => ({
    type: 'website',
    base: joi.string(),
    messages: {
        'website.invalid': '{{#label}} is not a valid website',
        'website.fraudulent': '{{#label}} is potentially fraudulent'
    },
    validate(value, helpers) {
        // Validation logic
        return (async () => {
            try {
                const { hostname } = new URL(value);

                // DNS Lookup
                await dns.lookup(hostname);

                // SSL Check for HTTPS URLs
                if (value.startsWith('https')) {
                    await sslChecker(hostname);
                }

                // Suspicious Keywords Check (example pattern)
                const fraudPattern = /free|prize|winner|claim|urgent/i;

                if (fraudPattern.test(value)) {
                    throw new Error('Fraudulent pattern detected');
                }

                return value; // Valid website
            } catch (error) {
                if (error.message.includes('Fraudulent pattern detected')) {
                    return helpers.error('website.fraudulent');
                }

                return helpers.error('website.invalid');
            }
        })();
    }
}));

// Export the Joi with the custom website validation
export default Joi;