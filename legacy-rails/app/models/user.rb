class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable


  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :wishlists
  has_many :supplies
  has_many :addresses

  validates :phone_number, :numericality => true, length: { is: 10}
end
