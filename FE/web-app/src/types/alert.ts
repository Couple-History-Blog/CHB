export interface AlertState {
    alertType: string | null;
    errorMessage: string | null;
    successMessage: string | null;
    showSuccessAlert: boolean | false;
    showErrorAlert: boolean | false;
}