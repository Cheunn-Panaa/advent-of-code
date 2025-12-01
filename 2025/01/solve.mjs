import { readFileSync } from 'fs';

function puzzleResolver(inputFile) {
  const input = readFileSync(inputFile, 'utf8').trim().split('\n');
  
  let position = 50;
  let resetCount = 0;
  
  for (const line of input) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));
    
    if (direction === 'L') {
      position = (position - distance) % 100;
      if (position < 0) position += 100;
    } else if (direction === 'R') {
      position = (position + distance) % 100;
    }
    
    if (position === 0) {
      resetCount++;
    }
  }
  
  return resetCount;
};

// Check if input file is provided
const inputFile = process.argv[2] || 'input.txt';

try {
  const password = puzzleResolver(inputFile);
  console.log(`The password is: ${password}`);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
