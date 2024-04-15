"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamDetailedDto = exports.TeamDto = exports.TeamProjectDto = exports.TeamMemberDto = exports.TeamSubdomainDto = void 0;
var TeamSubdomainDto = (function () {
    function TeamSubdomainDto(subdomainId, subdomainName) {
        this.subdomainId = subdomainId;
        this.subdomainName = subdomainName;
    }
    return TeamSubdomainDto;
}());
exports.TeamSubdomainDto = TeamSubdomainDto;
var TeamMemberDto = (function () {
    function TeamMemberDto(personId, firstName, lastName, iconUri) {
        this.personId = personId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.iconUri = iconUri;
    }
    return TeamMemberDto;
}());
exports.TeamMemberDto = TeamMemberDto;
var TeamProjectDto = (function () {
    function TeamProjectDto(projectId, projectName) {
        this.projectId = projectId;
        this.projectName = projectName;
    }
    return TeamProjectDto;
}());
exports.TeamProjectDto = TeamProjectDto;
var TeamDto = (function () {
    function TeamDto(teamId, name, iconUri) {
        this.teamId = teamId;
        this.name = name;
        this.iconUri = iconUri;
    }
    return TeamDto;
}());
exports.TeamDto = TeamDto;
var TeamDetailedDto = (function () {
    function TeamDetailedDto(team, subdomain, members, projects) {
        this.team = team;
        this.subdomain = subdomain;
        this.members = members;
        this.projects = projects;
    }
    return TeamDetailedDto;
}());
exports.TeamDetailedDto = TeamDetailedDto;
//# sourceMappingURL=team.dto.js.map