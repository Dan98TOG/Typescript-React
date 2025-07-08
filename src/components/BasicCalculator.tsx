import React, { useState, useCallback } from 'react';
import { CalculatorState } from '../types';
import { performBasicOperation, formatDisplay } from '../utils/calculatorUtils';

const BasicCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    memory: 0
  });

  const inputNumber = useCallback((num: string) => {
    setState(prev => ({
      ...prev,
      display: prev.waitingForNewValue ? num : prev.display === '0' ? num : prev.display + num,
      waitingForNewValue: false
    }));
  }, []);

  const inputOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForNewValue: true
      }));
    } else if (state.operation) {
      const currentValue = state.previousValue || 0;
      try {
        const result = performBasicOperation(currentValue, inputValue, state.operation);
        setState(prev => ({
          ...prev,
          display: formatDisplay(result.toString()),
          previousValue: result,
          operation: nextOperation,
          waitingForNewValue: true
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      }
    }
  }, [state]);

  const calculate = useCallback(() => {
    const inputValue = parseFloat(state.display);
    
    if (state.previousValue !== null && state.operation) {
      try {
        const result = performBasicOperation(state.previousValue, inputValue, state.operation);
        setState(prev => ({
          ...prev,
          display: formatDisplay(result.toString()),
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      }
    }
  }, [state]);

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      memory: 0
    });
  }, []);

  const backspace = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0'
    }));
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.waitingForNewValue ? '0.' : prev.display.includes('.') ? prev.display : prev.display + '.',
      waitingForNewValue: false
    }));
  }, []);

  return (
    <div className="calculator">
      <div className="display">
        <span>{state.display}</span>
      </div>
      
      <div className="button-grid">
        <button onClick={clear} className="btn btn-clear btn-clear-wide">C</button>
        <button onClick={backspace} className="btn btn-secondary">⌫</button>
        <button onClick={() => inputOperation('÷')} className="btn btn-operator">÷</button>
        
        <button onClick={() => inputNumber('7')} className="btn btn-number">7</button>
        <button onClick={() => inputNumber('8')} className="btn btn-number">8</button>
        <button onClick={() => inputNumber('9')} className="btn btn-number">9</button>
        <button onClick={() => inputOperation('×')} className="btn btn-operator">×</button>
        
        <button onClick={() => inputNumber('4')} className="btn btn-number">4</button>
        <button onClick={() => inputNumber('5')} className="btn btn-number">5</button>
        <button onClick={() => inputNumber('6')} className="btn btn-number">6</button>
        <button onClick={() => inputOperation('-')} className="btn btn-operator">-</button>
        
        <button onClick={() => inputNumber('1')} className="btn btn-number">1</button>
        <button onClick={() => inputNumber('2')} className="btn btn-number">2</button>
        <button onClick={() => inputNumber('3')} className="btn btn-number">3</button>
        <button onClick={() => inputOperation('+')} className="btn btn-operator btn-plus">+</button>
        
        <button onClick={() => inputNumber('0')} className="btn btn-number btn-zero">0</button>
        <button onClick={inputDecimal} className="btn btn-number">.</button>
        <button onClick={calculate} className="btn btn-equals">=</button>
      </div>
    </div>
  );
};

export default BasicCalculator;