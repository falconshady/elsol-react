import React, {useState} from "react";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {inputField} from "../../Util/CommonStyles";
import {CreateStore} from "../../services/ApiStoreServices";
import {navigate} from "gatsby";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo es requerido"),
    city: Yup.string().required("Este campo es requerido"),
    address: Yup.string().required("Este campo es requerido"),
});

const FormCreateComponent = () => {

    const [data, setData] = useState({
        name: '',
        city: '',
        address: '',
    });

    const createStore = async (values) => {
        const created = await CreateStore(values)
        if(created.success){
            alert('Create successfully')
            navigate('/')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new store</h2>
                <Formik initialValues={data} validationSchema={validationSchema} onSubmit={createStore}>
                    {
                        ({errors, handleChange}) => (
                            <Form action="#">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Store Name
                                        </label>
                                        <input type="text" name="name" id="name" onChange={handleChange}
                                               className={inputField(errors.name ?? false)}
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
                                               placeholder="Address"/>
                                        {errors.address && <span className="text-xs text-red-400">{errors.address}</span>}
                                    </div>
                                </div>
                                <button type="submit"
                                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Add Store
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </section>
    )
}
export default FormCreateComponent