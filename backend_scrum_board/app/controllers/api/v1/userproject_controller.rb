class Api::V1::UserprojectController < ApplicationController

  def create
    @userproject = UserProject.create(userproject_params)
    if @userproject.valid?
        render json: @userproject, status: :created
    else
        render json: { error: 'failed to create userproject' }, status: :not_acceptable
    end
  end

  private

  def userproject_params
      params.require(:userproject).permit(:user_id, :project_id)
  end

end
