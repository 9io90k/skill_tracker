import { SkillRepository } from './repositories/skill.repository.js'
import { SkillService } from './services/skill.service.js';
const repo = new SkillRepository('./data/data.json');
await repo.init();

const skillService = new SkillService(1, repo);

// Дальше работаем с сервисом:
await skillService.createSkill('developing');
await skillService.updateSkillTime('developing', 120);
console.log(skillService.getSkillsList());