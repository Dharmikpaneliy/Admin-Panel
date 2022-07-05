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
import { useDispatch, useSelector } from 'react-redux';
import { getmedicine } from '../../Redux/Action/medicine.action';

function Medicine(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [update, setUpdate] = useState();
    const [Dopen, setDOpen] = React.useState(false);
    const [Did, setDid] = useState();
    const [serachData, setSerachData] = useState([]);
    const medicines = useSelector(state => state.medicines)


    console.log(medicines);



    const handleClickOpen = () => {
        setOpen(true);
        setUpdate();
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate();
        formik.resetForm();
        setDOpen(false);
    };

    const handleClickDOpen = (id) => {
        setDOpen(true);
        setDid(id);
    };



    let medicine = {
        name: yup.string().required('enter name'),
        price: yup.string().required('please enter price'),
        quantity: yup.string().required('please enter quantity'),
        expiry: yup.string().required('please enter expiry'),
    }


    let schema = yup.object().shape(medicine);

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
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
        let localData = JSON.parse(localStorage.getItem("medicine"))
        let udata = localData.map((l, i) => {
            if (l.id === value.id) {
                return (value)
            } else {
                return l;
            }
        })
        localStorage.setItem("medicine", JSON.stringify(udata));
        setOpen(false)
        setUpdate()
        loadData()
        formik.setValues()
    }

    const handleSubmitdata = (value) => {
        let localdata = JSON.parse(localStorage.getItem("medicine"))

        let data = {
            id: Math.floor(Math.random() * 1000),
            ...value
        }

        if (localdata === null) {
            localStorage.setItem("medicine", JSON.stringify([data]))
        } else {
            localdata.push(data)
            localStorage.setItem("medicine", JSON.stringify(localdata))
        }
        setOpen(false);
        loadData();
    }
    const columns = [

        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: ' Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'Delete', headerName: 'Delete', width: 130,
            renderCell: (params) => (
                <IconButton aria-label="delete" onClick={() => handleClickDOpen(params.id)}>
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
        let localData = JSON.parse(localStorage.getItem("medicine"))

        let filterData = localData.filter((v, i) => v.id !== Did);

        localStorage.setItem("medicine", JSON.stringify(filterData));
        loadData();
        setDOpen();

    }

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"))

        if (localData !== null) {
            setData(localData)
        }
    }

    const handleSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("medicine"))

        let fData = localData.filter((e) => 
           e.name.toString().toLowerCase().includes(val.toLowerCase()) ||
           e.price.toString().includes(val) || 
           e.quantity.toString().includes(val) ||
           e.expiry.toString().includes(val)
        );

        setSerachData(fData);
        
        // console.log(fData);
    }

    let search = serachData.length > 0 ? serachData : data;

    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch(getmedicine());
            loadData();
        },
        [])

    return (
        <Box>
            <Container>
                <div>
                    <center>
                        <h1 className='mb-5'>Medicines Data</h1>

                        <TextField
                            margin="dense"
                            id="search"
                            label="search"
                            type="search"
                            fullWidth
                            variant="standard"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <Button className='mt-5' variant="outlined" onClick={handleClickOpen}>
                            Add Medicine
                        </Button>
                    </center>

                    <div style={{ height: 400, width: '100%', margin: '30px' }}>
                        <DataGrid
                            rows={search}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />

                    </div>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Medicine</DialogTitle>
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
                                        id="price"
                                        label="price"
                                        type="price"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.price}
                                        helperText={formik.errors.price}
                                        error={formik.errors.price ? true : false}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="quantity"
                                        label="quantity"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.quantity}
                                        helperText={formik.errors.quantity}
                                        error={formik.errors.quantity ? true : false}

                                    />
                                    <TextField
                                        margin="dense"
                                        id="expiry"
                                        label="expiry"
                                        fullWidth
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        defaultValue={formik.values.expiry}
                                        helperText={formik.errors.expiry}
                                        error={formik.errors.expiry ? true : false}
                                    />
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
                    <Dialog
                        open={Dopen}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are You Sure to Delete?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose}>NO</Button>
                            <Button onClick={handleDelete}>
                                YES
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Container>
        </Box>

    )

}

export default Medicine;