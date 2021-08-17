function fastPower(x, n) {
  if (n === 0) return 1;
  if (n % 2) {
    return fastPower(x, n - 1) * x;
  } else {
    const temp = fastPower(x, n / 2);
    return temp * temp;
  }
}
