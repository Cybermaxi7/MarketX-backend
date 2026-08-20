import { Transaction } from './transaction.entity';
import { ColumnNumericTransformer } from '../common/transformers/column-numeric.transformer';

describe('Transaction Entity (Unit)', () => {
  it('should format displayAmount and displayFee correctly when values are numbers', () => {
    const tx = new Transaction();
    tx.amount = 100.5;
    tx.currency = 'USD';
    tx.feeAmount = 2.25;
    tx.feeCurrency = 'USD';

    expect(tx.displayAmount).toBe('USD 100.5000000');
    expect(tx.displayFee).toBe('USD 2.2500000');
    expect(tx.netAmount).toBe(98.25);
  });

  it('should successfully transform database decimal strings to numbers', () => {
    const transformer = new ColumnNumericTransformer();

    expect(transformer.from('100.5000000')).toBe(100.5);
    expect(transformer.from('2.2500000')).toBe(2.25);
    expect(transformer.from(null)).toBeNull();
    expect(transformer.from(undefined)).toBeUndefined();
    expect(transformer.to(100.5)).toBe(100.5);
  });

  it('asserts that adding two money values yields a sum, not string concatenation', () => {
    const transformer = new ColumnNumericTransformer();
    const val1Str = '100.5000000';
    const val2Str = '2.2500000';

    const val1 = transformer.from(val1Str)!;
    const val2 = transformer.from(val2Str)!;

    expect(val1 + val2).toBe(102.75);
  });
});
