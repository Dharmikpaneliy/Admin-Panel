import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, FormikConsumer, FormikProvider, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Doctor(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate();
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate();
        formik.resetForm();
    };


    let doctor = {
        Name: yup.string().required('please enter your name'),
        Degree: yup.string().required('please enter your  degree'),
        Email: yup.string().required('please enter your email'),
        // expiry: yup.string().required('please enter '),
    }


    let schema = yup.object().shape(doctor);

    const formik = useFormik({
        initialValues: {
            name: '',
            degree: '',
            email: ''
            // expiry: ''
        },
        validationSchema: schema,
        onSubmit: (value, { resetForm }) => {

            if (update) {
                handleUpdate(value)
            } else {
                handleSubmitdata(value)
            }
            resetForm();

        }
    })
    const handleUpdate = (value) => {
        let localData = JSON.parse(localStorage.getItem("doctor"))
        let udata = localData.map((l, i) => {
            if (l.id === value.id) {
                return (value)
            } else {
                return l;
            }
        })
        localStorage.setItem("doctor", JSON.stringify(udata));
        setOpen(false)
        setUpdate()
        loadData()
        formik.setValues()
    }

    const handleSubmitdata = (value) => {
        let localdata = JSON.parse(localStorage.getItem("doctor"))

        let data = {
            id: Math.floor(Math.random() * 1000),
            ...value
        }

        if (localdata === null) {
            localStorage.setItem("doctor", JSON.stringify([data]))
        } else {
            localdata.push(data)
            localStorage.setItem("doctor", JSON.stringify(localdata))
        }
        setOpen(false);
        loadData();
    }
    const columns = [

        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'degree', headerName: 'Degree', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        {
            field: 'Delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            )
        },
        {
            field: 'Edit', headerName: 'Edit', width: 130,
            renderCell: (params) => (
                <IconButton aria-label="Edit" onClick={() => handleEdit(params.row)}>
                    <EditIcon />
                </IconButton>
            )
        }
    ];
    const handleEdit = (data) => {
        setOpen(true)
        setUpdate(data)
        formik.setValues(data);
    }


    const handleDelete = (id) => {
        let localData = JSON.parse(localStorage.getItem("doctor"))

        let filterData = localData.filter((v, i) => v.id !== id);

        localStorage.setItem("doctor", JSON.stringify(filterData));
        loadData()
    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("doctor"))

        if (localData !== null) {
            setData(localData)
        }
    }

    useEffect(
        () => {
            loadData();
        },
        [])

    return (
        <Box>
            <Container>
                <div>
                    <center>
                        <h1>DOCTOR DATA</h1>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Doctor Details
                        </Button>
                    </center>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data}
                            columns={columns}

                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />

                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Doctor Details</DialogTitle>
                        <Formik value={formik}>
                            <Form onSubmit={formik.handleSubmit}>
                                <DialogContent>

                                    <TextField
                                        margin="dense"
                                        id="name"
                                        label="name"
                                        type="name"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.name}
                                        helperText={formik.errors.name}
                                        error={formik.errors.name ? true : false}

                                    />

                                    <TextField
                                        margin="dense"
                                        id="degree"
                                        label="degree"
                                        type="degree"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.degree}
                                        helperText={formik.errors.degree}
                                        error={formik.errors.degree ? true : false}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="email"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.email}
                                        helperText={formik.errors.email}
                                        error={formik.errors.email ? true : false}

                                    />
                                    {/* <TextField
                                        margin="dense"
                                        id="expiry"
                                        label="expiry"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.expiry}
                                        helperText={formik.errors.expiry}
                                        error={formik.errors.expiry ? true : false}
                                    /> */}
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        {
                                            update ? <Button type="submit">Update</Button> :
                                                <Button type="submit">Submit</Button>
                                        }
                                    </DialogActions>
                                </DialogContent>
                            </Form>
                        </Formik>
                    </Dialog>
                </div>
            </Container>
        </Box>
    );
}

export default Doctor;