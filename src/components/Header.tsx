import { AppBar, Toolbar, Typography } from "@mui/material";




export const Header = () => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Blog Posts
                </Typography>
            </Toolbar>
        </AppBar>
    );
}