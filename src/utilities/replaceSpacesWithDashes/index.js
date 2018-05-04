/**
 * Takes a string, replaces the spaces with dashes.
 * @name replaceSpacesWithDashes
 * @param {string} text - text that needs any spaces replaces with dashes.
 * @returns {string}
 */

 const replaceSpacesWithDashes = (text) => {
    return text.replace(/ /g, '-');
};

export default replaceSpacesWithDashes;