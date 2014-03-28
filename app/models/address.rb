class Address < ActiveRecord::Base
  belongs_to :user

  validates :city, :state, :zipcode, :presence => true

  validates :zipcode, :numericality => true, length: { is: 5 }



end
