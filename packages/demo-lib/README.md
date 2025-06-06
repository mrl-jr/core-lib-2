# @core-lib/demo-lib

A demo library with utility functions for greetings, calculations, and date formatting. This library demonstrates how to create and publish a TypeScript library using Nx.

## Installation

```bash
npm install @core-lib/demo-lib
```

## Usage

### Import Functions

```typescript
import { createGreeting, calculateSum, formatDate, DemoResult } from '@core-lib/demo-lib';
```

### createGreeting(name: string): DemoResult

Creates a personalized greeting message.

```typescript
const result = createGreeting('John');
console.log(result.message); // "Hello, John! Welcome to the demo library."
console.log(result.data); // { name: 'John', version: '1.0.0' }
```

### calculateSum(numbers: number[]): DemoResult

Calculates the sum of an array of numbers.

```typescript
const result = calculateSum([1, 2, 3, 4, 5]);
console.log(result.message); // "Sum of [1, 2, 3, 4, 5] is 15"
console.log(result.data.sum); // 15
```

### formatDate(date?: Date): DemoResult

Formats a date with locale-specific formatting. Uses current date if no date is provided.

```typescript
const result = formatDate(new Date('2023-01-01'));
console.log(result.message); // "Formatted date: 1/1/2023 12:00:00 AM"
console.log(result.data.iso); // "2023-01-01T00:00:00.000Z"

// Use current date
const currentResult = formatDate();
```

## DemoResult Interface

All functions return a `DemoResult` object with the following structure:

```typescript
interface DemoResult {
  message: string; // Human-readable message
  timestamp: Date; // When the function was called
  data?: any; // Additional data specific to the function
}
```

## Development

This library is built with:

- TypeScript
- Vite (for building)
- Vitest (for testing)
- Nx (for workspace management)

### Building

```bash
npm run build
```

### Testing

```bash
npm run test
```

## License

MIT
