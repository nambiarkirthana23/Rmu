import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('project_master')
export class ProjectMaster
{
 
    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    @Column({name:'project_name'})
    project_name:string;
    
    @Column({name:'project_name_erp'})
    project_name_erp:string;

    @Column({name:'parent_project'})
    parent_project:string;

}