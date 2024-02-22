import React, {useState} from "react";
import * as Yup from 'yup';
import {Formik, Form} from 'formik';
import {inputField} from "../../Util/CommonStyles";
import {CreateProduct} from "../../services/api";
import {navigate} from "gatsby";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo es requerido"),
    price: Yup.string().required("Este campo es requerido"),
    type: Yup.string().required("Este campo es requerido"),
});

const CreateFormComponent = () => {

    const [data, setData] = useState({
        name: '',
        price: '',
        type: '',
    });

    const createProduct = async (values) => {
        const created = await CreateProduct(values)
        if(created.success){
            alert('Create successfully')
            navigate('/')
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                <Formik initialValues={data} validationSchema={validationSchema} onSubmit={createProduct}>
                    {
                        ({errors, handleChange}) => (
                            <Form action="#">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Product Name
                                        </label>
                                        <input type="text" name="name" id="name" onChange={handleChange} className={inputField(errors.name??false)}
                                               placeholder="Type product name"/>
                                        {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Price
                                        </label>
                                        <input type="text" name="price" id="price" onChange={handleChange} className={inputField(errors.price??false)}
                                               placeholder="Product brand"/>
                                        {errors.price && <span className="text-xs text-red-400">{errors.price}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Type
                                        </label>
                                        <select id="type" name="type" onChange={(e) => {handleChange(e)}} className={inputField(errors.type??false)}>
                                            <option value="">SELECCIONE</option>
                                            <option value="PERECEDERO">PERECEDERO</option>
                                            <option value="NO_PERECEDERO">NO_PERECEDERO</option>
                                        </select>
                                        {errors.type && <span className="text-xs text-red-400">{errors.type}</span>}
                                    </div>
                                </div>
                                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                    Add product
                                </button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </section>
    )
}
export default CreateFormComponent