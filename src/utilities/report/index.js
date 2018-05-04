/**
 * Sort of like console - use report to send logs to the console and to Rollbar (if Rollbar is present).
 * @param {string} message - Text to be logged.
 * @param {object} additionalInfo - Rollbar can send more info for logging.
 * @param {string} level - The level of Rollbar warning: `critical`, `error`, `warning`, `info`, or `debug`.
 */

const report = (message, additionalInfo = "none", level = 'warning') => {
    try {
        Rollbar[level](message, { moreInfo: JSON.stringify(additionalInfo) });
        console.log("Rollbarred")
        console.warn(level, message)
        console.dir(additionalInfo)
    }
    catch (e) {
        console.warn(level, message)
        console.dir(additionalInfo)
    }
};

export default report;
