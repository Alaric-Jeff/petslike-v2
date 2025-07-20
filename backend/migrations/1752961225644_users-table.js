/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  pgm.createType('foodCategory', [
    'dry food',
    'wet food',
    'treats',
    'supplements',
  ]);

  pgm.createType('dietCategory', [
    'processed-meat',
    'raw meat',
    'vegetarian',
    'grain-free',
  ]);

  pgm.createType('lifeStage', [
    'baby',
    'young',
    'adult',
    'mature',
    'senior',
    'all-stages',
  ]);

  pgm.createType('animalType', [
    'dog',
    'cat',
    'bird',
    'fish',
    'hamster',
    'rabbit',
  ]);

  pgm.addConstraint('users_table', 'unique_provider_providerId', {
    unique: ['provider', 'providerId']
  });

  pgm.createTable('users_table', {
    userId: {
      type: 'serial',
      primaryKey: true,
    },
    provider: {
      type: 'varchar(255)',
      notNull: true,
    },
    providerId: {
      type: 'varchar(255)',
      notNull: true,
    },
    displayName: {
      type: 'varchar(255)',
      notNull: false,
      default: '',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    },
  });

  pgm.createIndex('products_table', ['animalType', 'foodCategory', 'dietCategory'])
  pgm.createIndex('products_table', ['animalType'])
  pgm.createIndex('products_table', ['foodCategory'])
  pgm.createIndex('products_table', ['dietCategory'])

  pgm.createTable('products_table', {
    productId: {
      type: 'serial',
      primaryKey: true,
    },
    productName: {
      type: 'varchar(255)',
      notNull: true,
      default: 'N/A',
    },
    productPrice: {
      type: 'double precision',
      notNull: true,
      default: 0.0,
    },
    productStock: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    isDiscounted: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
    discountPercentage: {
      type: 'real',
      notNull: true,
      default: 0.0,
    },
    productDescription: {
      type: 'varchar(255)',
      notNull: false,
      default: 'N/A',
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    }, foodCategory: {
      type: 'foodCategory',
      notNull: true
    }, dietCategory: {
      type: 'dietCategory',
      notNull: true
    }, lifeStage: {
      type: 'lifeStage',
      notNull: true
    }, animalType: {
      type: 'animalType',
      notNull: true
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable('products_table');
  pgm.dropTable('users_table');

  pgm.dropType('foodCategory');
  pgm.dropType('dietCategory');
  pgm.dropType('lifeStage');
  pgm.dropType('animalType');
};
