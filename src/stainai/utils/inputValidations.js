/*-------------------------------------------------------------------
|  🐼 Input Validators 
|
|  🐯 Purpose: THIS FILE CONTAINS ALL THE VALIDATORS OBJECTS
|
|  🐸 Returns:  -
*-------------------------------------------------------------------*/

export const name_validation = {
  name: 'username',
  label: 'User Name',
  type: 'text',
  id: 'username',
  placeholder: 'write your name ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const firstname_validation = {
  name: 'firstname',
  label: 'First Name',
  type: 'text',
  id: 'firstname',
  placeholder: 'write your first name ...',
  validation: {
    required: {
      value: true,
      message: 'firstname required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const lastname_validation = {
  name: 'lastname',
  label: 'Last Name',
  type: 'text',
  id: 'lasttname',
  placeholder: 'write your last name ...',
  validation: {
    required: {
      value: true,
      message: 'lastname required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const organization_validation = {
  name: 'organization',
  label: 'Organization',
  type: 'text',
  id: 'organization',
  placeholder: 'write your organization ...',
  validation: {
    required: {
      value: true,
      message: 'organization required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const project_validation = {
  name: 'project',
  label: 'Project Name',
  type: 'text',
  id: 'project',
  placeholder: 'write your project ...',
  validation: {
    required: {
      value: true,
      message: 'project required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}


export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: '200 characters max',
    },
  },
}

export const treatment_validation = {
  name: 'treatment',
  label: 'Animal treatment',
  id: 'treatment',
  placeholder: 'write Animal treatment ...',
  validation: {
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const strain_validation = {
  name: 'strain',
  label: 'Strain',
  id: 'strain',
  placeholder: 'write Strain ...',
  validation: {
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const structure_validation = {
  name: 'structure',
  label: 'Detail structure',
  id: 'structure',
  placeholder: 'write Detail structure ...',
  validation: {
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const organ_other_validation = {
  name: 'other',
  label: '',
  id: 'other',
  placeholder: 'write Organ other ...',
  validation: {
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: 'type password ...',
  validation: {
    required: "You must specify a password",
    minLength: {
      value: 6,
      message: "Password must have at least 6 characters"
    }
  },
}

export const comfirmpassword_validation = {
  name: 'password_repeat',
  label: 'Password Repeat',
  type: 'password',
  id: 'password_repeat',
  placeholder: 'type comfirm password ...',
  validation: {
    validate: value =>
    value === getValues("password") || "The passwords do not match"
  },
}

export const slide_validation = {
  name: 'slide',
  label: '*Slide thickness',
  type: 'number',
  id: 'slide',
  placeholder: 'write slide thickness',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const species_validation ={
  name: 'species',
  label: '*Species',
  type: '',
  id: 'species',
  placeholder: '',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
  selection: [
    `rat`,
    `mouse`,
    `primate`,
    `bovine`,
    `pig`,
    `other`
  ]
}

export const organ_validation ={
  name: 'organ',
  label: '*Organ',
  type: '',
  id: 'organ',
  placeholder: '',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
  selection: [
    `brain`,
    `spinal cord`,
    `retina`,
    `other`
  ]
}


export const anatomical_validation ={
  name: 'anatomical',
  label: '*Anatomical region ',
  type: '',
  id: 'anatomical',
  placeholder: '',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
  selection: [
    `Cerebral Cortex`,
    `Hippocampus`,
    `Striatum`,
    `Amygdala`,
    `Thalamus`,
    `Hypothalamus`,
    `Midbrain`,
    `Cerebellum`,
    `Medulla Oblongata`,
    `Pons`,
    `Olfactory Bulb`,
    `Nucleus Accumbens`,
    `Periaqueductal Gray`,
    `Superior Colliculus`,
    `Inferior Colliculus`
  ]
}



export const pixel_validation = {
  name: 'pixel',
  label: '*Pixel size',
  type: 'number',
  id: 'pixel',
  placeholder: 'write Pixel size',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
  },
}

export const email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'write email address',
  validation: {
    required: {
      value: true,
      message: 'email required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
}
