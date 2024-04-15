import {
    IsNotEmpty,
    IsString,
	Length,
} from 'class-validator';

export interface IBoardCategoryModel {
    id: string;
    board_id: string;
    name: string;
}

export class BoardCategoryModel implements IBoardCategoryModel {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    board_id: string;

    @IsNotEmpty()
    @Length(2, 50)
    @IsString()
    name: string;

    constructor(payload: IBoardCategoryModel) {
        this.id = payload.id;
        this.board_id = payload.board_id;
        this.name = payload.name;
    }
}
