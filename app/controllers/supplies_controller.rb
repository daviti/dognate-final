class SuppliesController < ApplicationController
	 before_action :set_supplies, only: [:index, :create, :destroy, :update]
	def index
		
	end

	def new
		@supply = current_user.supplies.new
	end

	def create
		@supply = current_user.supplies.new(supply_params)	
		if @supply.save
			respond_to do |format|
				format.json 
			end
		else
			redirect_to root_url
		end
		
	end

	def edit
		@supply = Supply.find(params[:id])
		@categories = Category.all
	end

	def update
		supply = Supply.find(params[:id])
		supply.update_attributes(supply_params)
		respond_to do |format|
	      if supply.update_attributes(todo_params)
	        format.html { redirect_to root_path }
	        format.json { head :ok }
	      else
	        format.html { redirect_to root_path }
	        format.json { render :json => supply.errors.full_messages, :status => :unprocessable_entity }
	      end
	    end
	end

	def destroy
		Supply.find(params[:id]).destroy
		respond_to do |format|
			format.js
	end

	private
	def supply_params
		#if params[:supply].present?
  			params.require(:supply).permit(:name,:description,:condition,:quantity, :category_id, :photo)
		#end
	end


	def set_todos
		@supplies = Supply.all.where(completed: false)
	end
end
