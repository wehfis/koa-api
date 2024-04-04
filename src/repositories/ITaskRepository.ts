import { ITaskBoardDto } from '../dtos/TaskDtos';

export default interface ITaskRepository<BoardTaskModel>{
    findById(id: string): Promise<BoardTaskModel>;
    findAll(boardId: string): Promise<BoardTaskModel[]>;
    create(task: ITaskBoardDto): Promise<BoardTaskModel>;
    update(id: string, task: ITaskBoardDto): Promise<BoardTaskModel>;
    delete(id: string): Promise<boolean>;
}
