class AddAttachmentPhotoToWishlists < ActiveRecord::Migration
  def self.up
    change_table :wishlists do |t|
      t.attachment :photo
    end
  end

  def self.down
    drop_attached_file :wishlists, :photo
  end
end
