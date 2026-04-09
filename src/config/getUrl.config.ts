import { envs } from "./envs.config";

export const GetUrl = (path: string) => `${envs.BACKEND}/${path}`