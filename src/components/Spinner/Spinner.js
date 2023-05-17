import { CircularProgress } from "@mui/joy";

const Spinner = () => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
        }}>
            <CircularProgress />
            <p>Loading...</p>
        </div>
    );
}

export default Spinner;