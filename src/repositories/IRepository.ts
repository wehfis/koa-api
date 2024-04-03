
export default interface IRepository<Model> {
    findById(id: string): Promise<Model>;
    findAll(): Promise<Model[]>;
    create(payload: unknown): Promise<Model>;
    update(id: string, payload: unknown): Promise<Model>;
    delete(id: string): Promise<boolean>;
}
