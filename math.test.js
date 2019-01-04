function two(one, two) {
    return one + two
}
test("Adding 1 + 1 equals 2", () => {
    expect(two(1, 1)).toBe(2)
  })