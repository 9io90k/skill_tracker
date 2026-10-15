import { SkillModel } from '../models/skill.model.js';
export class SkillService {
    #userId;
    #repository;
    constructor(userId, repository){
        this.#userId = userId;
        this.#repository = repository;
    };

    async createSkill(skillName){
        if(this.#repository.getByName(skillName)){
            throw new Error(`This skill already exists`);
        }
        const newSkill = new SkillModel(skillName);
        await this.#repository.save(newSkill);
    }
    async deleteSkill(skillName){
        if(!this.#repository.getByName(skillName)){
            throw new Error (`Not found skill: ${skillName}`);
        }
        await this.#repository.delete(skillName);
    }

    async updateSkillTime(skillName, minutes){
        const skill = this.#repository.getByName(skillName);
        if(!skill){
            throw new Error (`Skill ${skillName} not found`);
        }
        skill.addMinutes(minutes);
        await this.#repository.save(skill);
    }

    getSkillsList() {
        return this.#repository.getAll();
    }
}