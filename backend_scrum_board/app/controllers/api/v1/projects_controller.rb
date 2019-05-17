class Api::V1::ProjectsController < ApplicationController

  def index
    @projects = Project.where(user_id: current_user.id)
    render json: @projects
  end

  def create
    @project = Project.create(project_params)
    if @project.valid?
        render json: @project, status: :created
    else
        render json: { error: 'failed to create project' }, status: :not_acceptable
    end
  end

  private

  def project_params
      params.require(:project).permit(:name, :description, :user_id)
  end

end
