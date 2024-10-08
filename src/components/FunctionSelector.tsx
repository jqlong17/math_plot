import React from 'react';
import { useTranslation } from 'react-i18next';
import { FunctionType } from '../types';

interface FunctionSelectorProps {
  selectedFunction: FunctionType;
  setSelectedFunction: (func: FunctionType) => void;
  a: number;
  b: number;
  setA: (value: number) => void;
  setB: (value: number) => void;
}

const FunctionSelector: React.FC<FunctionSelectorProps> = ({
  selectedFunction,
  setSelectedFunction,
  a,
  b,
  setA,
  setB,
}) => {
  const { t } = useTranslation();

  const functionTypes: FunctionType[] = ['square', 'cubic', 'sine', 'cosine', 'exponential', 'logarithmic', 'linear'];

  const handleInputChange = (setter: (value: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setter(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setter(numValue);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('functionSelector')}</h2>
      <select
        className="w-full p-2 mb-4 border rounded"
        value={selectedFunction}
        onChange={(e) => setSelectedFunction(e.target.value as FunctionType)}
      >
        {functionTypes.map((func) => (
          <option key={func} value={func}>
            {t(`functions.${func}`)}
          </option>
        ))}
      </select>
      <div className="mb-4">
        <label className="block mb-2">
          a:
          <input
            type="number"
            value={a}
            onChange={handleInputChange(setA)}
            className="w-full p-2 border rounded"
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2">
          b:
          <input
            type="number"
            value={b}
            onChange={handleInputChange(setB)}
            className="w-full p-2 border rounded"
          />
        </label>
      </div>
    </div>
  );
};

export default FunctionSelector;