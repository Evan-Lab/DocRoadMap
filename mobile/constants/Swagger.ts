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
  processId: number;
};

export type SwaggerProfileInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type SwaggerProcessList = {
  name: string;
  description: string;
};

export type SwaggerStepList = {
  name: string;
  description: string;
};

export type SwaggerStepPerIdList = {
  id: number;
  name: string;
  description: string;
};

export type SwaggerProcessPerIdList = {
  id: number;
  name: string;
  description: string;
  steps: SwaggerStepPerIdList[];
};

export type SwaggerProcessListAdministrative = {
  id: number;
  name: string;
  collection_name: string;
};

export type SwaggerAIquery = {
  query: string;
  collection_name: string;
};

export type SwaggerAIconversation = {
  collection_name: string;
};
