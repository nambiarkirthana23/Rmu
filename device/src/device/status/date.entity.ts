import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'date'})
export class DateEntity{

    @PrimaryGeneratedColumn({name:'id'})
    id:number;

    @Column({name:'ym_id'})
    ym_id:number;

    @Column({name:'ado'})
    ado:number;

    @Column({name:'date'})
    date:number;






    
    

}