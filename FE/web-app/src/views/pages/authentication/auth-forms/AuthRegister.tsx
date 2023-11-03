import {LOGIN_FORM_TYPE, REGISTER_FORM_TYPE} from "../../../../store/actions";


import CredentialInputForm from './CredentialInputForm';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {

    return (
        <CredentialInputForm
            formType={ REGISTER_FORM_TYPE }
        />
    );
};

export default JWTRegister;
