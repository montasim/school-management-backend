/**
 * @fileoverview This module provides a utility function for generating the HTML body of an
 * error notification email. It is designed to format error details in a user-friendly
 * manner for email communication, specifically targeting system administrators or IT teams.
 */

/**
 * Generates the HTML body for an error notification email.
 * The function formats an error object into a structured and readable HTML format.
 * It is particularly useful for notifying system administrators or IT teams about
 * uncaught exceptions in a system.
 *
 * @param {Error} error - The error object containing the error details. This should
 *                        typically include at least a message and a stack trace.
 * @returns {string} The formatted HTML body for the email. The body includes sections
 *                   for greeting, error details, and a call to action for immediate
 *                   resolution. It also contains a polite closing remark.
 */
function errorEmailBody(error = '') {
    return `
        <h3>Dear Admin,</h3>
    
        <p>We regret to inform you that an uncaught exception occurred in the Projify Backend.</p>
        
        <h4>🚨 Error Details</h4>
        <p>An error has occurred on the server:</p>
        <blockquote>
            <p>${error?.message}</p>
            <pre>${error?.stack}</pre>
        </blockquote>
        
        <h4>🛠️ Immediate Action Required</h4>
        <p>Please review the error and take the necessary steps to resolve the issue at the earliest convenience.</p>
        
        <p>Thank you for your attention to this matter.</p>
    
        <p>Warm regards,</p>
        <p>Projify IT Team</p>
    `;
}

export default errorEmailBody;