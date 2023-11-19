import React from "react";
import { Grid, IconButton, Link, Modal, Paper, Typography} from "@mui/material";
import "./calendar-style.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {fasXmark as closeIcon} from "../../../utils/font-awesome/icons";

interface DateModalProps {
    isModalOpen: boolean;
    updateIsModalOpen: (isOpen: boolean) => void;
}

const DateModal: React.FC<DateModalProps> = ({ isModalOpen, updateIsModalOpen }) => {

    return (
      <Modal
          open={ isModalOpen }
          onClose={() => updateIsModalOpen(false)}
      >
          <Grid className='date-modal'>
              <Typography>
                  안농
              </Typography>
              <FontAwesomeIcon
                  style={{ zIndex: '20' }}
                  className='close-btn'
                  icon={closeIcon}
                  onClick={() => updateIsModalOpen(false)}
                  size="2xl"
              />
          </Grid>
      </Modal>
    );
}

export default DateModal;
