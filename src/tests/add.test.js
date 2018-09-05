const add = (a, b) => a + b;
const generateGreeting = name => `Hello ${name}`;

test('should add two numbers', () => {
    const result = add(10, 5);
    expect(result).toEqual(15);
});

test('should generate greetings', () => {
    const greeting = generateGreeting('Hugh');
    expect(greeting).toBe('Hello Hugh');
});