function add(numbers) {
    if (numbers === "") return 0;

    // default delimiters: comma or newline
    let delimiter = /[,\n]/;

    if (numbers.startsWith("//")) {
        const newlineIndex = numbers.indexOf("\n");
        const delimiterPart = numbers.substring(2, newlineIndex);
        delimiter = delimiterPart;
        numbers = numbers.slice(newlineIndex + 1, numbers.length + 1);
        console.log(numbers)
    } else {
        numbers = numbers.replace(/\n/g, ',');
        delimiter = ',';
    }

    const nums = numbers.split(delimiter).map(num => parseInt(num, 10));
    return nums.reduce((total, num) => total + num, 0);
}

module.exports = {
    add
}