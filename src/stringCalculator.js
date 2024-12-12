/**
 * Extracts one or multiple delimiters from a delimiter specification string.
 *
 * This function checks if the delimiter specification contains bracketed delimiters
 * (e.g. "[***][%%]") or a single-line delimiter (e.g. ";").
 * It returns an array of delimiters.
 *
 * @param {string} delimiterPart - The delimiter specification string (e.g. ";", "[***]", "[***][%%]").
 * @returns {string[]} An array of extracted delimiters.
 */
const extractDelimiter = (delimiterPart) => {
    const delimiters = [];
    const bracketed = delimiterPart.match(/\[([^]+?)\]/g);

    if (bracketed) {
        bracketed.forEach(b => {
            delimiters.push(b.slice(1, -1));
        });
    } else {
        delimiters.push(delimiterPart);
    }
    return delimiters;
}

/**
 * Escapes special characters in a string so it can be safely used in a regular expression.
 *
 * This function replaces all regex-special characters with their escaped versions,
 * ensuring that the returned string is treated as a literal pattern.
 *
 * @param {string} str - The input string that may contain special regex characters.
 * @returns {string} The escaped string safe to use in a regular expression.
 */
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Adds numbers from a delimited string and returns their sum.
 *
 * The string can contain zero or more integers, possibly separated by commas, newlines,
 * or custom delimiters. Custom delimiters can be specified with the format:
 * `//[delimiter]\n[numbers...]`, where one or multiple delimiters can be defined,
 * possibly of varying lengths. Numbers greater than 1000 are ignored.
 * Negative numbers cause an error to be thrown listing all negatives.
 *
 * Examples:
 * - `""` returns `0`
 * - `"1"` returns `1`
 * - `"1,2"` returns `3`
 * - `"1\n2,3"` returns `6`
 * - `"//;\n1;2"` returns `3`
 * - `"//[***]\n1***2***3"` returns `6`
 * - `"//[*][%]\n1*2%3"` returns `6`
 *
 * @param {string} numbers - The string containing numbers and delimiters.
 * @throws {Error} If negative numbers are found, throws an error with the message "negatives not allowed: ..." listing all negative numbers.
 * @returns {number} The sum of the parsed numbers.
 */
function add(numbers) {
    if (numbers === "") return 0;

    // default delimiters: comma or newline
    let delimiter = /[,\n]/;

    if (numbers.startsWith("//")) {
        const newlineIndex = numbers.indexOf("\n");
        const delimiterPart = numbers.substring(2, newlineIndex);
        delimiter = extractDelimiter(delimiterPart);
        numbers = numbers.slice(newlineIndex + 1, numbers.length + 1);
        console.log(numbers)
    } else {
        numbers = numbers.replace(/\n/g, ',');
        delimiter = [','];
    }


    const regex = new RegExp(delimiter.map(d => escapeRegExp(d)).join("|"), "g");
    const nums = numbers.split(regex)
        .map(num => parseInt(num, 10))
        .filter(n => !isNaN(n))
        .filter(n => n <= 1000);
    console.log(nums)
    const negatives = nums.filter(n => n < 0);

    if (negatives.length > 0) {
        throw new Error(`negatives not allowed: ${negatives.join(",")}`);
    }

    return nums.reduce((total, num) => total + num, 0);
}

module.exports = {
    add
}