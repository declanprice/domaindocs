"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedPersonDto = exports.PersonDto = exports.PersonSkillDto = exports.PersonTeamDto = void 0;
var PersonTeamDto = (function () {
    function PersonTeamDto(teamId, teamName, subdomainName) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.subdomainName = subdomainName;
    }
    return PersonTeamDto;
}());
exports.PersonTeamDto = PersonTeamDto;
var PersonSkillDto = (function () {
    function PersonSkillDto(skillId, skillName, skillDescription) {
        this.skillId = skillId;
        this.skillName = skillName;
        this.skillDescription = skillDescription;
    }
    return PersonSkillDto;
}());
exports.PersonSkillDto = PersonSkillDto;
var PersonDto = (function () {
    function PersonDto(personId, userId, firstName, lastName, contact, iconUri, roleName) {
        this.personId = personId;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contact = contact;
        this.iconUri = iconUri;
        this.roleName = roleName;
    }
    return PersonDto;
}());
exports.PersonDto = PersonDto;
var DetailedPersonDto = (function () {
    function DetailedPersonDto(person, skills, team) {
        this.person = person;
        this.skills = skills;
        this.team = team;
    }
    return DetailedPersonDto;
}());
exports.DetailedPersonDto = DetailedPersonDto;
//# sourceMappingURL=person.dto.js.map