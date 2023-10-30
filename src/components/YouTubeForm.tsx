import React from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

let RenderCount = 0;

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

const YouTubeForm = () => {
  // przyjmuję typu danych formularza w <>
  const form = useForm<FormValues>();
  // control is used by Devttols
  //handle submit metoda w onSubmit przyjmująca za arg. f. onSumbit
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;
  // long version 1
  // const { name, ref, onChange, onBlur } = register('username');

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted', data);
  };
  RenderCount++;
  return (
    <div>
      <h1>YouTube Forms {RenderCount / 2}</h1>
      {/* // noValidate zapobiega walidacji przegladarki umozliwjajac rhc przejac obsluge walidacji inputów */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            //long version cd. 1
            // name={name}
            // ref={ref}
            // onChange={onChange}
            // onBlur={onBlur}
            //short version 1
            {...register('username', {
              // required rule message
              required: {
                value: true,
                message: 'Username is required',
              },
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
            })}
          />
          <p className='error'>{errors.email?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input type='text' id='channel' {...register('channel')} />
          <p className='error'>{errors.channel?.message}</p>
        </div>
        <button>Submit</button>
      </form>
      {/* devtools rhc */}
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
