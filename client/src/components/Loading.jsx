import { Box, Typography } from "@mui/material";

const Loading = ({ isDashboard }) => {
    return(
        <Box
        fontStyle={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height:"100%",
            alignItems: "center",
        }}
        >
            <Typography variant={isDashboard ? "h4" : "h3"}>Loading...</Typography>
            <Typography
            m="10px 0"
            variant="h4"
            sx={{ textAlign: "center" }}
            >
                We are retrieving data to display in this demo as this website is hosted on a free server.
                <br />
                Thank you for your understanding and appreciate your patience. 😊
            </Typography>
            <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif"
            alt="Loading"
            style={{
                height: isDashboard ? "7rem" : "8rem",
                width: isDashboard ? "7rem" : "8rem",
            }}
            />
        </Box>
    );
};

export default Loading;