import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.VUE_APP_APPINSIGHTS_KEY, 
        enableAutoRouteTracking: true, // Automatically log route changes
    },
});

appInsights.loadAppInsights();

export default appInsights;