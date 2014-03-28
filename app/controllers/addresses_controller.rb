class AddressesController < ApplicationController
 before_action :authenticate_user!
 #before_action :set_address, only: [:show, :edit, :update, :destroy]
	
	def new
		@address = current_user.addresses.new
		render layout: 'devise'
	end
	def create
		@address = current_user.addresses.new(address_params)

		respond_to do |format|
			if @address.save
				format.html { redirect_to root_path, notice: 'Address was successfully updated'}
				format.json { render action: 'show', status: :created, location: @address }
			else
				format.html { render action: 'new'}
				format.json { render json: @address.errors, status: :unprocessable_entity }
			end
		end
	end

	private

		def address_params
			params.require(:address).permit(:city, :state, :zipcode)
		end

end
