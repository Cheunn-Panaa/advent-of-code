import { readFileSync } from 'fs';

function countZeroCrossings(currentPos, distance, isLeft) {
  if (currentPos === 0) {
    return Math.floor(distance / 100);
  }
  
  const distanceToZero = isLeft ? currentPos : 100 - currentPos;
  
  if (distance < distanceToZero) {
    return 0;
  }
  
  const remainingAfterFirstZero = distance - distanceToZero;
  return 1 + Math.floor(remainingAfterFirstZero / 100);
}

function puzzleResolver(inputFile) {
  const input = readFileSync(inputFile, 'utf8').trim().split('\n');
  
  let position = 50;
  let totalCrossings = 0;
  
  for (const line of input) {
    const direction = line[0];
    const distance = parseInt(line.slice(1));
    const isLeft = direction === 'L';
    
    totalCrossings += countZeroCrossings(position, distance, isLeft);
    
    // Update position
    if (isLeft) {
      position = (position - distance) % 100;
      if (position < 0) position += 100;
    } else {
      position = (position + distance) % 100;
    }
  }
  
  return totalCrossings;
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
