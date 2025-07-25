import { type } from 'os';

/**
 * @type {import('node-pg-migrate').MigrationBuilder}
 */
export const up = (pgm) => {
  pgm.createType('foodcategory', [
    'dry food',
    'wet food',
    'treats',
    'supplements',
  ]);

  pgm.createType('dietcategory', [
    'processed-meat',
    'raw meat',
    'vegetarian',
    'grain-free',
  ]);

  pgm.createType('lifestage', [
    'baby',
    'young',
    'adult',
    'mature',
    'senior',
    'all-stages',
  ]);

  pgm.createType('animaltype', [
    'dog',
    'cat',
    'bird',
    'fish',
    'hamster',
    'rabbit',
  ]);

  pgm.createTable('users_table', {
    user_id: {
      type: 'serial',
      primaryKey: true,
    },
    provider: {
      type: 'varchar(255)',
      notNull: true,
    },
    provider_id: {
      type: 'varchar(255)',
      notNull: true,
    },
    display_name: {
      type: 'varchar(255)',
      notNull: false,
      default: '',
    },
    user_information: {
      type: 'jsonb',
      notNull: false
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    }
  });

  pgm.addConstraint('users_table', 'unique_provider_provider_id', {
    unique: ['provider', 'provider_id']
  });

  pgm.createTable('products_table', {
    product_id: {
      type: 'serial',
      primaryKey: true,
    },
    product_name: {
      type: 'varchar(255)',
      notNull: true,
      default: 'N/A',
    },
    product_price: {
      type: 'double precision',
      notNull: true,
      default: 0.0,
    },
    product_stock: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    is_discounted: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
    discount_percentage: {
      type: 'real',
      notNull: true,
      default: 0.0,
    },
    product_description: {
      type: 'varchar(255)',
      notNull: false,
      default: 'N/A',
    },
    food_category: {
      type: 'foodcategory',
      notNull: true
    },
    diet_category: {
      type: 'dietcategory',
      notNull: true
    },
    life_stage: {
      type: 'lifestage',
      notNull: true
    },
    animal_type: {
      type: 'animaltype',
      notNull: true
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()'),
    },
  });

  pgm.createIndex('products_table', ['animal_type', 'food_category', 'diet_category']);
  pgm.createIndex('products_table', ['animal_type']);
  pgm.createIndex('products_table', ['food_category']);
  pgm.createIndex('products_table', ['diet_category']);

  pgm.createType('statustype', [
    'active',
    'ordered',
    'cancelled',
    'abandoned'
  ]);

  pgm.createTable('carts', {
    cart_id: {
      type: 'serial',
      primaryKey: true
    },
    user_id: {
      type: 'integer',
      notNull: true
    },
    status: {
      type: 'statustype',
      notNull: true,
      default: 'active'
    },
    cart_title: {
      type: 'varchar(255)',
      notNull: true,
      default: 'add title'
    },
    created_at: {
      type: 'timestamp',
      default: pgm.func('now()')
    }
  });

  pgm.addConstraint('carts', 'fk_cart_user', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users_table(user_id)',
      onDelete: 'CASCADE'
    }
  });

  pgm.createTable('cart_items', {
    cid: {
      type: 'serial',
      primaryKey: true
    },
    cart_id: {
      type: 'integer',
      notNull: true
    },
    product_id: {
      type: 'integer',
      notNull: true
    }
  });

  pgm.addConstraint('cart_items', 'fk_cart_items_cart', {
    foreignKeys: {
      columns: 'cart_id',
      references: 'carts(cart_id)',
      onDelete: 'CASCADE'
    }
  });

  pgm.addConstraint('cart_items', 'fk_cart_items_product', {
    foreignKeys: {
      columns: 'product_id',
      references: 'products_table(product_id)',
      onDelete: 'CASCADE'
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable('cart_items');
  pgm.dropTable('carts');
  pgm.dropTable('products_table');
  pgm.dropTable('users_table');
  pgm.dropType('foodcategory');
  pgm.dropType('dietcategory');
  pgm.dropType('lifestage');
  pgm.dropType('animaltype');
  pgm.dropType('statustype');
};
