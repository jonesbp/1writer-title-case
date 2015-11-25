// 1Writer Title Case Action

// Adheres to John Gruber’s rules for title case
// http://daringfireball.net/2008/05/title_case

// Based on Paul Mucur’s Ruby implementation
// https://github.com/mudge/title_case

var smallWordsRegex =
			/^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v\.?|via|vs\.?)$/;

function colonCheck(word) {
	return (word[word.length - 1] === ':');
}

function titleizeIfAppropriate(word) {
  var dotCheckRegex = /\w\.\w/;
  var intercapCheckRegex = /^.+[A-Z]/;

  if (!word.match(dotCheckRegex) && !word.match(intercapCheckRegex)) {
    // Check that word begins with a letter before upcasing
    if (word.match(/^\W*\w/)) {
      word = word[0].toUpperCase() + word.substr(1);
    }
  }

	return word;
}

function toTitleCase(text) {
	var result = '';
	var colonFlag = false; // Was the current word preceded by a colon?

	var words = text.split(' ');

	for (var i = 0; i < words.length; i++) {
		var formattedWord = '';

		if ((i === 0) || (i === words.length - 1) ||
        (colonFlag) || (colonCheck(words[i]))) {
      // Titleize first words, last words, first words after colons,
      // and last words before colons regardless of whether
      // they are small words
			formattedWord = titleizeIfAppropriate(words[i]);
    } else if (words[i].match(smallWordsRegex)) {
      // If none of these boundaries apply,
      // but word is a small word, downcase
      formattedWord = words[i].toLowerCase();
		} else {
      // All other words titleized if appropriate
			formattedWord = titleizeIfAppropriate(words[i]);
		}

		result += formattedWord + ' ';
		colonFlag = colonCheck(words[i]);
	}

  result = result.substr(0, result.length - 1); // chop trailing space
	return result;
}

// ACTION

var selectedText = editor.getSelectedText();

var formattedText = toTitleCase(selectedText);

editor.replaceSelection(formattedText);
