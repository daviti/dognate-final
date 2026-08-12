ENV['GEM_PATH'] = '/path/to/your/home/ruby/gems:/lib/ruby/gems/1.9.3'

# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Dognate::Application.initialize!
