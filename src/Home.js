import { Box, Grid, Typography } from "@mui/material";

export function Home(props) {
    return(
        <Box>
            <Grid 
                container 
                spacing={2} 
                sx={{
                    display :"flex",
                    justifyContent : "center",
                    alignItems : "center",
                    height : "90vh"
                }}
            >
                <Typography variant="h3" textAlign={"center"}>{props.title}</Typography>
            </Grid>
        </Box>
    )
}

