import { readFile, writeFile } from 'node:fs/promises';
import { SkillModel } from "../models/skill.model.js";

export class SkillRepository {
    #filePath;
    #skillmap = new Map();
    constructor(filePath){
        this.#filePath = filePath;
    }
    async init(){
        try {
            const data = await readFile(this.#filePath, {encoding: 'utf-8'});
            const skillLists = JSON.parse(data);
            for(const item of skillLists){
                const newSkill = new SkillModel(item.name, item.minutes);
                this.#skillmap.set(item.name, newSkill);
            }
        } catch (err){
            if(err.code === 'ENOENT')
                return;
            throw err;
        }
    }

    async #saveToFile(){
        try {
            const statsArray = Array.from(
                this.#skillmap.values(),
                (skill) => skill.getStats()
            );
            const jsonData = JSON.stringify(statsArray, null, 2);
            await writeFile(this.#filePath, jsonData);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getByName(name) {
        return this.#skillmap.get(name);
    }

    getAll(){
        return Array.from(
            this.#skillmap.values(),
            (skill) => skill.getStats());
    }

    async save(skill){
        this.#skillmap.set(skill.getStats().name, skill);
        await this.#saveToFile();
    }

    async delete(nameSkill){
        this.#skillmap.delete(nameSkill);
        await this.#saveToFile();
    }
}