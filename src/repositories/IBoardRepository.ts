export default interface IBoardRepository<BoardModel> {
    findById(id: string): Promise<BoardModel>;
    findAll(userId: string): Promise<BoardModel[]>;
    create(userId:string, title: string): Promise<BoardModel>;
    update(id: string, payload: unknown): Promise<BoardModel>;
    delete(id: string): Promise<boolean>;
}
