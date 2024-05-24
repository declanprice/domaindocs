import { ArrayMinSize, IsArray, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OnboardingStepType } from './onboarding-step';

export class CreateEditOnboardingGuideData {
    @IsString()
    @MinLength(5, { message: 'Guide name must be at least 5 characters.' })
    guideName: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Option)
    teamIds: Option[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Option)
    roleIds: Option[];

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1, { message: 'Guide must have at least 1 step' })
    @Type(() => OnboardingGuideStepData)
    steps: OnboardingGuideStepData[];
}

export class Option {
    @IsString()
    value: string;
}

export class OnboardingGuideStepData {
    @IsString()
    type: OnboardingStepType;

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsString()
    @IsOptional()
    documentationId?: string;
}
