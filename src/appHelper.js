
export const getNextId = () => generateId.next().value

export const sortByIndex = (o1, o2) => o1.index - o2.index

function* idGenerator() {
  let i = 1000
  while (true) {
    i = i + 1
    yield `id-${i}`;
  }
}

const generateId = idGenerator()