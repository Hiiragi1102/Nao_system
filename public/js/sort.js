function compare(a, b) {
  const startA = a.start;
  const startB = b.start;

  let comparison = 0;
  if (startA > startB) {
    comparison = 1;
  } else if (startA < startB) {
    comparison = -1;
  }
  return comparison;
}