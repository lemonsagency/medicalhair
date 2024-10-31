export interface FacebookPixelParams {
    content_name?: string;
    status?: string;
    value?: number;
    currency?: string;
  }
  
  declare global {
    interface Window {
      fbq: (
        type: string,
        eventName: string,
        params?: FacebookPixelParams
      ) => void;
    }
  }