import React, {useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'
import {useAppDispatch} from "shared/model";
import {addCompany} from "entities/company";

const AddCompanyModal = () => {
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch();

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formJson = Object.fromEntries((formData as any).entries());
        dispatch(addCompany(formJson))
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Tooltip title="Добавить">
                <IconButton onClick={() => setOpen(true)}>
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: submitHandler
                }}
            >
                <DialogTitle>Добавить компанию</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label="Название компании"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        required
                        margin="dense"
                        id="address"
                        name="address"
                        label="Адрес компании"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button name="cancel" onClick={() => setOpen(false)}>Отмена</Button>
                    <Button name="add-new-company" type="submit">Добавить</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default AddCompanyModal;