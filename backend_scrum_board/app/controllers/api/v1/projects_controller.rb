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

  def update
    @project = Project.find(params[:id])
    @project.update(project_params)
    render json: @project, status: 201
  end

  def destroy
    @project = Project.find(params[:id])
    @project.destroy
    render json: { message: 'Deleted successfully' }, status: 204
  end

  private

  def project_params
      params.require(:project).permit(:name, :description, :user_id, :columnOrder => [])
  end

end
