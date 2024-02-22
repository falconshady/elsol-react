import React, {useEffect, useState} from "react";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {inputField} from "../../Util/CommonStyles";
import {GetProductById, UpdateProduct} from "../../services/api";
import {navigate} from "gatsby";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo es requerido"),
    price: Yup.string().required("Este campo es requerido"),
    type: Yup.string().required("Este campo es requerido"),
});

const FormUpdateComponent = ({id}) => {

    const [enableEdit, setEnableEdit] = useState(false);

    const [data, setData] = useState({
        name: '',
        price: '',
        type: '',
    });

    const updateProduct = async (values) => {
        const updated = await UpdateProduct(id, values)
        if (updated.success) {
            alert('Update successfully')
            navigate('/')
        }
    }

    const getProductByID = async () => {
        let row = await GetProductById(id)
        setData({
            name: row.response.name,
            price: row.response.price,
            type: row.response.type,
        })
    }

    useEffect(() => {
        getProductByID()
    }, [])

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
                <Formik initialValues={data} validationSchema={validationSchema} onSubmit={updateProduct}
                        enableReinitialize={true}>
                    {
                        ({errors, handleChange, values}) => (
                            <Form action="#">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Product Name
                                        </label>
                                        <input type="text" name="name" id="name" onChange={handleChange}
                                               className={inputField(errors.name ?? false)}
                                               defaultValue={values.name}
                                               disabled={!enableEdit}
                                               placeholder="Type product name"/>
                                        {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="price"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Price
                                        </label>
                                        <input type="text" name="price" id="price" onChange={handleChange}
                                               className={inputField(errors.price ?? false)}
                                               defaultValue={values.price}
                                               disabled={!enableEdit}
                                               placeholder="Product brand"/>
                                        {errors.price && <span className="text-xs text-red-400">{errors.price}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="type"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Type
                                        </label>
                                        <select id="type" name="type" onChange={(e) => {
                                            handleChange(e)
                                        }} className={inputField(errors.type ?? false)} value={values.type} disabled={!enableEdit}>
                                            <option value="">SELECCIONE</option>
                                            <option value="PERECEDERO">PERECEDERO</option>
                                            <option value="NO_PERECEDERO">NO_PERECEDERO</option>
                                        </select>
                                        {errors.type && <span className="text-xs text-red-400">{errors.type}</span>}
                                    </div>
                                </div>
                                {
                                    !enableEdit ? (
                                            <button type="button" onClick={() => {setEnableEdit(true)} }
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
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </section>
    )
}
export default FormUpdateComponent