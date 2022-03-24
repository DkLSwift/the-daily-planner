
export class Character {
    constructor(name, subclass, gearscore, dailyTasks, weeklyTasks, id) {
        this.name = name
        this.subclass = subclass
        this.gearscore = gearscore
        this.dailyTasks = dailyTasks
        this.weeklyTasks = weeklyTasks
        this.id = id
        
    }
}

export class Task {
    constructor(name, max) {
        this.name = name
        this.max = max
        this.completed = 0
    }
}

export const dailyTasks =  {
    "chaosDungeon": new Task("Chaos Dungeon", 2),
    "guardianRaid": new Task("Guardian Raid", 2),
    "unaDaily": new Task("Una Daily", 3),
    "anguishedIsle": new Task("Anguished Isle", 1)
}

export const weeklyTasks = {
    "abyssalDungeon": new Task("Abyssal Dungeon", 1),
    "unaWeekly": new Task("Una Weekly", 3)
}