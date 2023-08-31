import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "./Components/IconButton";
import CollapsibleTable from "./Components/CollapsibleTable";
import "./Components/CSS/System-Monitoring.css";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Systems = () => {
  const [data, setData] = useState([]);
  const [dataAPI, setDataAPI] = useState([]);
  const [dataAPI2, setDataAPI2] = useState([]);

  const [dataquerry, setdataquerry] = useState("Total");

  useEffect(() => {
    fetchData1();
    fetchData2();
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/smart_status_data_script_transform/totalstatus"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
      setDataAPI2(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:3000/api/smart_status_data_script_transform"
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setDataAPI(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData3 = async () => {
    console.log(dataquerry);
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/api/smart_status_data_script_transform/querry?task_status=${dataquerry}`
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setDataAPI(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClick = (data) => {
    console.log(data);
    if (data === null) {
      setdataquerry("NULL");
    } else {
      setdataquerry(data);
    }
  };

  useEffect(() => {
    setDataAPI([]);
    if (dataquerry !== "TOTAL") {
      console.log("1");
      fetchData3();
    } else {
      console.log("2");
      fetchData2();
    }
  }, [dataquerry]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xl={12}>
          <DrawerHeader />
        </Grid>
        {/* <Grid item xl={12}></Grid> */}
        {data.map((status, index) => (
          <Grid item xl={1.2} key={index}>
            <Card
              sx={{ backgroundColor: "#F4F6F6", borderRadius: "16px" }}
              onClick={() => handleClick(status.title)}
            >
              <CardMedia sx={{ height: 1 }} />
              <CardContent
                sx={{
                  backgroundColor: "white",
                  borderRadius: "10px",
                  padding: "1px",
                  margin: "3px",
                  height: 1,
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{
                    marginTop: 1,
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#34495E",
                  }}
                >
                  {status.value}
                </Typography>
              </CardContent>
              <CardActions onClick={() => handleClick(status.title)}>
                {status.title === null ? (
                  <IconButton status={"NULL"} />
                ) : (
                  // <IconButton status={"FAIL"} />
                  <IconButton status={status.title} />
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}

        {/* Table */}
        {dataAPI && dataAPI.length > 0 && (
          <Grid item xl={12}>
            {/* <Create_Data /> */}
            <CollapsibleTable datas={dataAPI} />
            {/* <CollapsibleTable datas = {dataAPI2}/> */}
          </Grid>
        )}
        <Grid></Grid>
      </Grid>
    </>
  );
};

export default Systems;
