"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailedProjectDto = exports.ProjectDto = exports.ProjectSubdomainDto = exports.ProjectTeamDto = exports.ProjectTechnologyDto = void 0;
var ProjectTechnologyDto = (function () {
    function ProjectTechnologyDto(technologyId, name) {
        this.technologyId = technologyId;
        this.name = name;
    }
    return ProjectTechnologyDto;
}());
exports.ProjectTechnologyDto = ProjectTechnologyDto;
var ProjectTeamDto = (function () {
    function ProjectTeamDto(teamId, name) {
        this.teamId = teamId;
        this.name = name;
    }
    return ProjectTeamDto;
}());
exports.ProjectTeamDto = ProjectTeamDto;
var ProjectSubdomainDto = (function () {
    function ProjectSubdomainDto(subdomainId, name) {
        this.subdomainId = subdomainId;
        this.name = name;
    }
    return ProjectSubdomainDto;
}());
exports.ProjectSubdomainDto = ProjectSubdomainDto;
var ProjectDto = (function () {
    function ProjectDto(projectId, name, teamId) {
        this.projectId = projectId;
        this.name = name;
        this.teamId = teamId;
    }
    return ProjectDto;
}());
exports.ProjectDto = ProjectDto;
var DetailedProjectDto = (function () {
    function DetailedProjectDto(project, subdomain, team, technologies) {
        this.project = project;
        this.subdomain = subdomain;
        this.team = team;
        this.technologies = technologies;
    }
    return DetailedProjectDto;
}());
exports.DetailedProjectDto = DetailedProjectDto;
//# sourceMappingURL=project.dto.js.map