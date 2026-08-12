class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.string :city
      t.string :state
      t.integer :zipcode
      t.references :user, index: true

      t.timestamps
    end
  end
end
