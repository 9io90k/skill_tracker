export class SkillModel{
    #name;
    #minutes;

    constructor(name, minutes = 0){
        if(!name || typeof name !== 'string'){
            throw new Error('Skill name must be a non-empty string')
        }
        if(minutes < 0) {
            throw new Error('Minutes must be >0');
        }
        this.#name = name;
        this.#minutes = minutes;
    }

    addMinutes(min){
        if (typeof min !== 'number' || Number.isNaN(min) || min <= 0) {
            return;
        }
        this.#minutes += min;
    }

    getHours(){
        return Number((this.#minutes/ 60).toFixed(1));
    }

    getFormattedTime(){
        const hours = Math.floor(this.#minutes/60);
        const mins = this.#minutes % 60;
        return `${hours} h ${mins} m`;
    }

    getStats(){
        return{
            name: this.#name,
            formattedTime: this.getFormattedTime(),
            minutes: this.#minutes,
            hours: this.getHours(),
        };
    }
}