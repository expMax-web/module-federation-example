import { ComponentType } from 'react';

export type Config = {
  microservices: Record<string, string>;
};
export type InitState = {
  config: Config;
  loading: boolean;
  error: string | null;
};
