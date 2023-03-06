import React from 'react';
import Form from '../../../components/Ui/ItemDetailsForm.jsx';

function create() {
  return (
    <>
      <Form
        API_Title="File"
        API_URL="file"
        FormTitle="Included File Form"
        FieldTitle="File Name"
        URL="files"
      />
    </>
  )
}

export default create