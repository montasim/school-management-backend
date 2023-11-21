/**
 * @fileoverview Custom Joi extension for website URL validation.
 *
 * This extension provides a specialized validator for website URLs,
 * adding checks for URL format, HTTPS scheme, and suspicious patterns.
 * The extension enhances Joi's existing string type with additional
 * validation logic specific to website URLs.
 */

import JoiBase from 'joi';

/**
 * Extends Joi with a custom validator for website URLs.
 * This extension adds a new type 'website' that checks:
 * 1. If the URL starts with http or https.
 * 2. If the URL follows a general valid URL pattern.
 * 3. If the URL contains any suspicious patterns indicating potential fraud.
 */
const websiteValidatorCustomJoi = JoiBase.extend((joi) => {
    return {
        type: 'website',
        base: joi.string(),
        messages: {
            'website.invalid': '{{#label}} is not a valid website',
            'website.suspicious': '{{#label}} contains suspicious patterns',
            'website.scheme': '{{#label}} must start with http or https'
        },
        validate(value, helpers) {
            /**
             * Validates if a URL starts with http or https.
             * @returns An error object if validation fails.
             */
            if (!value.startsWith('http://') && !value.startsWith('https://')) {
                return { value, errors: helpers.error('website.scheme') };
            }

            /**
             * Regular expression for basic URL validation.
             * Validates general structure of URLs including ipv4 and localhost.
             */
            const urlPattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}' + // domain name
                '|localhost' + // or localhost
                '|((\\d{1,3}\\.){3}\\d{1,3}))' + // ...or ipv4
                '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // fragment locator

            /**
             * Validates if the URL matches the general structure.
             * @returns An error object if validation fails.
             */
            if (!urlPattern.test(value)) {
                return { value, errors: helpers.error('website.invalid') };
            }

            /**
             * Suspicious Patterns Check.
             * Checks for common keywords used in fraudulent websites.
             */
            const fraudPattern = /free|prize|winner|claim|urgent|discount|offer|cheap|deal|bonus|gift|promotion|win|exclusive|limited/i;

            /**
             * Validates if the URL contains suspicious patterns.
             * @returns An error object if validation fails.
             */
            if (fraudPattern.test(value)) {
                return { value, errors: helpers.error('website.suspicious') };
            }

            // Return the value if valid
            return value;
        }
    };
});

export default websiteValidatorCustomJoi;