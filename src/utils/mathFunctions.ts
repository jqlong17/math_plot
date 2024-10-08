import { FunctionType } from '../types';

export const calculateFunction = (type: FunctionType, x: number, a: number, b: number): number => {
  switch (type) {
    case 'square':
      return a * x * x + b;
    case 'cubic':
      return a * x * x * x + b;
    case 'sine':
      return a * Math.sin(x) + b;
    case 'cosine':
      return a * Math.cos(x) + b;
    case 'exponential':
      return a * Math.exp(x) + b;
    case 'logarithmic':
      return a * Math.log(Math.abs(x)) + b;
    case 'linear':
      return a * x + b;
    default:
      return 0;
  }
};