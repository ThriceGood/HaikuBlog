class User < ApplicationRecord
  has_secure_password

  has_many :posts
  has_many :comments
  has_many :reactions

  validates_presence_of :username
  validates_presence_of :email
  validates_uniqueness_of :email
end