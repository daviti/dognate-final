class WishlistsController < ApplicationController

		def new
			@wishlist = current_user.wishlists.new
		end

		def create
			@wishlist = current_user.wishlists.new(wish_params)
				if @wishlist.saves
					render json: @wishlist
				end
		end

		def show
			
		end

		def update
			wish = Wishlist.find(params[:id])
			wish.update_attributes(wish_params)
				respond_to do |format|
			      if wish.update_attributes(todo_params)
			        format.html { redirect_to root_path }
			        format.json { head :ok }
			      else
			        format.html { redirect_to root_path }
			        format.json { render :json => wish.errors.full_messages, :status => :unprocessable_entity }
			      end
			    end
		end

		def destroy
			Wishlist.find(params[:id]).destroy
			respond_to do |format|
				format.html { redirect_to root_path }
				format.js
			end	
		end


	private
		def wish_params
			params.permit(:title, :description, :photo)
		end

end
