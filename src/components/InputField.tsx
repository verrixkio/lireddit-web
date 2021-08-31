import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import React, { HtmlHTMLAttributes } from 'react'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement>;

export const InputField: React.FC<InputFieldProps> = ({}) => {
  const [] = userField();
    return (
      <FormControl isInvalid={form.errors.name && form.touched.name}>
        <FormLabel htmlFor="name">First name</FormLabel>
        <Input {...field} id="name" placeholder="name" />
        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
      </FormControl>
    );
}

function userField(): any[] {
  throw new Error('Function not implemented.');
}
