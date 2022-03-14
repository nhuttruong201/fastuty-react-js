import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

class DialogConfirmDelete extends React.Component {
    render() {
        let { close, backupId, commit, confirm } = this.props;

        return (
            <>
                <Dialog open={true} aria-labelledby="draggable-dialog-title">
                    <DialogTitle
                        style={{ cursor: "move" }}
                        id="draggable-dialog-title"
                    >
                        Bạn có chắc xoá?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>{commit}</strong> sẽ bị xoá vĩnh viễn, cân
                            nhắc kỹ trước khi thực hiện.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => close()}>
                            Huỷ
                        </Button>
                        <Button onClick={() => confirm(backupId)}>
                            Chấp nhận xoá
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default DialogConfirmDelete;
