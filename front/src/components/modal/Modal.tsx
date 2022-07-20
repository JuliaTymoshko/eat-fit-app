import classNames from 'classnames';
import styles from './modal.module.scss';
import 'animate.css';

// MUI
import { Button } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

interface Props {
  message: string;
  messageType: string;
  close(): void;
}

const Modal: React.FC<Props> = ({ message, close, messageType }) => {
  return (
    <div className={classNames()}>
      <div className={classNames(styles.modal)}>
        <div
          className={classNames(
            styles.modalDialog,
            'animate__animated',
            'animate__fadeIn',
            'animate__faster'
          )}
        >
          <div className={classNames(styles.modalContent)}>
            <div className={classNames(styles.modalHeader)}>
              <h3 className={classNames(styles.modalTitle)}>{messageType}</h3>
              <div className={classNames(styles.close)} onClick={() => close()}>
                ×
              </div>
            </div>
            <div className={classNames(styles.modalBody)}>
              <p className={classNames(styles.modalMessage)}>{message}</p>
              <Button
                color="warning"
                variant="outlined"
                size="large"
                onClick={() => close()}
                endIcon={<EmojiPeopleIcon />}
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
