import React, {FC, useState} from 'react';
import {IconButton, InputAdornment, TextField} from "@mui/material";
import type {Company} from "entities/company";
import {editCompany} from "entities/company";
import {useAppDispatch} from "shared/model";
import EditIcon from '@mui/icons-material/Edit'

interface EditCompanyProps {
    company: Company,
    field: 'name' | 'address',
}

const EditCompany: FC<EditCompanyProps> = ({company, field}) => {

    const dispatch = useAppDispatch();

    const [newName, setNewName] = useState(company[field]);

    const editNameHandler = (newName: string) => {
        if (newName) {
            const newObj = {...company};
            newObj[field] = newName;

            dispatch(editCompany(newObj))
        }
    }

    return (
        <TextField
            fullWidth
            sx={{width: '100%'}}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            name={`company-${company.id}-${field}`}
            InputProps={{
                endAdornment: <InputAdornment position="end" sx={{width: '40px'}}>
                    {newName !== company[field] &&
                      <IconButton onClick={() => editNameHandler(newName)}>
                        <EditIcon/>
                      </IconButton>
                    }
                </InputAdornment>
            }}
        />
    );
};

export default EditCompany;