export type SwaggerRegister = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type SwaggerLogin = {
    email: string;
    password: string;
};

export type SwaggerCreateCardProcess = {
    name: string;
    description: string;
    status: string;
    userId: number;
    stepsId: number;
    endedAt: string;
};

export type SwaggerCreateStep = {
    name: string;
    description: string;
};

export type SwaggerProfileInfo = {
    firstName: string;
    lastName: string;
    email: string;
}

export type TokenLogin = {
    token: string;
};

export type SwaggerProcessList = {
    name: string;
    description : string;
}

export type SwaggerStepList = {
    name: string;
    description : string;
}