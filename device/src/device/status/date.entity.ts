import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { YearMonth } from "./year_month.entity";

@Entity({name:'date'})
export class DateEntity{

    @PrimaryGeneratedColumn({name:'id'})
    id:number;


    @ManyToOne(() => YearMonth) 
    @JoinColumn({ name: 'ym_id' }) 
    yearMonth: YearMonth;
//    @Column({name:'ym_id'})
//     ym_id:number;


    @Column({name:'ado'})
    ado:number;

    @Column({name:'date'})
    date:number;


    

    




}