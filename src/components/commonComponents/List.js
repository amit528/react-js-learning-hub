import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function ListComponent(props) {
    return(
        <Box style={{width : "100%", height : "70vh"}}>
            <DataGrid
                columnHeaderHeight={40}
                rows={props.rows || []}
                columns={props.columns || []}
                // getRowHeight={() => 'auto'}
                rowHeight={30}
            />
        </Box>
    )
}

export default ListComponent;