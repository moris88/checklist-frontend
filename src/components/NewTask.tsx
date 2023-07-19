import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Task } from '../types/global';

interface NewTaskProps { }

const NewTask = (props: NewTaskProps) => {
    // const { register, handleSubmit } = useForm<Task>();
    // const onSubmit: SubmitHandler<Task> = data => console.log(data);
    return (
        <p>form</p>
        // <form onSubmit={handleSubmit(onSubmit)}>
        //     {/* <input {...register("firstName")} />
        //     <input {...register("lastName")} />
        //     <input type="email" {...register("email")} />

        //     <input type="submit" /> */}
        // </form>
    )
}

export default NewTask
