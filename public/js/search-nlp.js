const dataset = ['mobile', 'flash', 'flash disk', 'power bank', 'disk', 'drive', 'memory', 'storage', 'cellular', 'cable', 'black', 'red', 'power', 'bank', 'capacity', 'battery', 'card', 'otg', 'samsung', 'apple', 'iphone', 'micro']



getEditDistance = function(a, b) {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};

correct = function(word) {
    min_value = getEditDistance(word, dataset[0]);
    correct_words = []
    correct_words.push(dataset[0])
    dataset.forEach(item => {
        trymed = getEditDistance(word, item)
        if (trymed < min_value) {
            min_value = getEditDistance(word, item)
            correct_words = []
            if (trymed == min_value)
                correct_words.push(item)
        }
    })

    return correct_words[0].toLowerCase()
}