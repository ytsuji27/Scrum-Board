class Api::V1::ProjectsController < ApplicationController

  def index
    @projects = Project.where(user_id: current_user.id)
    render json: @projects
  end
  
end
