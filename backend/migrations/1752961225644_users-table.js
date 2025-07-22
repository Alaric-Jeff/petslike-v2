import { type } from 'os';

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
    }, userInformation: {
      type: 'userInformation', 
      notNull: false
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    }
  });

  pgm.createTable('userInformation', {

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
    }, created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    },
  });

  pgm.createType('statusType', [
    'active',
    'ordered',
    'cancelled',
    'abandoned'
  ]);

  pgm.addConstraint('carts', 'fk_cart_user', {
    foreignKeys: {
      columns: 'userId', 
      references: 'users_table(userId)',
      onDelete: 'CASCADE'
    }
  });

  pgm.addConstraint('cartItems', 'fk_cartItems_cart', {
    foreignKeys: {
    columns: 'cartId',
    references: 'carts(cartId)',
    onDelete: 'CASCADE'
    }
  });

  pgm.addConstraint('cartItems', 'fk_cartItems_product', {
    foreignKeys: {
    columns: 'productId',
    references: 'products_table(productId)',
    onDelete: 'CASCADE'
  }
  });

  pgm.createTable('carts', {
    cartId: {
      type: 'serial',
      primaryKey: true
    }, userId: {
      type: 'numeric',
      notNull: true
    }, status: {
      type: 'statusType',
      notNull: true,
      default: 'active'
    }, cartTitle: {
      type: 'varchar(255)',
      notNull: true,
      default: 'add title'
    }, createdAt: {
      type: 'timestamp',
      default: pgm.func('now()')
    }
  });

  pgm.createTable('cartItems', {
    cid: {
      type: 'serial',
      primaryKey: true
    }, cartId: {
      type: 'numeric',
      notNull: true
    }, productId: {
      type: 'numeric',
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
