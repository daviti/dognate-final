module ApplicationHelper

	def supply_sortable(column, title = nil)
	  title ||= column.titleize
	  css_class = column == supply_sort_column ? "current #{supply_sort_direction}" : nil
	  direction = column == supply_sort_column && supply_sort_direction == "asc" ? "desc" : "asc"
	  link_to title, params.merge( :sort => column, :direction => direction, :page => nil), {:class => css_class}
	end

	def wish_sortable(column, title = nil)
	  title ||= column.titleize
	  css_class = column == wish_sort_column ? "current #{wish_sort_direction}" : nil
	  direction = column == wish_sort_column && wish_sort_direction == "asc" ? "desc" : "asc"
	  link_to title, params.merge( :sort => column, :direction => direction, :page => nil), {:class => css_class}
	end

end




