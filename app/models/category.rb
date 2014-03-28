class Category < ActiveRecord::Base
	has_many :supplies
	validates :name, :presence => true

end
