// Helper function to split input text into lines based on maximum character limit
const getMaxNextLine = (input, maxChars = 40) => {

  // Split the input text into an array of words
  const allWords = input.split(" ");
  let lines = [];
  let currentLine = "";

  // Iterate through each word
  for (const word of allWords) {
      // If adding the current word would exceeds the maximum character limit
      if ((currentLine + " " + word).length > maxChars) {
        // Push the current line to the lines array and reset currentLine
          lines.push(currentLine.trim());
          currentLine = "";
      }
      // Add the current word to the current line
      currentLine += (currentLine === "" ? "" : " ") + word;
  }

  // Push the remaining characters to the lines array
  if (currentLine.trim() !== "") 
    lines.push(currentLine.trim());
  return lines;
};

// Function to format the title and split it into lines
exports.formatTitle = (title) => {
  return getMaxNextLine(title);
};
