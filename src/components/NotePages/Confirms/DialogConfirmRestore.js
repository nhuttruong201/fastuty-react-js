import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

class DialogConfirmRestore extends React.Component {
    render() {
        let { close, backupId, commit, confirm } = this.props;

        return (
            <>
                <Dialog open={true} aria-labelledby="draggable-dialog-title">
                    <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                    >
                        Bạn có chắc đặt lại nội dung?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Nội dung hiện tại sẽ được đặt lại với nội dung của
                            commit <strong>{commit}</strong>, cân nhắc kỹ trước
                            khi thực hiện.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => close(false)}>
                            Huỷ
                        </Button>
                        <Button onClick={() => confirm(backupId)}>
                            Chấp nhận
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default DialogConfirmRestore;
