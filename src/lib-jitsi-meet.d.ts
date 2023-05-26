declare module 'lib-jitsi-meet' {
  export interface YourPropsNameHere {
    initOptions?: Object;
    connectionOptions?: Object;
    error(e: any): void;
    onConnectionSuccess(): void;
    onConnectionFailed(error: string): void;
    getConnection(): Object;
    setHost(host: string): void;
    dispose(): void;
  }
}
