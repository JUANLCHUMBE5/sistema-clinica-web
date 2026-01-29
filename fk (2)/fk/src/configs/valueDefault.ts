export const valueDefault ={
    paciente:{
            pk1:0, 
            email: '', 
            password: '',
            firstname: '',
            lastname: '',
            category_pk1:0,  
            date_birth:new Date(),
            gender:'',
            marital_status:'',
            dni:'',
            status:false,
            description: { 
              phone_main:'',
              phone_alternative:'',
              address:'',
              blood_type:'',
              allergy:'',
              contact:{
                name_contact:'',
                relation_contact:'',
                phone_contact:'',
              },
              proxy:{
                name_proxy:'',
                relation_proxy:'',
                phone_proxy:'',
              }
            },
            
           
    
        },
    doctor:{
            pk1:0, 
            email: '', 
            password: '',
            firstname: '',
            lastname: '',
            category_pk1:0,  
            date_birth:new Date(),
            gender:'',
            marital_status:'',
            dni:'',
            status:false,
            description: { 
              phone_main:'',
              phone_alternative:'',
              address:'',
              specialty_pk1:0,
              description:''
            },
            
           
    
        },
    token:'',
    form:{
        // Paciente
        firstname: "",
        lastname: "",
        fecha_nacimiento: "",
        genero: "",
        estado_civil: "",
        numero_id: "",
    
        // Contacto
        telefono_principal: "",
        telefono_alternativo: "",
        email: "",
        direccion: "",
        ciudad: "",
    
        // Médica
        tipo_sangre: "",
        alergias: "",
    
        // Emergencia
        contacto_nombre: "",
        contacto_relacion: "",
        contacto_telefono: "",
    
        // Opcional
        foto: "",
      },
    consultorio:{
          building_pk1: 0,
          door: '',
          floor: '',
          specialite_pk1: 0,
          aforo: '2',
          status: false

    }
}


export const toastConfig :any=
{
  general:{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
  info:{
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
  warning:{
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        },
  error:{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
}