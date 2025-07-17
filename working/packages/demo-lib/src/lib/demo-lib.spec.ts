import {
  demoLib,
  createGreeting,
  calculateSum,
  formatDate,
  DemoResult,
} from './demo-lib.js';

describe('demoLib', () => {
  it('should work', () => {
    expect(demoLib()).toEqual('demo-lib');
  });
});

describe('createGreeting', () => {
  it('should create a greeting with correct structure', () => {
    const result = createGreeting('John');

    expect(result.message).toBe('Hello, John! Welcome to the demo library.');
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(result.data).toEqual({ name: 'John', version: '1.0.0' });
  });

  it('should handle empty name', () => {
    const result = createGreeting('');

    expect(result.message).toBe('Hello, ! Welcome to the demo library.');
    expect(result.data?.name).toBe('');
  });
});

describe('calculateSum', () => {
  it('should calculate sum correctly', () => {
    const numbers = [1, 2, 3, 4, 5];
    const result = calculateSum(numbers);

    expect(result.message).toBe('Sum of [1, 2, 3, 4, 5] is 15');
    expect(result.data?.sum).toBe(15);
    expect(result.data?.numbers).toEqual(numbers);
  });

  it('should handle empty array', () => {
    const result = calculateSum([]);

    expect(result.message).toBe('Sum of [] is 0');
    expect(result.data?.sum).toBe(0);
  });

  it('should handle negative numbers', () => {
    const numbers = [-1, -2, 3];
    const result = calculateSum(numbers);

    expect(result.data?.sum).toBe(0);
  });
});

describe('formatDate', () => {
  it('should format current date by default', () => {
    const result = formatDate();

    expect(result.message).toContain('Formatted date:');
    expect(result.timestamp).toBeInstanceOf(Date);
    expect(result.data?.formatted).toBeDefined();
    expect(result.data?.time).toBeDefined();
    expect(result.data?.iso).toBeDefined();
  });

  it('should format provided date', () => {
    const testDate = new Date('2023-01-01T12:00:00Z');
    const result = formatDate(testDate);

    expect(result.data?.iso).toBe('2023-01-01T12:00:00.000Z');
  });
});
