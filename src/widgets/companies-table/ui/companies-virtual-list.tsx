import React, {FC, useCallback, useState} from 'react';
import {Company} from "entities/company";
import {Box, Checkbox, Grid, Typography} from "@mui/material";
import {blueGrey} from "@mui/material/colors";
import {EditCompany} from "features/company-info";

interface CompaniesVirtualListProps {
    companies: Company[];
    selected: string[];
    viewportHeight: number;
    itemHeight: number;
    onCompanyChange: (id: string) => void;
}

const CompaniesVirtualList: FC<CompaniesVirtualListProps> = (
    {
        companies,
        viewportHeight,
        itemHeight,
        selected,
        onCompanyChange
    }) => {
    const countVisibleItems = Math.ceil(viewportHeight / itemHeight);
    const [visibleRange, setVisibleRange] = useState(
        {
            startIndex: 0, endIndex: countVisibleItems
        });

    const handleScroll = useCallback((event: React.UIEvent<HTMLElement>) => {
        const newScroll = event.currentTarget.scrollTop;
        const newStartIndex = Math.floor(newScroll / itemHeight);
        const newEndIndex = newStartIndex + countVisibleItems;
        setVisibleRange((prevState) => prevState.startIndex === newStartIndex ? prevState : {
                startIndex: newStartIndex,
                endIndex: newEndIndex
            }
        )
    }, [])

    return (
        <Box sx={{height: viewportHeight, position: 'relative', overflowY: 'auto'}}
             onScroll={handleScroll}
             spacing={2}
        >
            <Box height={itemHeight * companies.length}>

                {companies.length ? companies.map((company, id) => {
                        if (id < visibleRange.startIndex || id > visibleRange.endIndex) return null;

                        return <Grid container
                                     key={company.id}
                                     sx={{
                                         position: 'absolute',
                                         top: id * itemHeight,
                                         paddingBlock: 1,
                                         height: itemHeight,
                                         bgcolor: () => selected.includes(company.id) && blueGrey[900],
                                     }}
                                     columnSpacing={2}
                        >

                            <Grid item xs={1} alignSelf="center" textAlign="center">
                                <Checkbox
                                    name={`company-${company.id}-select`}
                                    onChange={() => onCompanyChange(company.id)}
                                    checked={selected.includes(company.id)}
                                />
                            </Grid>
                            <Grid item xs={6} alignSelf="center">
                                <EditCompany company={company} field="name"/>
                            </Grid>
                            <Grid item alignSelf="center">
                                <EditCompany company={company} field="address"/>
                            </Grid>
                        </Grid>
                    }) :
                    <Box>
                        <Typography>Список пуст.</Typography>
                    </Box>}
            </Box>

        </Box>
    );
};

export default CompaniesVirtualList;