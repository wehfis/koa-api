import {
    IsNotEmpty,
    IsOptional,
    IsString,
	Length,
} from 'class-validator';

export interface IBoardTaskModel {
    id: string;
    category_id: string;
    title: string;
    description?: string;
}

export class BoardTaskModel implements IBoardTaskModel {
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    category_id: string;

    @IsNotEmpty()
    @Length(2, 50)
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    constructor(payload: IBoardTaskModel) {
        this.id = payload.id;
        this.category_id = payload.category_id;
        this.title = payload.title;
        this.description = payload.description;
    }
}
