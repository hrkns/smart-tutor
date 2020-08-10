/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RemoveElementFromArray = (array: any[], comparation: (a: any) => unknown): any[] => {

  const newArray = [];

  array.forEach(value => {

    if (!comparation(value)) {

      newArray.push(value);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newArray;
};

export const MoveElementFromIndexFromArrayToPosition = (array: any[], indexOfElement: number, destinyPosition: number): any[] => {

  let newArray = array.slice(0, indexOfElement)
    .concat(array.slice(indexOfElement + 1));

  newArray = newArray.slice(0, destinyPosition)
    .concat([array[indexOfElement]])
    .concat(newArray.slice(destinyPosition));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newArray;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RemoveStringFromObjectIfItIsEmpty = (object: any, field: string): any => {

  object[field] = object[field] ? object[field].trim() : '';

  if (object[field].length === 0) {

    delete object[field];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return object;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RemoveArrayOfStringsFromObjectIfItIsEmpty = (object: any, field: string): any => {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  object[field] = object[field] ? object[field].map(s => s.trim()).filter(s => s.length) : [];

  if (object[field].length === 0) {

    delete object[field];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return object;
};
