// Utility functions
const utils = {
  /**
   * Logs a message to the console.
   * @param {string} message - The message to log.
   */
  log: (message) => {
    console.log(message);
  },

  /**
   * Handles an error.
   * @param {Error} error - The error to handle.
   */
  handleError: (error) => {
    console.error(error);
  },
};

module.exports = utils;