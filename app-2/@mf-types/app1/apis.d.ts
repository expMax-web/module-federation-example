
    export type RemoteKeys = 'app1/Component1' | 'app1/handlers';
    type PackageType<T> = T extends 'app1/handlers' ? typeof import('app1/handlers') :T extends 'app1/Component1' ? typeof import('app1/Component1') :any;