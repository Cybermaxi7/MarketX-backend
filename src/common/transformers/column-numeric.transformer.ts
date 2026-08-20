import { ValueTransformer } from 'typeorm';

export class ColumnNumericTransformer implements ValueTransformer {
  to(value: number | null | undefined): number | null | undefined {
    return value;
  }

  from(value: string | null | undefined): number | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }
    const parsed = parseFloat(value);
    return isNaN(parsed) ? (value as any) : parsed;
  }
}
