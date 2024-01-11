import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'pump_model_master'})
export class PumpModel{
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'model'})
    model:string;

    @Column({name:'solar_pump'})
    solar_pump:string;


}