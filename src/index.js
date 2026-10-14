import { Tracker } from './tracker.service.js'

const tracker = new Tracker(1);

tracker.createSkill("developing");
tracker.updateSkillTime("developing", 51250);
console.log(tracker.getSkillsList());