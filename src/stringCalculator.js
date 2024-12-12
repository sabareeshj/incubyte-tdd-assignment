function add (numbers) {
    if (numbers === "") return 0;

    numbers = numbers.replace(/\n/g, ',');
    const nums = numbers.split(",");
    const sum = nums.reduce((total, num) => total + parseInt(num, 10), 0);
    return sum;
}

module.exports = {
    add
}