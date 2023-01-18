import { Box, Modal, Switch, Typography } from "@mui/material";
import { useContext } from "react";
import MyContext from "../../../../context/Context";
import styles from "./ModalWindow.module.scss";
import useGetNews from "../../../../hooks/service/useGetNews";
import { actions } from "../../../../context/Provider";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

type ModalWindowType = {
  isOpen: boolean;
  toggleModal: () => void;
};

function ModalWindow({ isOpen, toggleModal }: ModalWindowType) {
  const value = useContext(MyContext);
  const { refetch, isFetching } = useGetNews();

  const toggleNews = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      refetch();
    }

    actions?.toggleNews(event.target.checked);
  };

  return (
    <Modal open={isOpen} onClose={toggleModal}>
      <Box sx={style}>
        <Typography
          className={styles.modalSetting__title}
          id="modal-modal-title"
          variant="h6"
        >
          Turn on the News?
        </Typography>
        <Switch
          checked={value?.data?.news.isShow}
          disabled={isFetching}
          onChange={toggleNews}
        />
      </Box>
    </Modal>
  );
}

export default ModalWindow;
