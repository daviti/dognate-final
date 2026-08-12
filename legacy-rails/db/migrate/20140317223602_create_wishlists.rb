class CreateWishlists < ActiveRecord::Migration
  def change
    create_table :wishlists do |t|
      t.references :user, index: true
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
