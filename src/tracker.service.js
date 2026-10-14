import { Skill } from "./skill.model.js";

export class Tracker {
    #userId;
    #skillsMap = new Map();

    constructor(userId){
        this.#userId = userId;
    };

    createSkill(skillName){
        if(this.#skillsMap.has(skillName)){
            throw new Error(`Skill: ${skillName} already exists`);
            
        }
        this.#skillsMap.set(skillName, new Skill(skillName));
    }
    deleteSkill(skillName){
        if(!this.#skillsMap.has(skillName)){
            throw new Error (`Not found skill: ${skillName}`);

        }
        this.#skillsMap.delete(skillName);
    }

    updateSkillTime(skillName, minutes){
        const skill = this.#skillsMap.get(skillName);
        if(!skill){
            throw new Error (`Skill ${skillName} not found`);
        }
        skill.addMinutes(minutes);
    }

    getSkillsList() {
        const result = [];
        for(const skill of this.#skillsMap.values()) {
            result.push(skill.getStats());
        }
        return result;
    }
}