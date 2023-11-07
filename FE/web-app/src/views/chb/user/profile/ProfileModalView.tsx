// Project
import {Box, Grid, Modal, Typography} from "@mui/material";
import React from "react";

// assets
import './user-profile-style.scss';

// fontawesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    fasXmark as closeIcon,
} from 'utils/font-awesome/icons';

interface ProfileModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const ProfileModalView: React.FC<ProfileModalProps> = ({ isModalOpen, setIsModalOpen }) => {
    return (
        <Modal
            open={ isModalOpen }
            onClose={() => setIsModalOpen(false)}
        >
                <Box className='profile-modal'>
                    <Grid style={{ width: '100%' }}>
                        <FontAwesomeIcon
                            className='close-btn'
                            icon= { closeIcon }
                            onClick={() => setIsModalOpen(false)}
                            size="2xl"
                        />
                    </Grid>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="keep-mounted-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
        </Modal>
    );
};

export default ProfileModalView;