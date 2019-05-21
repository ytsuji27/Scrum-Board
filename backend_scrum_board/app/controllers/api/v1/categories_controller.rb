class Api::V1::CategoriesController < ApplicationController

  # Gets all tasks for single project
  def projectcategory
    @categories = Category.where(project_id: params[:id])
    render json: @categories
  end

  def create
    @category = Category.create(category_params)
    if @category.valid?
      render json: @category, status: :created
    else
      render json: { error: 'failed to create category' }, status: :not_acceptable
    end
  end

  def update
    @category = Category.find(params[:id])
    @category.update(category_params)
    render json: @category, status: 201
  end

  def destroy
    @category = Category.find(params[:id])
    @category.destroy
    render json: { message: 'Deleted successfully' }, status: 204
  end
  
  private

  def category_params
    params.require(:category).permit(:name, :project_id)
  end
  
end
