class MembersController < ApplicationController
  
  helper_method :wish_sort_column, :supply_sort_column, :wish_sort_direction, :supply_sort_direction
  def index
  	if user_signed_in?
  		session[:id] = current_user.id
      @user = current_user
      @supply = current_user.supplies.new
      @wishlist = current_user.wishlists.new
  	end
  	@supplies = Supply.search(params[:search]).order(supply_sort_column + " " + supply_sort_direction).paginate(:per_page => 4, :page => params[:page])
    @categories = Category.all
    @wishlists = Wishlist.search(params[:search]).order(wish_sort_column + " " + wish_sort_direction).paginate(:per_page => 3, :page => params[:page])
  end

  def terms
  end

  def privacy
  end

  private
    
    def supply_sort_column
      Supply.column_names.include?(params[:sort]) ? params[:sort] : "name"
    end

    def wish_sort_column
      Wishlist.column_names.include?(params[:sort]) ? params[:sort] : "title"
    end

    def wish_sort_direction 
      %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
    end

    def supply_sort_direction
       %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
    end


  
end
