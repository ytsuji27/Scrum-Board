class Api::V1::TasksController < ApplicationController

  # Gets all tasks assigned to current user
  def index
    @tasks = Task.where(user_id: current_user.id)
    render json: @tasks
  end

  # Gets all tasks for single project
  def projecttasks
    @tasks = Task.where(project_id: params[:id])
    render json: @tasks
  end

  def create
    @task = Task.create(task_params)
    if @task.valid?
        render json: @task, status: :created
    else
        render json: { error: 'failed to create task' }, status: :not_acceptable
    end
  end

  private

  def task_params
      params.require(:task).permit(:user_id, :project_id, :assigned_id, :category, :content)
  end

end
