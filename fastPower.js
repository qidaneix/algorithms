function fastPower(x, n) {
  if (n === 0) {
    return 1;
  }
  if (n % 2) {
    return fastPower(x, (n - 1) / 2) * fastPower(x, (n - 1) / 2) * x;
  } else {
    return fastPower(x, n / 2) * fastPower(x, n / 2);
  }
}
