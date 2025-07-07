declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          clientId: string;
          discoveryDocs: string[];
          scope: string;
        }) => Promise<void>;
        calendar: {
          calendarList: {
            list: () => Promise<{ result: { items: any[] } }>;
          };
          events: {
            list: (params: any) => Promise<{ result: { items: any[] } }>;
            insert: (params: any) => Promise<any>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
            listen: (callback: (isSignedIn: boolean) => void) => void;
          };
          signIn: () => Promise<any>;
          signOut: () => Promise<any>;
        };
      };
    };
  }
} 