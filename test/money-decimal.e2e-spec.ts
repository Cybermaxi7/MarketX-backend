import { getMetadataArgsStorage } from 'typeorm';
import { Transaction } from '../src/entities/transaction.entity';
import { Order } from '../src/entities/order.entity';
import { Escrow } from '../src/entities/escrow.entity';
import { Product } from '../src/entities/product.entity';
import { ProductPriceEntity } from '../src/products/entities/product-price.entity';
import { ColumnNumericTransformer } from '../src/common/transformers/column-numeric.transformer';

describe('Entity Column Transformers (Unit/Metadata)', () => {
  it('should verify that all money columns have the ColumnNumericTransformer applied', () => {
    const columns = getMetadataArgsStorage().columns;

    const findTransformer = (target: any, propertyName: string) => {
      const col = columns.find(
        (c) => c.target === target && c.propertyName === propertyName,
      );
      return col?.options.transformer;
    };

    // Product
    expect(findTransformer(Product, 'price')).toBeInstanceOf(
      ColumnNumericTransformer,
    );

    // Order
    expect(findTransformer(Order, 'totalAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Order, 'taxAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Order, 'shippingCost')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Order, 'discountAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Order, 'releasedAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Order, 'remainingAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );

    // Escrow
    expect(findTransformer(Escrow, 'amount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );

    // Transaction
    expect(findTransformer(Transaction, 'amount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
    expect(findTransformer(Transaction, 'feeAmount')).toBeInstanceOf(
      ColumnNumericTransformer,
    );

    // ProductPriceEntity
    expect(findTransformer(ProductPriceEntity, 'basePrice')).toBeInstanceOf(
      ColumnNumericTransformer,
    );
  });
});
