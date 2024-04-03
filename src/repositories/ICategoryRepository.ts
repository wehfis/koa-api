export default interface ICategoryRepository<BoardCategoryModel> {
    findById(id: string): Promise<BoardCategoryModel>;
    findAll(boardId: string): Promise<BoardCategoryModel[]>;
    create(boardId: string, name: string): Promise<BoardCategoryModel>;
    update(id: string, name: string): Promise<BoardCategoryModel>;
    delete(id: string): Promise<boolean>;
}
