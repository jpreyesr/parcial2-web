import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateTokenDto {

    @IsString()
    token? : string;
 
    @IsBoolean()
    active : boolean;
 
    @IsNumber()
    reqLeft : number;
}
