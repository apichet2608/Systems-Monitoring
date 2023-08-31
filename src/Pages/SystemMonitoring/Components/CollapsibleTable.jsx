import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./CSS/CollapsibleTable.css";
import TextField from "@mui/material/TextField";

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.task_name}
        </TableCell>
        <TableCell align="right">{row.start_datetime}</TableCell>
        <TableCell align="right">{row.stop_datetime}</TableCell>
        <TableCell align="right">{row.update_datetime}</TableCell>
        <TableCell align="right">{row.from_db}</TableCell>
        <TableCell align="right">{row.to_db}</TableCell>
        <TableCell align="center">{row.to_table}</TableCell>
        <TableCell
          align="right"
          sx={{
            backgroundColor:
              row.check_status === "PASS"
                ? "#58D68D"
                : row.check_status === "FAIL"
                ? "#E74C3C"
                : "inherit",
            textAlign: "center",
            borderRadius: "10px",
            fontSize: 15,
            fontWeight: "",
            height: 20,
          }}
        >
          {row.check_status}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 1,
          }}
          colSpan={9}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 16,
                  marginInlineStart: 2,
                }}
              >
                Details
              </Typography>
              <Table size="small" aria-label="details">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      Host Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      Data Detail
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      Operation Time
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      IP From Database
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      IP To Database
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      CPU Percent
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "bold",
                        fontFamily: "'Jost', sans-serif",
                      }}
                    >
                      Memory Percent
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell>{detail.host_name}</TableCell>
                      <TableCell>{detail.data_detail}</TableCell>
                      <TableCell>{detail.operation_time}</TableCell>
                      <TableCell>{detail.ip_from_db}</TableCell>
                      <TableCell>{detail.ip_to_db}</TableCell>
                      <TableCell align="right">{detail.cpu_percent}</TableCell>
                      <TableCell align="right">
                        {detail.memory_percent}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    task_name: PropTypes.string.isRequired,
    start_datetime: PropTypes.string.isRequired,
    stop_datetime: PropTypes.string.isRequired,
    update_datetime: PropTypes.string.isRequired,
    from_db: PropTypes.string.isRequired,
    to_db: PropTypes.string.isRequired,
    to_table: PropTypes.string.isRequired,
    check_status: PropTypes.string.isRequired,
    task_error_status: PropTypes.string.isRequired,
    Details: PropTypes.arrayOf(
      PropTypes.shape({
        host_name: PropTypes.string.isRequired,
        data_detail: PropTypes.string.isRequired,
        operation_time: PropTypes.string.isRequired,
        ip_from_db: PropTypes.string.isRequired,
        ip_to_db: PropTypes.string.isRequired,
        cpu_percent: PropTypes.string.isRequired,
        memory_percent: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default function CollapsibleTable({ datas }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    console.log(datas);
    // Fetch data from API and set it to the state
    setData(datas);
  }, [datas]);
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredItems = data.filter((item) => {
    return (
      (item.check_status &&
        item.check_status.toLowerCase().includes(search.toLowerCase())) ||
      (item.task_name &&
        item.task_name.toLowerCase().includes(search.toLowerCase())) ||
      (item.from_db &&
        item.from_db.toLowerCase().includes(search.toLowerCase())) ||
      (item.to_db && item.to_db.toLowerCase().includes(search.toLowerCase())) ||
      (item.to_table &&
        item.to_table.toLowerCase().includes(search.toLowerCase())) ||
      (item.start_datetime &&
        item.start_datetime.toLowerCase().includes(search.toLowerCase())) ||
      (item.stop_datetime &&
        item.stop_datetime.toLowerCase().includes(search.toLowerCase())) ||
      (item.update_datetime &&
        item.update_datetime.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <>
      <Box display="flex" justifyContent="flex-end" marginRight={3}>
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </Box>
      <TableContainer component={Paper} sx={{ mt: "5px", maxHeight: 670 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell style={{ background: "#EBEDEF" }}></TableCell>
              <TableCell
                sx={{
                  color: "#34495E",
                  fontSize: 16,
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                  height: 20,
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Task Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Start Datetime
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Stop Datetime
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Update Datetime
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                From Database
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                To Database
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Table
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontSize: 16,
                  color: "#34495E",
                  fontWeight: "bold",
                  fontFamily: "'Jost', sans-serif",
                }}
                style={{ background: "#EBEDEF", padding: "8px" }}
              >
                Check Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
