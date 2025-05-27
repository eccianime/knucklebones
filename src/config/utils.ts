import { Dimensions } from 'react-native';

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get('window');

export const DICE_SPACE_WIDTH = 60;

export const calculatePoints = (array: number[][]) => {
  return array[0].map((_, colIndex: number) => {
    const columna: number[] = array.map((fila) => fila[colIndex]);
    const mayoresCero = columna.filter((num) => num > 0);

    let suma = 0;

    if (mayoresCero.length === 1) {
      suma = mayoresCero[0];
    } else if (mayoresCero.length === 2) {
      const [a, b] = mayoresCero;

      if (a === b) {
        suma = a * 2 + b * 2;
      } else {
        suma = a + b;
      }
    } else if (mayoresCero.length === 3) {
      const [a, b, c] = mayoresCero;

      if (a === b && b === c) {
        suma = a * 3 + b * 3 + c * 3;
      } else if (a === b) {
        suma = a * 2 + b * 2 + c;
      } else if (a === c) {
        suma = a * 2 + c * 2 + b;
      } else if (b === c) {
        suma = b * 2 + c * 2 + a;
      } else {
        suma = a + b + c;
      }
    }

    return suma;
  });
};

export const getLastNonZeroRow = (
  matrix: number[][],
  column: number,
  direction: 'up' | 'down'
) => {
  if (column < 0 || column >= matrix[0].length) {
    throw new Error('Columna fuera de rango');
  }

  const rows = matrix.length;
  let index = -1;

  if (direction === 'up') {
    for (let i = rows - 1; i >= 0; i--) {
      if (matrix[i][column] === 0) {
        return i;
      }
    }
  } else if (direction === 'down') {
    for (let i = 0; i < rows; i++) {
      if (matrix[i][column] === 0) {
        return i;
      }
    }
  }

  return index;
};

export const removeRemoveRepeatedCells = (
  matrix: number[][],
  col: number,
  rowNumber: number
) => {
  const newMatrix = matrix.map((row) => [...row]);

  let foundValue;
  do {
    foundValue = false;
    for (let row = newMatrix.length - 1; row >= 0; row--) {
      if (newMatrix[row][col] === rowNumber) {
        foundValue = true;
        for (let i = row; i > 0; i--) {
          newMatrix[i][col] = newMatrix[i - 1][col];
        }
        newMatrix[0][col] = 0;
        break;
      }
    }
  } while (foundValue);

  return newMatrix;
};
