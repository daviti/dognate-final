class CreateSupplies < ActiveRecord::Migration
  def change
    create_table :supplies do |t|
      t.string :name
      t.text :description
      t.integer :quantity
      t.string :condition
      t.references :category, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
