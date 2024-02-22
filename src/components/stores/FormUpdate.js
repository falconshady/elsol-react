import React, {useEffect, useState} from "react";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {inputField} from "../../Util/CommonStyles";
import {GetStoreById, UpdateStore} from "../../services/ApiStoreServices";
import {navigate} from "gatsby";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo es requerido"),
    city: Yup.string().required("Este campo es requerido")
        .min(3, 'La ciudad debe tener solo 3 caracteres')
        .max(3, 'La ciudad debe tener solo 3 caracteres'),
    address: Yup.string().required("Este campo es requerido"),
});

const FormUpdateComponent = ({id}) => {

    const [apiErrors, setApiErrors] = useState(null);
    
    const [enableEdit, setEnableEdit] = useState(false);

    const [data, setData] = useState({
        name: '',
        city: '',
        address: '',
    });

    const updateStore = async (values) => {
        const updated = await UpdateStore(id, values)
        if (updated.success) {
            alert('Update successfully')
            navigate('/')
        }
    }

    const getStoreByID = async () => {
        let row = await GetStoreById(id)
        setData({
            name: row.response.name,
            city: row.response.city,
            address: row.response.address,
        })
    }

    useEffect(() => {
        getStoreByID()
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
                <Formik initialValues={data} validationSchema={validationSchema} onSubmit={updateStore}
                        enableReinitialize={true}>
                    {
                        ({errors, handleChange, values}) => (
                            <Form action="#">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Store Name
                                        </label>
                                        <input type="text" name="name" id="name" onChange={handleChange}
                                               className={inputField(errors.name ?? false)}
                                               defaultValue={values.name}
                                               disabled={!enableEdit}
                                               placeholder="Store name"/>
                                        {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="city"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            City
                                        </label>
                                        <input type="text" name="city" id="city" onChange={handleChange}
                                               className={inputField(errors.city ?? false)}
                                               defaultValue={values.city}
                                               disabled={!enableEdit}
                                               placeholder="City"/>
                                        {errors.city && <span className="text-xs text-red-400">{errors.city}</span>}
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="address"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Address
                                        </label>
                                        <input type="text" name="address" id="address" onChange={handleChange}
                                               className={inputField(errors.address ?? false)}
                                               defaultValue={values.address}
                                               disabled={!enableEdit}
                                               placeholder="Address"/>
                                        {errors.address && <span className="text-xs text-red-400">{errors.address}</span>}
                                    </div>
                                </div>
                                {
                                    !enableEdit ? (
                                            <button type="button" onClick={() => {
                                                setEnableEdit(true)
                                            }}
                                                    className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800">
                                                Enable Update
                                            </button>
                                        ) :
                                        (
                                            <>
                                                <button type="submit"
                                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                                    Update product
                                                </button>
                                                <button type="button" onClick={() => {setEnableEdit(false)} }
                                                        className="inline-flex items-center ml-2 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                                                    Cancel
                                                </button>
                                            </>
                                        )
                                }
                                {apiErrors ? <div className="text-red-400">{apiErrors}</div>: ''}
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </section>
    )
}
export default FormUpdateComponent