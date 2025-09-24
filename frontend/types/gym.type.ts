import { PlanData } from "./plan.type";

export  type GymData = {
    id:number;
    username:string;
    user_phone:string;
    user_email:string;
    gym_name:string;
    plans:PlanData[]
}