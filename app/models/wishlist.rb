class Wishlist < ActiveRecord::Base
  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "150x150>" }#, :default_url => "/images/:style/missing.png"
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/


  belongs_to :user

  validates :title, :description, :presence => true

  	def self.search(search)
		if search
			where('title LIKE ?', "%#{search}%") 
		else
			scoped
		end
	end

	self.per_page = 10

	
  before_create do
  	self.completed = false
  	true
  end
end
