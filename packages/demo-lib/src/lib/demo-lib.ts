export interface DemoResult {
  message: string;
  timestamp: Date;
  data?: any;
}

export function createGreeting(name: string): DemoResult {
  return {
    message: `Hello, ${name}! Welcome to the demo library.`,
    timestamp: new Date(),
    data: { name, version: '1.0.0' },
  };
}

export function calculateSum(numbers: number[]): DemoResult {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return {
    message: `Sum of [${numbers.join(', ')}] is ${sum}`,
    timestamp: new Date(),
    data: { numbers, sum },
  };
}

export function formatDate(date: Date = new Date()): DemoResult {
  return {
    message: `Formatted date: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    timestamp: new Date(),
    data: {
      formatted: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      iso: date.toISOString(),
    },
  };
}

export function demoLib(): string {
  return 'demo-lib';
}
