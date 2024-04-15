import {
    IsNotEmpty,
    IsString,
	Length,
} from 'class-validator';

export interface IBoardModel {
    id: string;
    title: string;
}

export class BoardModel implements IBoardModel {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @Length(2, 50)
    @IsString()
    title: string;

    constructor(payload: IBoardModel) {
        this.id = payload.id;
        this.title = payload.title;
    }
}
