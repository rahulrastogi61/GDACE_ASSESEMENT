class ApplicationInformation {
    private REF_ID: string;
    private APP_STATUS: string;
    private AGENCY_DETAILS: string;
    private PROJECT_TITLE: string;

    constructor() {
        this.REF_ID = '';
        this.APP_STATUS = '';
        this.AGENCY_DETAILS = '';
        this.PROJECT_TITLE = '';
    }

    public getRefId(): string {
        return this.REF_ID;
    }

    public setRefId(refId: string): void {
        this.REF_ID = refId;
    }

    public getAppStatus(): string {
        return this.APP_STATUS;
    }

    public setAppStatus(appStatus: string): void {
        this.APP_STATUS = appStatus;
    }

    public getAgencyDetails(): string {
        return this.AGENCY_DETAILS;
    }

    public setAgencyDetails(agencyDetails: string): void {
        this.AGENCY_DETAILS = agencyDetails;
    }

    public getProjectTitle(): string {
        return this.PROJECT_TITLE;
    }

    public setProjectTitle(projectTitle: string): void {
        this.PROJECT_TITLE = projectTitle;
    }
}

export { ApplicationInformation };
