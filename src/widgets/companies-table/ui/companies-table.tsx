import {useState} from 'react';
import {Box, Checkbox, Grid, IconButton, Paper, Stack, Toolbar, Tooltip, Typography} from "@mui/material";
import {alpha} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete'
import {useAppDispatch, useAppSelector} from "shared/model";
import {Company, deleteCompanies} from "entities/company";
import AddCompanyModal from "features/add-company";
import CompaniesVirtualList from "./companies-virtual-list";


const CompaniesTable = () => {

    const {companies} = useAppSelector((state: any) => state.companies)
    const dispatch = useAppDispatch();

    const [selected, setSelected] = useState<string[]>([])

    const pickOneCompany = (id: string) => {
        const newId = selected.indexOf(id);

        if (newId === -1) {
            setSelected([...selected, id])
        } else {
            let newArray = [...selected];
            newArray.splice(newId, 1);
            setSelected(newArray);
        }
    }

    const changeAllCompanies = () => {
        if (selected.length < companies.length) {
            setSelected(companies.map((c: Company) => c.id));
        } else {
            setSelected([]);
        }
    }

    const handleDelete = () => {
        dispatch(deleteCompanies(selected))
        setSelected([])
    }

    if (!companies) return <Box paddingBlock={4}>Ошибка при получении компаний</Box>

    return (
        <Box paddingBlock={4}>
            <Toolbar
                sx={{
                    ...(selected.length > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}>
                <Stack direction="row" gap="8px" alignItems="center">
                    <Typography
                        variant="h5">{selected.length ? `Выбрано: ${selected.length}` : 'Список компаний'}</Typography>
                    {selected.length ?
                        <Tooltip title="Удалить">
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip> :
                        <AddCompanyModal/>}
                </Stack>
            </Toolbar>
            <Paper>
                <Box sx={{minWidth: 650}}>
                    <Grid container columnSpacing={2}>
                        <Grid item xs={1} alignSelf="center" textAlign="center" paddingBlock={1}>
                            <Checkbox
                                indeterminate={selected.length === companies.length}
                                checked={!!selected.length}
                                onChange={() => changeAllCompanies()}
                                inputProps={{'aria-label': 'controlled'}}
                            />
                        </Grid>
                        <Grid item xs={6} alignSelf="center" paddingBlock={1} fontWeight="600">Название</Grid>
                        <Grid item xs={5} alignSelf="center" paddingBlock={1} fontWeight="600">Адрес</Grid>
                    </Grid>
                    <CompaniesVirtualList
                        companies={companies}
                        selected={selected}
                        viewportHeight={350}
                        itemHeight={90}
                        onCompanyChange={pickOneCompany}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default CompaniesTable;