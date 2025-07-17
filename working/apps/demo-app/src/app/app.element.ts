import './app.element.css';
import {
  createGreeting,
  calculateSum,
  formatDate,
  DemoResult,
} from '../../../../packages/demo-lib/src/index.js';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
      <div class="container">
        <h1>@core-lib/demo-lib Demo</h1>
        <p>This application demonstrates the functionality of our publishable library.</p>
        
        <div class="demo-section">
          <h2>createGreeting() Function</h2>
          <input type="text" id="name-input" placeholder="Enter your name" value="World">
          <button id="greeting-btn">Create Greeting</button>
          <div id="greeting-result" class="result"></div>
        </div>

        <div class="demo-section">
          <h2>calculateSum() Function</h2>
          <input type="text" id="numbers-input" placeholder="Enter numbers separated by commas" value="1,2,3,4,5">
          <button id="sum-btn">Calculate Sum</button>
          <div id="sum-result" class="result"></div>
        </div>

        <div class="demo-section">
          <h2>formatDate() Function</h2>
          <input type="date" id="date-input">
          <button id="date-btn">Format Date</button>
          <button id="current-date-btn">Format Current Date</button>
          <div id="date-result" class="result"></div>
        </div>
      </div>
    `;

    this.attachEventListeners();
    this.setDefaultDate();
  }

  private setDefaultDate() {
    const dateInput = this.querySelector('#date-input') as HTMLInputElement;
    const today = new Date();
    dateInput.value = today.toISOString().split('T')[0];
  }

  private attachEventListeners() {
    // Greeting demo
    this.querySelector('#greeting-btn')?.addEventListener('click', () => {
      const nameInput = this.querySelector('#name-input') as HTMLInputElement;
      const result = createGreeting(nameInput.value || 'World');
      this.displayResult('greeting-result', result);
    });

    // Sum calculation demo
    this.querySelector('#sum-btn')?.addEventListener('click', () => {
      const numbersInput = this.querySelector(
        '#numbers-input'
      ) as HTMLInputElement;
      const numbersStr = numbersInput.value.trim();

      if (!numbersStr) {
        this.displayError('sum-result', 'Please enter some numbers');
        return;
      }

      try {
        const numbers = numbersStr.split(',').map((n) => {
          const num = parseFloat(n.trim());
          if (isNaN(num)) {
            throw new Error(`"${n.trim()}" is not a valid number`);
          }
          return num;
        });

        const result = calculateSum(numbers);
        this.displayResult('sum-result', result);
      } catch (error) {
        this.displayError(
          'sum-result',
          error instanceof Error ? error.message : 'Invalid input'
        );
      }
    });

    // Date formatting demo
    this.querySelector('#date-btn')?.addEventListener('click', () => {
      const dateInput = this.querySelector('#date-input') as HTMLInputElement;
      const date = new Date(dateInput.value);

      if (isNaN(date.getTime())) {
        this.displayError('date-result', 'Please enter a valid date');
        return;
      }

      const result = formatDate(date);
      this.displayResult('date-result', result);
    });

    this.querySelector('#current-date-btn')?.addEventListener('click', () => {
      const result = formatDate();
      this.displayResult('date-result', result);
    });
  }

  private displayResult(elementId: string, result: DemoResult) {
    const element = this.querySelector(`#${elementId}`);
    if (element) {
      element.innerHTML = `
        <div class="success">
          <h4>Result:</h4>
          <p><strong>Message:</strong> ${result.message}</p>
          <p><strong>Timestamp:</strong> ${result.timestamp.toLocaleString()}</p>
          <details>
            <summary>Raw Data (click to expand)</summary>
            <pre>${JSON.stringify(result.data, null, 2)}</pre>
          </details>
        </div>
      `;
    }
  }

  private displayError(elementId: string, error: string) {
    const element = this.querySelector(`#${elementId}`);
    if (element) {
      element.innerHTML = `<div class="error">Error: ${error}</div>`;
    }
  }
}

customElements.define('@core-lib/demo-app', AppElement);
