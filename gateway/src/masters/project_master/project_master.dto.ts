import { isNotEmpty } from "class-validator";

export class ProjectDto
{
//    @isNotEmpty()
   project_name:string;
   project_name_erp:string;
   parent_project:string

}